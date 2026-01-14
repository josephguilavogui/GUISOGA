"use client";
import { useState } from "react";
import { Lock, Mail, User, Star, Home, Video, MessageCircle, Menu, Plus, Heart, Share2, Search } from "lucide-react";

export default function GuisogaEmpire() {
  const [step, setStep] = useState("auth"); // auth, home
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ prenom: "", nom: "" });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("home");
  };

  // --- ÉCRAN D'AUTHENTIFICATION NOIR & DORÉ ---
  if (step === "auth") {
    return (
      <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center p-6 font-sans selection:bg-yellow-500/30">
        
        {/* SECTION GAUCHE : LOGO ET MESSAGE D'EMPIRE */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12 animate-in fade-in slide-in-from-left duration-1000">
          <div className="mb-6 flex justify-center lg:justify-start">
            <div className="w-32 h-32 border-4 border-[#D4AF37] rounded-full flex items-center justify-center bg-gradient-to-tr from-black to-zinc-900 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <span className="text-6xl font-black text-[#D4AF37] italic">G</span>
            </div>
          </div>
          <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">
            GUISOGA
          </h1>
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 uppercase tracking-[0.2em] leading-tight">
            BIENVENUE DANS L'EMPIRE <br/> DE JOSEPH GUILAVOGUI
          </h2>
          <p className="text-zinc-500 text-sm font-bold tracking-[0.4em] uppercase">Excellence & Prestige</p>
        </div>

        {/* SECTION DROITE : FORMULAIRE STYLE IMAGE REÇUE */}
        <div className="lg:w-[450px] w-full animate-in fade-in zoom-in duration-700">
          <div className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-[0_0_80px_rgba(0,0,0,1)]">
            <form onSubmit={handleAuth} className="space-y-5">
              {!isLogin && (
                <div className="flex gap-3">
                  <input required type="text" placeholder="Prénom" className="w-1/2 bg-black/50 border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" onChange={(e)=>setUserData({...userData, prenom: e.target.value})} />
                  <input required type="text" placeholder="Nom" className="w-1/2 bg-black/50 border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" onChange={(e)=>setUserData({...userData, nom: e.target.value})} />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-zinc-600" size={20} />
                <input required type="email" placeholder="Adresse e-mail" className="w-full bg-black/50 border border-zinc-800 text-white p-4 pl-12 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-zinc-600" size={20} />
                <input required type="password" placeholder="Mot de passe" className="w-full bg-black/50 border border-zinc-800 text-white p-4 pl-12 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-b from-[#D4AF37] to-[#8A6D1D] text-black font-black py-5 rounded-2xl text-xl hover:brightness-125 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95 uppercase tracking-widest">
                {isLogin ? "CONNEXION" : "REJOINDRE"}
              </button>

              <div className="text-center pt-2">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#D4AF37] font-bold text-sm hover:underline">
                  {isLogin ? "Créer nouveau compte" : "Déjà membre ? Se connecter"}
                </button>
              </div>
            </form>
          </div>
          <p className="text-zinc-600 text-center mt-10 text-xs font-bold tracking-widest uppercase leading-loose">
            Créer une Page pour votre <br/> <span className="text-[#D4AF37]">Communauté</span> et Viser plus loin.
          </p>
        </div>
      </div>
    );
  }

  // --- ÉCRAN D'ACCUEIL APRÈS CONNEXION ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic tracking-tighter">GUISOGA</h1>
        <div className="flex items-center gap-4">
          <Search size={20} className="text-zinc-500" />
          <div className="flex items-center gap-2 bg-zinc-900 p-1 pr-3 rounded-full border border-zinc-800">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-xs">
              {userData.prenom ? userData.prenom[0] : "J"}
            </div>
            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">
              {userData.prenom || "JOSEPH"}
            </span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full p-4 space-y-6">
        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-800 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl font-black italic mb-2">BIENVENUE DANS VOTRE EMPIRE, {userData.prenom || "JOSEPH"} !</h2>
          <p className="text-zinc-500 font-medium">Bâtissez votre héritage aujourd'hui avec GUISOGA.</p>
        </div>

        <div className="bg-zinc-900/30 rounded-[32px] border border-zinc-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-[#D4AF37]/20">JG</div>
            <div>
              <p className="font-black text-sm flex items-center gap-1">JOSEPH GUILAVOGUI <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" /></p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Fondateur • Certifié Empire</p>
            </div>
          </div>
          <div className="aspect-video bg-zinc-800/50 flex items-center justify-center text-zinc-700 italic border-y border-zinc-800">
            Flux de l'Empire en cours...
          </div>
          <div className="p-6 flex justify-around">
            <Heart size={24} className="text-zinc-600 hover:text-red-500 cursor-pointer transition-colors" />
            <MessageCircle size={24} className="text-zinc-600 hover:text-[#D4AF37] cursor-pointer transition-colors" />
            <Share2 size={24} className="text-zinc-600 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around sticky bottom-0 backdrop-blur-md">
        <Home className="text-[#D4AF37]" size={28} />
        <Video className="text-zinc-700" size={28} />
        <div className="bg-[#D4AF37] text-black rounded-2xl p-1 px-3 flex items-center shadow-lg shadow-[#D4AF37]/20"><Plus size={24} strokeWidth={3} /></div>
        <MessageCircle className="text-zinc-700" size={28} />
        <Menu className="text-zinc-700" size={28} />
      </nav>
    </div>
  );
}