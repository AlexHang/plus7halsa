// Firebase configuration — shared source of truth for all modules.
// Initialization is lazy (client-side only) to prevent SSR errors at build time.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export async function getFirebaseApp() {
  const { initializeApp, getApps } = await import('firebase/app');
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
