"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function LoginButton() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login", error);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer"
    >
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google" 
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
      />
      Entrar com o Google
    </button>
  );
}
