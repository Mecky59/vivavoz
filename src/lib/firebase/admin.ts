import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  try {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountStr) {
      throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in environment variables.");
    }
    
    // Parse the JSON string
    const serviceAccount = JSON.parse(serviceAccountStr);

    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

const adminDb = getFirestore();

export { adminDb };
