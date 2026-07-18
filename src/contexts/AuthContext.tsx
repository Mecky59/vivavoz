"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase/config";
import { supabase } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  hasPaid: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  hasPaid: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            // Primeiro acesso: cria o perfil do usuário no banco Firestore
            await setDoc(userRef, {
              email: currentUser.email,
              name: currentUser.displayName,
              hasPaid: false,
              createdAt: new Date()
            });
          }
        } catch (error) {
          console.error("Erro no Firestore (ignorado para checar pagamento):", error);
        }

        // Função para buscar o status de pagamento no Supabase
        const checkPaymentStatus = async () => {
          try {
            const { data, error } = await supabase
              .from('user_payments')
              .select('has_paid')
              .eq('user_id', currentUser.uid)
              .single();
            
            if (data?.has_paid) {
              setHasPaid(true);
              if (pollingInterval) clearInterval(pollingInterval);
            } else {
              setHasPaid(false);
            }
          } catch (err) {
            console.error("Erro ao checar Supabase:", err);
          }
        };

        await checkPaymentStatus();

        // Se não pagou, configura o polling para verificar a cada 3 segundos
        if (pollingInterval) clearInterval(pollingInterval);
        pollingInterval = setInterval(checkPaymentStatus, 3000);
      } else {
        setHasPaid(false);
        if (pollingInterval) clearInterval(pollingInterval);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login com Google", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, hasPaid, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

