"use client";
import { useState } from "react";
import { Menu, User, BookOpen, Home, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => router.push("/");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex selection:bg-emerald-500/30">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
                V
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Viva-Voz</h1>
            </div>
            <button className="md:hidden text-slate-400 hover:text-white cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 border-b border-slate-700 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center border-2 border-emerald-500 mb-3 overflow-hidden shadow-lg">
               {/* Foto de perfil simulada */}
               <User className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="font-semibold text-white">Aluno</h2>
            <p className="text-xs text-slate-400">aluno@exemplo.com</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/dashboard' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <Home className="w-5 h-5" /> Introdução
            </Link>
            <Link 
              href="/dashboard/modules"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/dashboard/modules' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <BookOpen className="w-5 h-5" /> Módulos
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Header with 3 dashes for mobile */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-30 md:hidden">
          <div className="px-6 py-4 flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white cursor-pointer">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold text-white">Menu</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
