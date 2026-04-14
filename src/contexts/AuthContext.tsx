'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { firebaseConfig, getFirebaseApp } from '@/lib/firebase';

interface User {
  email: string | null;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip if Firebase is not configured (no API key)
    if (!firebaseConfig.apiKey) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const { getAuth, onAuthStateChanged } = await import('firebase/auth');
        const app = await getFirebaseApp();
        const auth = getAuth(app);
        unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u ? { email: u.email, uid: u.uid } : null);
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    })();

    return () => unsubscribe?.();
  }, []);

  const getAuth = async () => {
    const { getAuth: firebaseGetAuth } = await import('firebase/auth');
    return firebaseGetAuth(await getFirebaseApp());
  };

  const signIn = async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(await getAuth(), email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    await createUserWithEmailAndPassword(await getAuth(), email, password);
  };

  const signInWithGoogle = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    await signInWithPopup(await getAuth(), new GoogleAuthProvider());
  };

  const logout = async () => {
    const { signOut } = await import('firebase/auth');
    await signOut(await getAuth());
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
