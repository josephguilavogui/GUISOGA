"use client";
import { useState, useEffect } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");

  // Gestion de la connexion
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("guisoga_email", email);
    setIsLoggedIn(true); // CECI FAIT ENTRER DANS L'EMPIRE
  };

  // --- SI PAS CONNECTÉ : PAGE DE CONNEXION STYLE FACEBOOK ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* GAUCHE : LOGO ET TITRE */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-44 h-44 mx-auto lg:mx-0 mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
            <h2 className="text-2xl font-bold text-white uppercase">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
            <p className="text-[#D4AF37]/60 text-lg tracking-[0.3em] font-light mt-2 uppercase">Bâtissez l'excellence. Rejoignez l'élite.</p>
          </div>

          {/* DROITE : BLOC DE CONNEXION SÉCURISÉ */}
          <div className="lg:w-[450px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/30 shadow-2xl">
              <form onSubmit={handleAuth} className="space-y-4">
                <h3 className="text-[#D4AF37] text-center font-black text-xl mb-4 uppercase tracking-widest">
                  {isLoginView ? "Accès Empire" : "Nouveau Membre"}
                </h3>
                
                {!isLoginView && (
                  <div className="flex gap-2">
                    <input required type="text" placeholder="Prénom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" />
                    <input required type="text" placeholder="Nom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" />
                  </div>
                )}

                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none"
                />
                
                <input 
                  required
                  type="password" 
                  placeholder="Mot de passe" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none"
                />
                
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:scale-[1.02] transition-transform uppercase">
                  {isLoginView ? "Se connecter" : "S'inscrire"}
                </button>
                
                <hr className="border-zinc-800 my-4" />
                
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/40 font-bold py-4 px-10 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all text-sm"
                  >
                    {isLoginView ? "Créer nouveau compte" : "Retour"}
                  </button>
                </div>
              </form>
            </div>
            <p className="text-zinc-600 text-center mt-8 text-[10px] font-bold tracking-[0.2em] uppercase">
              Créer une Page pour votre <span className="text-[#D4AF37]">Communauté</span> et Viser plus loin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- SI CONNECTÉ : INTERFACE INTÉRIEURE DE L'EMPIRE (STYLE FACEBOOK APP) ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Barre de navigation haute */}
      <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        <div className="flex items-center gap-4 text-zinc-400">
          <Search size={22} />
          <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black">J</div>
        </div>
      </nav>

      {/* Contenu principal (Flux) */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-6">
        <div className="bg-zinc-900/50 p-6 rounded-[30px] border border-zinc-800">
          <h2 className="text-3xl font-black italic mb-2 tracking-tight">BIENVENUE DANS VOTRE EMPIRE !</h2>
          <p className="text-zinc-500 font-medium">Bâtissez votre héritage aujourd'hui avec GUISOGA.</p>
        </div>

        {/* Exemple de Publication */}
        <div className="bg-zinc-900/30 rounded-[30px] border border-zinc-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">JG</div>
            <div>
              <p className="font-black text-sm flex items-center gap-1">JOSEPH GUILAVOGUI <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" /></p>
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Fondateur • Certifié Empire</p>
            </div>
          </div>
          <div className="h-64 bg-zinc-800/50 flex items-center justify-center text-zinc-700 italic border-y border-zinc-800">
             Flux de l'Empire en cours de chargement...
          </div>
        </div>
      </main>

      {/* Barre de navigation basse (Mobile) */}
      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around sticky bottom-0 backdrop-blur-md">
        <Home className="text-[#D4AF37]" size={28} />
        <Video className="text-zinc-700" size={28} />
        <div className="bg-[#D4AF37] text-black rounded-2xl p-1 px-3 flex items-center"><Plus size={24} strokeWidth={3} /></div>
        <MessageCircle className="text-zinc-700" size={28} />
        <Menu className="text-zinc-700" size={28} />
      </nav>
    </div>
  );
}