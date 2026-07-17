"use client";
import { BookOpen } from "lucide-react";

export default function ModulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Meus Módulos</h2>
      
      {/* Módulos em Desenvolvimento */}
      <section className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-8 relative overflow-hidden group">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white opacity-40">
          <BookOpen className="text-emerald-500" /> Aulas de Canto
        </h3>
        
        <div className="space-y-4 opacity-20 blur-[3px] select-none pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-slate-600"></div>
              <div>
                <h4 className="font-semibold text-slate-300 text-lg">Módulo de Canto {i}</h4>
                <p className="text-sm text-slate-500">Aulas práticas e exercícios vocais de alto rendimento.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay de Bloqueio */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-slate-800/90 px-8 py-4 rounded-full border border-slate-600 shadow-2xl flex items-center gap-3 transform group-hover:scale-105 transition-transform">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="font-semibold text-slate-200 tracking-wide text-lg">Em Desenvolvimento</span>
          </div>
        </div>
      </section>
    </div>
  );
}
