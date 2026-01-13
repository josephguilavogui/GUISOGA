"use client";
import { useState } from "react";
import { ShieldCheck, Zap, MessageSquare, PlayCircle, Share2, Globe } from "lucide-react";

export default function GuisogaPrivateHub() {
  const [subscriberCount, setSubscriberCount] = useState(1);
  const target = 1000;
  const percentage = Math.min((subscriberCount / target) * 100, 100);

  // Fonction pour simuler l'abonnement et faire monter le compteur
  const handleSubscribe = () => {
    if (subscriberCount < target) {
      setSubscriberCount(prev => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans tracking-tight">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* EN-TÊTE UNIQUE */}
        <header className="flex flex-col items-center text-center pt-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-500 p-1 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
               <img src="/icon-512.png?v=8" alt="GUISOGA" className="rounded-full w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black p-1 rounded-full">
              <ShieldCheck size={20} />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-black text-yellow-500 tracking-tighter">GUISOGA</h1>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.3em]">Système d'Analyse Privé</p>
        </header>

        {/* MODULE DE PROGRESSION RÉEL */}
        <section className="bg-zinc-900 border border-white/5 rounded-[2rem] p-6 shadow-2xl">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-400">INDEX D'OUVERTURE</span>
            <span className="text-2xl font-mono font-bold text-white">{subscriberCount} <span className="text-gray-600 text-sm">/ {target}</span></span>
          </div>
          <div className="w-full bg-black rounded-full h-4 mb-4 p-1 border border-white/5">
            <div 
              className="bg-gradient-to-r from-yellow-600 to-yellow-300 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <button 
            onClick={handleSubscribe}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors text-sm"
          >
            S'ABONNER AU FLUX PRIVÉ
          </button>
        </section>

        {/* FONCTIONNALITÉS INTÉGRÉES (NOM UNIQUE) */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-bold text-gray-600 ml-4 uppercase tracking-widest">Modules de l'Application</h3>
          
          {/* AU LIEU DE TIKTOK -> ANALYSE FLASH */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-800 transition-all">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <Zap size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Analyses Flash</h4>
              <p className="text-[10px] text-gray-500">Signaux rapides et tendances instantanées</p>
            </div>
          </div>

          {/* AU LIEU DE YOUTUBE -> ARCHIVES VIDÉO */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-800 transition-all">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <PlayCircle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Archives Masterclass</h4>
              <p className="text-[10px] text-gray-500">Formations complètes et angles morts</p>
            </div>
          </div>

          {/* AU LIEU DE MESSENGER -> CANAL SÉCURISÉ */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-800 transition-all">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <MessageSquare size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Ligne Directe Élite</h4>
              <p className="text-[10px] text-gray-500">Messagerie cryptée pour membres certifiés</p>
            </div>
          </div>
        </section>

        {/* ACCÈS MONDIAL */}
        <footer className="pt-4 pb-12 text-center">
          <div className="flex justify-center gap-6 text-gray-600 mb-6">
            <Globe size={18} />
            <Share2 size={18} />
          </div>
          <p className="text-[9px] text-gray-700 uppercase tracking-widest">© 2026 GUISOGA INTELLIGENCE UNIT</p>
        </footer>

      </div>
    </main>
  );
}