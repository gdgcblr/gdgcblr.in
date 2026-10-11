import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let firebaseApp: App | null = null;
let db: Firestore | null = null;

export function getFirebaseAdminDb(): Firestore | null {
  if (db) return db;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    // If credentials are not configured, return null to allow graceful fallback
    return null;
  }

  // Handle newline characters in private key when stored in environment variables
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  try {
    if (getApps().length === 0) {
      firebaseApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      firebaseApp = getApps()[0];
    }

    db = getFirestore(firebaseApp);
    return db;
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    return null;
  }
}
