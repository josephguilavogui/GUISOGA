"use client";
import { useState } from "react";
import { Youtube, Instagram, MessageCircle, Send, Video, Share2, Facebook } from "lucide-react";

export default function GuisogaSuperApp() {
  const [subscriberCount, setSubscriberCount] = useState(1);
  const target = 1000;
  const percentage = Math.min((subscriberCount / target) * 100, 100);

  return (
    <main className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Identité GUISOGA */}
        <header className="flex flex-col items-center text-center pt-4">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-500 p-1 mb-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
             <img src="/icon-512.png?v=7" alt="GUISOGA" className="rounded-full w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-black text-yellow-500 tracking-[0.2em]">GUISOGA</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">The Private Intelligence Hub</p>
        </header>

        {/* Compteur d'Éligibilité Premium */}
        <section className="bg-zinc-900/50 border border-yellow-900/30 rounded-3xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase">Progression Élite</span>
            <span className="text-xl font-mono font-bold text-yellow-500">{subscriberCount} / {target}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3 mb-2">
            <div className="bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-200 h-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-[10px] text-gray-500 italic text-center">Accès aux signaux d'angle mort débloqué à 100%.</p>
        </section>

        {/* GRILLE DES RÉSEAUX SOCIAUX (Fonctionnalités intégrées) */}
        <section className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-bold text-gray-400 px-2 uppercase tracking-tighter">Accès Multi-Plateformes</h3>
          
          {/* TIKTOK STYLE */}
          <div className="bg-[#000000] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-cyan-400 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,242,234,0.3)]">
                <Video className="text-[#00f2ea]" />
              </div>
              <div>
                <h4 className="font-bold">TIKTOK</h4>
                <p className="text-[10px] text-gray-500 text-cyan-400">Analyses Flash & Shorts</p>
              </div>
            </div>
            <Share2 size={18} className="text-zinc-600" />
          </div>

          {/* INSTAGRAM STYLE */}
          <div className="bg-[#000000] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-pink-500 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]">
                <Instagram className="text-[#e1306c]" />
              </div>
              <div>
                <h4 className="font-bold">INSTAGRAM</h4>
                <p className="text-[10px] text-pink-500">Photos & Stories Privées</p>
              </div>
            </div>
            <Share2 size={18} className="text-zinc-600" />
          </div>

          {/* YOUTUBE STYLE */}
          <div className="bg-[#000000] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-red-600 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                <Youtube className="text-[#ff0000]" />
              </div>
              <div>
                <h4 className="font-bold">YOUTUBE</h4>
                <p className="text-[10px] text-red-500">Analyses d'angle mort (Long format)</p>
              </div>
            </div>
            <Share2 size={18} className="text-zinc-600" />
          </div>

          {/* MESSENGER / FACEBOOK */}
          <div className="bg-[#000000] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-blue-600 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,132,255,0.3)]">
                <Facebook className="text-[#0084ff]" />
              </div>
              <div>
                <h4 className="font-bold">MESSENGER</h4>
                <p className="text-[10px] text-blue-500">Contact direct & Support</p>
              </div>
            </div>
            <Share2 size={18} className="text-zinc-600" />
          </div>
        </section>

        {/* Bouton de Partage Unique */}
        <footer className="pb-10 pt-4">
           <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(212,175,55,0.2)] active:scale-95 transition-all">
             PARTAGER MON EMPIRE
           </button>
        </footer>
      </div>
    </main>
  );
}