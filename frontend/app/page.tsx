"use client";
import React, { useState, useEffect } from 'react';
import { Play, Heart, MessageCircle, Share2, DollarSign, Send, Zap, Lock, Trophy, ShieldCheck } from 'lucide-react';

export default function GuisogaMegaApp() {
  // --- SYSTÈME DE SÉCURITÉ ET RENTABILITÉ ---
  const [followers, setFollowers] = useState(450); // Simulation : Joseph a 450 abonnés
  const [isEligible, setIsEligible] = useState(false);
  const goal = 1000; // Seuil de rentabilité GUISOGA
  const progress = (followers / goal) * 100;

  useEffect(() => {
    if (followers >= goal) setIsEligible(true);
  }, [followers]);

  // Données simulées du flux (Vidéos et Publicités alternées)
  const feedItems = [
    { id: 1, type: 'video', author: '@Elite_Trader', desc: 'Analyse d\'angle mort sur l\'or.' },
    { id: 2, type: 'video', author: '@Guisoga_News', desc: 'Pourquoi la divergence est la clé du gain.' },
    { id: 3, type: 'ad', author: 'Sponsorisé', desc: 'Espace publicitaire GUISOGA - Revenu Trésorerie' },
    { id: 4, type: 'video', author: '@Tech_Master', desc: 'Configuration du moteur Go ultra-rapide.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* 1. BARRE DE NAVIGATION : GESTION DE LA CRÉDIBILITÉ */}
      <nav className="h-16 border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-blue-500 italic tracking-tighter">GUISOGA</h1>
          <ShieldCheck size={16} className="text-blue-400" />
        </div>
        
        <div className="flex items-center gap-6">
          {/* Dashboard de progression vers les gains */}
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 mb-1">
              <Trophy size={12} /> OBJECTIF ÉLIGIBILITÉ : {followers}/{goal}
            </div>
            <div className="w-40 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Statut du Portefeuille (Verrouillé pour la fiabilité) */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isEligible ? 'bg-green-900/30 border-green-500' : 'bg-gray-900/50 border-gray-700 opacity-60'}`}>
            {isEligible ? <DollarSign className="text-green-400" size={18} /> : <Lock className="text-gray-500" size={16} />}
            <span className={`font-mono font-bold text-sm ${isEligible ? 'text-green-400' : 'text-gray-500'}`}>
              {isEligible ? "COMPTE MONÉTISÉ" : "VÉRIFICATION EN COURS"}
            </span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. FLUX MULTIMÉDIA (TIKTOK / YOUTUBE) */}
        <main className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide border-r border-gray-800 bg-gray-950">
          {feedItems.map((item) => (
            <div key={item.id} className="h-[calc(100vh-64px)] snap-start relative flex items-center justify-center border-b border-gray-900">
              
              {item.type === 'ad' ? (
                /* --- ZONE PUBLICITAIRE : RENTABILITÉ GUISOGA --- */
                <div className="text-center p-12 bg-blue-900/5 border-2 border-dashed border-blue-500/20 rounded-3xl">
                  <DollarSign size={60} className="text-blue-500 mx-auto mb-4 animate-pulse" />
                  <h2 className="text-2xl font-black mb-2 uppercase tracking-widest text-blue-400">Publicité Partenaire</h2>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">Revenu généré pour la plateforme GUISOGA. Validation par moteur de divergence active.</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-green-500 font-mono text-xs font-bold">
                    <Zap size={14} /> FLUX DE TRÉSORERIE SÉCURISÉ
                  </div>
                </div>
              ) : (
                /* --- ZONE VIDÉO : ENGAGEMENT --- */
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                  <Play size={80} className="text-white/5" />
                  
                  {/* Boutons d'interaction style TikTok */}
                  <div className="absolute right-6 bottom-24 flex flex-col gap-6 items-center">
                    <div className="text-center group cursor-pointer">
                      <div className="p-4 bg-gray-800/80 rounded-full hover:bg-red-500 transition-all transform hover:scale-110 shadow-xl">
                        <Heart size={30} />
                      </div>
                      <span className="text-xs font-bold mt-1">1.2k</span>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="p-4 bg-gray-800/80 rounded-full hover:bg-blue-500 transition-all transform hover:scale-110 shadow-xl">
                        <MessageCircle size={30} />
                      </div>
                      <span className="text-xs font-bold mt-1">450</span>
                    </div>
                    <div className="text-center group cursor-pointer">
                      <div className="p-4 bg-gray-800/80 rounded-full hover:bg-green-600 transition-all transform hover:scale-110 shadow-xl">
                        <Share2 size={30} />
                      </div>
                      <span className="text-[10px] font-black mt-1 text-gray-400">PARTAGER</span>
                    </div>
                  </div>

                  {/* Infos du Créateur et Algorithme */}
                  <div className="absolute left-8 bottom-12 max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full border-2 border-white shadow-lg"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xl">{item.author}</span>
                          <span className="bg-blue-500 text-[8px] px-1.5 py-0.5 rounded text-white font-bold">CERTIFIÉ</span>
                        </div>
                        <button className="text-blue-400 text-xs font-bold hover:text-white transition-colors">S'abonner</button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed mb-4 font-medium">{item.desc}</p>
                    <div className="flex items-center gap-2 text-blue-400 bg-blue-900/30 w-fit px-3 py-1.5 rounded-lg border border-blue-500/20">
                       <Zap size={14} className="animate-pulse" /> 
                       <span className="text-[10px] font-black uppercase tracking-widest">Analyse d'angle mort en cours</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </main>

        {/* 3. MESSENGER : COMMUNICATION HAUTE PERFORMANCE */}
        <aside className="w-96 hidden xl:flex flex-col bg-black border-l border-gray-800">
          <div className="p-6 border-b border-gray-800 bg-gray-900/10 flex items-center justify-between">
            <h2 className="font-black flex items-center gap-3 text-lg tracking-tighter">
              <MessageCircle className="text-blue-500" size={24}/> MESSENGER
            </h2>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
          
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
             <div className="bg-gray-800/60 p-4 rounded-2xl rounded-bl-none max-w-[85%] text-sm border border-gray-700 leading-relaxed">
                🚀 Bienvenue dans le centre de messagerie sécurisé. La monétisation est active pour les créateurs ayant 1k+ abonnés.
             </div>
             <div className="text-center py-4">
                <span className="text-[9px] bg-gray-900 text-gray-500 px-4 py-1.5 rounded-full uppercase font-black tracking-[0.2em] border border-gray-800 shadow-inner">
                   Moteur Go : Chiffrement 48ms
                </span>
             </div>
          </div>

          <div className="p-6 border-t border-gray-800 bg-gray-900/20">
            <div className="flex gap-3 bg-gray-800/80 rounded-2xl p-2 items-center focus-within:ring-2 ring-blue-500/50 transition-all border border-gray-700">
              <input 
                type="text" 
                placeholder="Message sécurisé..." 
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500" 
              />
              <button className="bg-blue-600 p-3.5 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 transform active:scale-95">
                <Send size={20} />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}