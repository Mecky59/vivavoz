import Image from "next/image";
import { Mic2, Sparkles } from "lucide-react";
import { LoginButton } from "@/components/LoginButton";

export default function LoginPage() {

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-slate-950 selection:bg-emerald-500/30">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-800/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>

      {/* Main Container / Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-slate-900/60 backdrop-blur-2xl rounded-3xl md:rounded-[2.5rem] border border-slate-700/50 shadow-2xl overflow-hidden mt-4 md:mt-0">
        
        {/* Left Side: Branding / Intro */}
        <div className="flex-1 relative p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700/50 text-center md:text-left overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
            <Image
              src="/bg-music.png"
              alt="Fundo Musical"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-900/40"></div>
          
          <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-lg shadow-emerald-500/30 transform -rotate-6">
            <Mic2 className="w-8 h-8 text-slate-950" />
          </div>
          
          <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            A sua voz, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              seu maior palco.
            </span>
          </h1>
          
          <p className="relative z-10 text-slate-200 text-base md:text-lg leading-relaxed max-w-sm mx-auto md:mx-0 drop-shadow-md font-medium">
            Acesse o Viva-Voz e continue sua evolução vocal. Módulos práticos, acompanhamento profissional e resultados reais.
          </p>

          <div className="relative z-10 mt-8 md:mt-12 flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-medium text-emerald-400 bg-emerald-950/60 backdrop-blur-md w-full md:w-fit px-4 py-3 rounded-full border border-emerald-500/30 shadow-xl">
            <Sparkles className="w-4 h-4" />
            Junte-se a dezenas de alunos!
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[400px] lg:w-[480px] p-8 md:p-16 flex flex-col justify-center bg-slate-900/60">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Acesse sua conta</h2>
            <p className="text-slate-400 text-sm">Faça login com seu Google para sincronizar seu progresso.</p>
          </div>

          <div className="space-y-6">
            <LoginButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-slate-500 bg-slate-900">Seguro e Rápido</span>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-4">
              Ao continuar, você concorda com nossos <a href="#" className="underline hover:text-emerald-400 transition-colors">Termos de Serviço</a> e <a href="#" className="underline hover:text-emerald-400 transition-colors">Política de Privacidade</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
