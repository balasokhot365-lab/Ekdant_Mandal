import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let isInitialized = false;
let db: Firestore | null = null;
let firebaseApp: App | null = null;

// Firebase service account configuration from environment variables with fallback
function getServiceAccount() {
  // If complete JSON service account provided in env
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (e) {
      console.warn(
        "⚠️ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON from env:",
        e,
      );
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || "ekdant-mandel-2026";
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    "firebase-adminsdk-fbsvc@ekdant-mandel-2026.iam.gserviceaccount.com";
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    // Handle escaped newlines in env vars
    privateKey = privateKey.replace(/\\n/g, "\n");
  } else {
    // Default fallback service account key
    privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC76boudfhDkqCY\nsFT5wP37QGKHnuoMi3VwTgP+dHDkuEz/BUCy+ujSkcIleFvVBbDK2uamHQwP5QjC\nMD7IJ2n2Y/Ohjrcq/lHDPzxUhEFy31s1gVmacPdI8QYl+I0leqQ8HnWQWgJMVzjY\n7W/8Jbp+39f3xbynNwyl0K0JkLe4PkFMMbwBT9A6jiuaQvGveVXPW6oPA6E/3BI1\nvO62ijoP1M+dqxdrSXzlsWEnmVLT/ms4O+cxAq2aMoTfRSdyWoKwXjH/dh5WSIZ8\n7mKyI0BKNeibvwsWjhqrZ0e/Ond8ladgcqa+MoBYd+6wzEJOg3O7K614UHF9o4+1\nsCWWOiRrAgMBAAECggEAMvBNaYnOJlcplKp8JoXj84eFDhmMfaESUUK8v24GKmIx\ncRIV806j7WzYsbqaPjlALwU+7/nAytA92xIj+rMAfOukX/+ldJCjTmembYy6hy63\n9V2ekgicaBf6IDHr5SSFP8zL9rkHlXUxclCPAk2h7AG29DIUjUmVcp+KQKULwHQb\n7KCExYjWffRfbRAGc6d6ckBGEE1zLj3RjQB7lWMTpt04SXKG8WnvMgOhJSDKkN5g\noZeT28fP2hjLRHzyV3LPkbogITNqmf/JG39Qej39U5k+NByaQlDo6OG5UBxln9zq\nW6MU+vIEz8Kwl2FJCSAZQXlvBZyO91VHZC2zCz52oQKBgQD5kMMuk/uvc3q8XXR6\nfGZyS9hQwRMpR5fD7AIrcxT4BMvg68q+pkwE/P9A5QymwtpR/vtbd4fd3vAjWzs/\nzYj2tOrxw8lNQFQWw7Hyiux5pf8SydzNHT5RIhVirbkSurfluT07gCXTU/vgnqVa\n7VHEAJesQvB2BNmllwU5Y6faYQKBgQDAwghNBzmvdfUAntaOfZiKIfgM7jxFvbvN\npyfuan4Gn+CL3Jybbketljc8U6tgf7WaX47Xzc1xg2lTZayAg2gozEibUidnsU2N\noJp4eV9uwP9AbxlgXUkVV8xVVrTKXYWfO/alwOuzweG71RHo5NzzT3kzx5Hni1/A\n0HTTEUFqSwKBgHg85bzQMWejtJOCVzcYLmeM4ShvDWNLCfSsBZOXe5fO/8da8zCN\ngHy6w+QpNsI1iOgOeF3mJgCgg4QVVWN1DDMIkVVv5dGhV6IsINThV/N4JX+Q4B+2\noiqGyFTlrBA5A5bbe4PqRs8dXHIpHTPEuSs8udaV3bKOvanJLAwtVlahAoGAargC\nWIMzkM1BxAIsz98BYRjFeIM9o28UVxvAo+MZuxkw/L47hmJcFOMh2aiJLXgHV1yo\nfRpYMAyNd7rG8q/OLyhK2pN1dZdYVJ0iaKjqCSuZJldcOVnsaICfhG/o0FFO9YYB\nXGufE3q4O4IP1F1BZwQNGnnXcdZcQSgoReM70FkCgYB/oP9iHje5suGGCVOu2qAu\nuQOQkeR9UAgdXWxexojWSHyWdaHOpWnV7BkOpFxLaA1srT+VoWG5Kxjx8Y8I7Ytp\nVzCrreKp+CmnpeWJMBtUcV74Bzojqj178ixs2TRt42uFEavnVo/PY+Nt8BE8UWcA\nhqH2SHtojYAJq4fbp+F8vQ==\n-----END PRIVATE KEY-----\n`;
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

export function resetDbConnection() {
  db = null;
  isInitialized = false;
}

export function handleDbError(error: any) {
  console.warn("⚠️ Firebase DB Notice:", error?.message || error);
}

export async function getDb(): Promise<{
  db: Firestore | null;
  isConnected: boolean;
}> {
  if (db && isInitialized) {
    return { db, isConnected: true };
  }

  try {
    const serviceAccount = getServiceAccount();
    const apps = getApps();
    if (apps.length === 0) {
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.projectId,
      });
    } else {
      firebaseApp = apps[0];
    }

    db = getFirestore(firebaseApp);
    isInitialized = true;
    console.log(
      `🔥 Connected to Firebase Cloud Firestore successfully (Project: ${serviceAccount.projectId})`,
    );
    return { db, isConnected: true };
  } catch (error: any) {
    console.error("❌ Firebase Connection Error:", error?.message || error);
    return { db: null, isConnected: false };
  }
}

export function isDbConnected(): boolean {
  return isInitialized && db !== null;
}
