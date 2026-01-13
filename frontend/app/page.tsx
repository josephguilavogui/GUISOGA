"use client";
import { useState, useEffect } from "react";
import { Youtube, Instagram, MessageCircle, Send, Video } from "lucide-react"; // Pense à installer lucide-react ou utiliser des emojis

export default function GuisogaMainPage() {
  const [subscriberCount, setSubscriberCount] = useState(1);
  const target = 1000;
  const percentage = Math.min((subscriberCount / target) * 100, 100);

  return (
    <main className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header avec ton Logo Doré */}
        <header className="flex flex-col items-center text-center pt-4">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-500 p-1 mb-3">
             <img src="/icon-512.png?v=6" alt="GUISOGA" className="rounded-full w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-500 tracking-widest">GUISOGA</h1>
          <p className="text-gray-400 text-xs italic">"Voyez plus loin, ensemble."</p>
        </header>

        {/* Bloc Éligibilité Dynamique (Ton compteur à 1) */}
        <section className="bg-zinc-900 border border-yellow-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-yellow-600">Statut Éligibilité</span>
            <span className="text-sm font-mono">{subscriberCount} / {target}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
            <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-[10px] text-center text-gray-500">Accès aux analyses privées débloqué à 1 000 abonnés.</p>
        </section>

        {/* SECTION VIDÉOS GRATUITES (Lecteur Intégré) */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2 px-2">
            <Video size={16} className="text-yellow-500" /> CONTENU GRATUIT
          </h3>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
            {/* Ici on peut mettre une vidéo YouTube de ton choix */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Remplace par ton lien de vidéo gratuite
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-[11px] text-gray-400 px-2 italic text-center">Toutes nos analyses publiques sont accessibles sans frais.</p>
        </section>

        {/* SECTION RÉSEAUX SOCIAUX (Tes autres parties) */}
        <section className="grid grid-cols-2 gap-3">
          <a href="https://tiktok.com" className="flex items-center justify-center gap-2 bg-zinc-900 p-3 rounded-xl border border-white/5 hover:bg-zinc-800">
            <span className="text-xs">TikTok</span>
          </a>
          <a href="https://instagram.com" className="flex items-center justify-center gap-2 bg-zinc-900 p-3 rounded-xl border border-white/5 hover:bg-zinc-800">
            <span className="text-xs">Instagram</span>
          </a>
          <a href="https://youtube.com" className="flex items-center justify-center gap-2 bg-zinc-900 p-3 rounded-xl border border-white/5 hover:bg-zinc-800">
            <span className="text-xs text-red-500">YouTube</span>
          </a>
          <a href="https://t.me" className="flex items-center justify-center gap-2 bg-zinc-900 p-3 rounded-xl border border-white/5 hover:bg-zinc-800">
            <span className="text-xs text-blue-400">Telegram</span>
          </a>
        </section>

        {/* Bouton de Partage Final */}
        <footer className="pb-10">
           <button className="w-full bg-yellow-500 text-black font-bold py-4 rounded-2xl shadow-lg shadow-yellow-500/10 active:scale-95 transition-transform">
             PARTAGER MON PROFIL
           </button>
        </footer>
      </div>
    </main>
  );
}