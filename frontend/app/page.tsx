"use client";
import { useState, useEffect } from "react";

export default function GuisogaMainPage() {
  // Le compteur commence à 1 et augmentera avec tes abonnés réels
  const [subscriberCount, setSubscriberCount] = useState(1);
  const target = 1000;

  // Calcul automatique de la progression pour la barre dorée
  const percentage = Math.min((subscriberCount / target) * 100, 100);

  useEffect(() => {
    // Simulation de la récupération des données réelles du backend Go
    // Plus tard, nous remplacerons ceci par un fetch vers ton API
    const fetchRealStats = async () => {
      try {
        // Remplace l'URL ci-dessous par celle de ton backend une fois prêt
        // const res = await fetch('https://ton-api-go.vercel.app/api/subscribers');
        // const data = await res.json();
        // setSubscriberCount(data.total);
      } catch (e) {
        console.log("En attente de connexion au moteur Go...");
      }
    };
    fetchRealStats();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header avec Logo et Statut */}
      <div className="max-w-md mx-auto space-y-8">
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full border-2 border-yellow-500 p-1">
             <img 
               src="/icon-512.png?v=5" 
               alt="GUISOGA Logo" 
               className="rounded-full w-full h-full object-cover"
             />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-yellow-500">
            GUISOGA
          </h1>
          <p className="text-gray-400 italic text-sm">"Voyez plus loin, ensemble."</p>
        </header>

        {/* Bloc Éligibilité Dynamique */}
        <section className="bg-zinc-900 border border-yellow-900/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Éligibilité Créateur</h2>
              <p className="text-xs text-gray-500">Seuil de monétisation</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-mono font-bold text-yellow-500">{subscriberCount}</span>
              <span className="text-gray-500 text-sm"> / {target}</span>
            </div>
          </div>

          {/* Barre de progression dynamique */}
          <div className="w-full bg-zinc-800 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-200 h-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="bg-black/40 rounded-lg p-3 border border-white/5">
            <p className="text-xs text-center text-gray-400">
              {subscriberCount >= target 
                ? "✅ Félicitations ! Votre monétisation est active." 
                : `🚀 Encore ${target - subscriberCount} abonnés pour débloquer vos gains privés.`}
            </p>
          </div>
        </section>

        {/* Centre de Messagerie (Messenger style) */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 ml-2">Analyses Récentes</h3>
          <div className="bg-zinc-900 rounded-2xl p-4 flex items-center space-x-4 border border-white/5">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center font-bold">G</div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Moteur d'Analyse Or</h4>
              <p className="text-xs text-gray-400 truncate">Calcul d'angle mort terminé. Signal prêt...</p>
            </div>
            <span className="text-[10px] text-gray-600">À l'instant</span>
          </div>
        </section>

        <footer className="text-center pt-8">
           <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
             Partager mon profil
           </button>
        </footer>
      </div>
    </main>
  );
}