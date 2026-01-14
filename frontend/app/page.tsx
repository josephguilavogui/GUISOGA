"use client";
import { useState, useEffect } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2 } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");

  // Fonction de connexion qui force l'entrée
  const enterEmpire = (e: React.FormEvent) => {
    e.preventDefault();
    // On enregistre l'email pour la mémorisation
    if (email) localStorage.setItem("guisoga_user", email);
    setIsLoggedIn(true); // Bascule instantanée vers l'accueil
  };

  // --- ÉCRAN DE CONNEXION (STYLE FACEBOOK NOIR & OR) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          
          {/* GAUCHE : LOGO ET TITRE */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-white uppercase leading-tight">
              BIENVENUE DANS L’EMPIRE <br/> DE JOSEPH GUILAVOGUI
            </h2>
            <p className="text-[#D4AF37]/60 text-lg uppercase tracking-[0.3em] font-light mt-4">L'excellence pour l'élite.</p>
          </div>

          {/* DROITE : BLOC DE CONNEXION */}
          <div className="lg:w-[420px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-[0_10px_50px_rgba(0,0,0,1)]">
              <form onSubmit={enterEmpire} className="space-y-4">
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
                  placeholder="E-mail ou Mobile" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none placeholder:text-zinc-700"
                />
                <input 
                  required
                  type="password" 
                  placeholder="Mot de passe" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none placeholder:text-zinc-700"
                />
                
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F2D472] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 uppercase transition-all">
                  {isLoginView ? "CONNEXION" : "S'INSCRIRE"}
                </button>
                
                <div className="text-center pt-2">
                  <a href="#" className="text-[#D4AF37]/50 text-sm hover:underline">Mot de passe oublié ?</a>
                </div>
                
                <hr className="border-zinc-800 my-4" />
                
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="bg-zinc-900 text-white font-bold py-4 px-8 rounded-2xl hover:bg-zinc-800 border border-zinc-700 transition-all text-sm"
                  >
                    {isLoginView ? "Créer nouveau compte" : "Retour à la connexion"}
                  </button>
                </div>
              </form>
            </div>
            <p className="text-zinc-600 text-center mt-10 text-[10px] font-bold tracking-widest uppercase leading-loose">
              CRÉER UNE PAGE POUR VOTRE <span className="text-[#D4AF37]">COMMUNAUTÉ</span> <br/> ET VISER PLUS LOIN.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- ÉCRAN D'ACCUEIL (UNE FOIS CONNECTÉ) ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        <div className="flex items-center gap-4">
          <Search size={22} className="text-zinc-500" />
          <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black">J</div>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-6">
        <div className="bg-zinc-900/50 p-8 rounded-[35px] border border-zinc-800 shadow-xl">
          <h2 className="text-3xl font-black italic mb-2 tracking-tight">BIENVENUE CHEZ VOUS, JOSEPH !</h2>
          <p className="text-zinc-500 font-medium">L'Empire GUISOGA est à vos ordres.</p>
        </div>

        {/* Publication Factice */}
        <div className="bg-zinc-900/30 rounded-[35px] border border-zinc-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">JG</div>
            <div>
              <p className="font-black text-sm flex items-center gap-1">JOSEPH GUILAVOGUI <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" /></p>
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Fondateur • Certifié</p>
            </div>
          </div>
          <div className="h-80 bg-zinc-800/50 flex flex-col items-center justify-center text-zinc-600 italic">
            <Star size={40} className="mb-4 text-zinc-700" />
            Flux de l'Empire en attente de données...
          </div>
          <div className="p-6 flex justify-around border-t border-zinc-800/50">
            <Heart size={24} className="text-zinc-500" />
            <MessageCircle size={24} className="text-zinc-500" />
            <Share2 size={24} className="text-zinc-500" />
          </div>
        </div>
      </main>

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