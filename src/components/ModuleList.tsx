"use client";
import { CheckCircle2, Circle } from "lucide-react";

type Module = {
  id: number;
  name: string;
  completed: boolean;
};

interface ModuleListProps {
  modules: Module[];
  onConfirm: (id: number) => void;
}

export function ModuleList({ modules, onConfirm }: ModuleListProps) {
  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <div 
          key={mod.id} 
          className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-sm transition-all hover:border-emerald-500/50"
        >
          <div className="flex items-center gap-3">
            {mod.completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <Circle className="w-6 h-6 text-slate-500" />
            )}
            <div>
              <h3 className="font-semibold text-slate-200">{mod.name}</h3>
              <p className="text-sm text-slate-400">
                {mod.completed ? "Concluída" : "Pendente"}
              </p>
            </div>
          </div>
          
          {!mod.completed && (
            <button
              onClick={() => onConfirm(mod.id)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Confirmar Aula
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
