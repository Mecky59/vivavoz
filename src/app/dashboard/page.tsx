"use client";
import { useState, useEffect, Suspense } from "react";
import { Music, DollarSign, Clock, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function IntroductionContent() {
  const searchParams = useSearchParams();
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mercado Pago pode retornar status=approved ou sobrescrever o nosso status=success
    const status = searchParams.get("status");
    const collectionStatus = searchParams.get("collection_status");
    
    if (status === "success" || status === "approved" || collectionStatus === "approved") {
      // eslint-disable-next-line
      setIsPaid(true);
    }
  }, [searchParams]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      
      if (data.init_point) {
        window.location.href = data.init_point; // Vai pro Mercado Pago
      } else {
        alert("Erro ao conectar com o Mercado Pago.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-12 items-center justify-center">
      
      {/* Seção de Introdução (No topo) */}
      <section className="text-center space-y-6 w-full">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
          <Music className="w-8 h-8 text-emerald-500" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Sua voz levada <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">a sério.</span>
        </h2>
        
        <p className="text-lg text-slate-300 leading-relaxed font-light">
          Cantar vai muito além de ter um &quot;dom&quot;. É sobre dominar a <strong className="text-emerald-400 font-medium">respiração diafragmática</strong>, entender os seus registros vocais (voz de peito, cabeça e mista) e saber usar a sua musculatura sem machucar as cordas vocais.
        </p>

        <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Nos próximos módulos, você vai passar por exercícios práticos focados em afinação, colocação de voz e até introdução a melismas. Para liberar o seu cronograma de estudos e agendar sua primeira avaliação vocal comigo, é só acertar a mensalidade aqui embaixo!
        </p>
      </section>

      {/* Card de Pagamento Vertical (Embaixo do texto) */}
      <section className="w-full max-w-sm">
        <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[420px]">
          
          {/* Decoração de fundo */}
          <div className="absolute -top-10 -right-10 p-8 opacity-5 pointer-events-none">
            <DollarSign className="w-64 h-64" />
          </div>

          {!isPaid ? (
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex-1 text-center mt-4">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Plano Padrão
                </h3>
                <p className="text-sm text-slate-400 mb-8 px-4">
                  Acesso total aos módulos e agendamento de aulas.
                </p>
                
                <div className="py-8 bg-slate-900/80 rounded-3xl border border-slate-700/50 mb-6">
                  <p className="text-5xl font-black text-emerald-400 mb-4">R$ 119,90</p>
                  <div className="flex justify-center items-center gap-2">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Mensal
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Pagar Mensalidade"}
              </button>
            </div>
          ) : (
            /* Estado Pós-Pagamento */
            <div className="relative z-10 flex flex-col h-full justify-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/40">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">
                Pagamento Confirmado!
              </h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Tudo certo! Agora você já pode entrar em contato para <strong>agendar a sua aula</strong> de canto.
              </p>
              
              <a 
                href="https://wa.me/5575982070606?text=Olá!%20Acabei%20de%20pagar%20minha%20mensalidade%20no%20Viva-Voz%20e%20gostaria%20de%20agendar%20minha%20aula." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                Agendar via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function IntroductionPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-400">Carregando painel...</div>}>
      <IntroductionContent />
    </Suspense>
  );
}
