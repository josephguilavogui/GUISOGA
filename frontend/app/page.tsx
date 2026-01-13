"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, Zap, MessageSquare, PlayCircle, Share2, Globe, Lock, Users } from "lucide-react";

export default function GuisogaPrivateSystem() {
  // Le compteur augmente à chaque clic sur le bouton d'abonnement
  const [subscriberCount, setSubscriberCount] = useState(1);
  const target = 1000;
  const percentage = Math.min((subscriberCount / target) * 100, 100);

  const handleSubscribe = () => {
    if (subscriberCount < target) {
      setSubscriberCount(prev => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 font-sans selection:bg-yellow-500/30">
      <div className="max-w-md mx-auto relative">
        
        {/* INDICATEUR DE SÉCURITÉ DANS LE COIN SUPÉRIEUR */}
        <div className="absolute top-0 right-0 flex items-center gap-2 bg-zinc-900/80 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Système Sécurisé</span>
        </div>

        {/* EN-TÊTE DE MARQUE */}
        <header className="flex flex-col items-center text-center pt-12 pb-6">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-2 border-yellow-500 p-1.5 shadow-[0_0_40px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500">
               <img src="/icon-512.png?v=9" alt="GUISOGA" className="rounded-full w-full h-full object-cover grayscale-[20%]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black p-1.5 rounded-full shadow-lg border-4 border-[#050505]">
              <ShieldCheck size={18} strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-black text-yellow-500 tracking-tighter italic">GUISOGA</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1 ml-1">Private Intelligence Unit</p>
        </header>

        {/* MODULE DE CROISSANCE STRATÉGIQUE */}
        <section className="bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-[2.5rem] p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-yellow-600 uppercase tracking-widest mb-1">Index d'Ouverture</span>
              <p className="text-[9px] text-gray-500 font-medium italic">Accès prioritaire aux membres certifiés</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-mono font-black text-white">{subscriberCount}</span>
              <span className="text-gray-600 text-sm font-bold"> / {target}</span>
            </div>
          </div>

          <div className="w-full bg-zinc-800/50 rounded-full h-5 mb-6 p-1 border border-white/5 shadow-inner">
            <div 
              className="bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-200 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <button 
            onClick={handleSubscribe}
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl hover:bg-white transition-all transform active:scale-[0.98] shadow-xl text-xs uppercase tracking-widest"
          >
            Rejoindre la Cellule Privée
          </button>
        </section>

        {/* ECOSYSTÈME DE MODULES (NOMS CAPTIVANTS) */}
        <section className="grid grid-cols-1 gap-4 px-2 pb-12">
          
          {/* MODULE ANALYSE RAPIDE */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex items-center gap-5 hover:bg-zinc-800/60 transition-all group">
            <div className="w-14 h-14 bg-yellow-500/5 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-tight">Le Radar d'Or</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">Détection immédiate des angles morts et opportunités de marché à haute fréquence.</p>
            </div>
          </div>

          {/* MODULE FORMATION ELITE */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex items-center gap-5 hover:bg-zinc-800/60 transition-all group">
            <div className="w-14 h-14 bg-yellow-500/5 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform">
              <PlayCircle size={28} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-tight">Archives Maîtresses</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">Cours stratégiques complets pour comprendre les secrets des gros investisseurs.</p>
            </div>
          </div>

          {/* MODULE MESSAGERIE ACCESSIBLE À TOUS */}
          <div className="bg-gradient-to-r from-yellow-600/10 to-transparent border border-yellow-500/20 rounded-3xl p-5 flex items-center gap-5 hover:border-yellow-500/50 transition-all group cursor-pointer shadow-lg">
            <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform">
              <MessageSquare size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black uppercase tracking-tight text-yellow-500">Canal de Discussion Ouvert</h4>
                <span className="bg-yellow-500/20 text-yellow-500 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Public</span>
              </div>
              <p className="text-[11px] text-white font-medium mt-0.5 leading-relaxed">Posez vos questions et échangez librement avec la communauté GUISOGA.</p>
            </div>
          </div>

        </section>

        {/* FOOTER DE CONFIANCE */}
        <footer className="text-center pt-4 pb-16 flex flex-col items-center">
          <div className="flex gap-8 text-gray-700 mb-8">
            <div className="flex flex-col items-center gap-1">
              <Lock size={16} />
              <span className="text-[8px] font-bold uppercase">Crypté</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-yellow-700">
              <Users size={16} />
              <span className="text-[8px] font-bold uppercase">Vérifié</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Globe size={16} />
              <span className="text-[8px] font-bold uppercase">Mondial</span>
            </div>
          </div>
          <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.5em]">Guisoga Intelligence System • Est. 2026</p>
        </footer>

      </div>
    </main>
  );
}