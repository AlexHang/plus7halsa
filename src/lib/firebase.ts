// Firebase is initialized lazily via AuthContext using dynamic imports.
// This file re-exports helpers for use in client-only components.

export async function getFirebaseApp() {
  const { initializeApp, getApps } = await import('firebase/app');
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  };
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
}

export async function getFirebaseDb() {
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(await getFirebaseApp());
}

export async function getFirebaseStorage() {
  const { getStorage } = await import('firebase/storage');
  return getStorage(await getFirebaseApp());
}
