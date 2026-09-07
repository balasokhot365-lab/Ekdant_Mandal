import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

export const serviceAccount = {
  type: "service_account",
  projectId: "ekdant-mandel-2026",
  privateKeyId: "5c25588cf1ad276baff934d50d9a9ef3e7c37959",
  privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC76boudfhDkqCY\nsFT5wP37QGKHnuoMi3VwTgP+dHDkuEz/BUCy+ujSkcIleFvVBbDK2uamHQwP5QjC\nMD7IJ2n2Y/Ohjrcq/lHDPzxUhEFy31s1gVmacPdI8QYl+I0leqQ8HnWQWgJMVzjY\n7W/8Jbp+39f3xbynNwyl0K0JkLe4PkFMMbwBT9A6jiuaQvGveVXPW6oPA6E/3BI1\nvO62ijoP1M+dqxdrSXzlsWEnmVLT/ms4O+cxAq2aMoTfRSdyWoKwXjH/dh5WSIZ8\n7mKyI0BKNeibvwsWjhqrZ0e/Ond8ladgcqa+MoBYd+6wzEJOg3O7K614UHF9o4+1\nsCWWOiRrAgMBAAECggEAMvBNaYnOJlcplKp8JoXj84eFDhmMfaESUUK8v24GKmIx\ncRIV806j7WzYsbqaPjlALwU+7/nAytA92xIj+rMAfOukX/+ldJCjTmembYy6hy63\n9V2ekgicaBf6IDHr5SSFP8zL9rkHlXUxclCPAk2h7AG29DIUjUmVcp+KQKULwHQb\n7KCExYjWffRfbRAGc6d6ckBGEE1zLj3RjQB7lWMTpt04SXKG8WnvMgOhJSDKkN5g\noZeT28fP2hjLRHzyV3LPkbogITNqmf/JG39Qej39U5k+NByaQlDo6OG5UBxln9zq\nW6MU+vIEz8Kwl2FJCSAZQXlvBZyO91VHZC2zCz52oQKBgQD5kMMuk/uvc3q8XXR6\nfGZyS9hQwRMpR5fD7AIrcxT4BMvg68q+pkwE/P9A5QymwtpR/vtbd4fd3vAjWzs/\nzYj2tOrxw8lNQFQWw7Hyiux5pf8SydzNHT5RIhVirbkSurfluT07gCXTU/vgnqVa\n7VHEAJesQvB2BNmllwU5Y6faYQKBgQDAwghNBzmvdfUAntaOfZiKIfgM7jxFvbvN\npyfuan4Gn+CL3Jybbketljc8U6tgf7WaX47Xzc1xg2lTZayAg2gozEibUidnsU2N\noJp4eV9uwP9AbxlgXUkVV8xVVrTKXYWfO/alwOuzweG71RHo5NzzT3kzx5Hni1/A\n0HTTEUFqSwKBgHg85bzQMWejtJOCVzcYLmeM4ShvDWNLCfSsBZOXe5fO/8da8zCN\ngHy6w+QpNsI1iOgOeF3mJgCgg4QVVWN1DDMIkVVv5dGhV6IsINThV/N4JX+Q4B+2\noiqGyFTlrBA5A5bbe4PqRs8dXHIpHTPEuSs8udaV3bKOvanJLAwtVlahAoGAargC\nWIMzkM1BxAIsz98BYRjFeIM9o28UVxvAo+MZuxkw/L47hmJcFOMh2aiJLXgHV1yo\nfRpYMAyNd7rG8q/OLyhK2pN1dZdYVJ0iaKjqCSuZJldcOVnsaICfhG/o0FFO9YYB\nXGufE3q4O4IP1F1BZwQNGnnXcdZcQSgoReM70FkCgYB/oP9iHje5suGGCVOu2qAu\nuQOQkeR9UAgdXWxexojWSHyWdaHOpWnV7BkOpFxLaA1srT+VoWG5Kxjx8Y8I7Ytp\nVzCrreKp+CmnpeWJMBtUcV74Bzojqj178ixs2TRt42uFEavnVo/PY+Nt8BE8UWcA\nhqH2SHtojYAJq4fbp+F8vQ==\n-----END PRIVATE KEY-----\n`,
  clientEmail:
    "firebase-adminsdk-fbsvc@ekdant-mandel-2026.iam.gserviceaccount.com",
  clientId: "109287323294261246673",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ekdant-mandel-2026.iam.gserviceaccount.com",
};

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount),
    projectId: "ekdant-mandel-2026",
  });
} else {
  app = getApps()[0];
}

export const firestore = getFirestore(app);
export default firestore;
