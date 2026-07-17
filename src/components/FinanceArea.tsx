"use client";
import { DollarSign, Clock, CheckCircle } from "lucide-react";

export type Payment = {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
};

interface FinanceAreaProps {
  payments: Payment[];
  onPay: (id: string) => void;
}

export function FinanceArea({ payments, onPay }: FinanceAreaProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-xl border border-slate-700 mt-4">
        <DollarSign className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
        <p className="text-slate-400">Nenhuma cobrança disponível.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
        <DollarSign className="text-emerald-500" /> Área Financeira
      </h3>
      {payments.map((pay) => (
        <div key={pay.id} className="p-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-emerald-400">
              R$ {pay.amount.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
              Data de Vencimento: {pay.date}
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              pay.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {pay.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {pay.status === 'paid' ? 'Pago' : 'Pendente'}
            </span>
            
            {pay.status === 'pending' && (
              <button
                onClick={() => onPay(pay.id)}
                className="flex-1 sm:flex-none px-6 py-2 bg-white text-slate-900 hover:bg-slate-200 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Pagar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
