"use client";

import { useRouter } from "next/navigation";
import { Mic2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Simular autenticação e redirecionar
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-100 selection:bg-emerald-500/30">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl text-center">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
          <Mic2 className="w-8 h-8 text-slate-900" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Viva-Voz</h1>
        <p className="text-slate-400 mb-8">Gerencie sua evolução vocal.</p>
        
        <button 
          onClick={handleLogin}
          className="w-full py-3 px-4 bg-white text-slate-900 hover:bg-slate-200 font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors cursor-pointer"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
