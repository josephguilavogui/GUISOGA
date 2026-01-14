"use client";
import { useState } from "react";
import { Lock, Mail, User, Home, MessageCircle, Video, Menu, Plus, Heart, Share2, Star } from "lucide-react";

export default function GuisogaEmpire() {
  const [step, setStep] = useState("login"); // login, signup, home
  const [user, setUser] = useState({ nom: "", prenom: "" });

  const handleSignup = (e: any) => {
    e.preventDefault();
    setStep("home");
  };

  if (step === "login" || step === "signup") {
    return (
      <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center p-6 font-sans">
        {/* GAUCHE : LOGO ET MESSAGE DE JOSEPH GUILAVOGUI */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-7xl lg:text-9xl font-black text-[#D4AF37] italic tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            GUISOGA
          </h1>
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 uppercase tracking-[0.2em]">
            BIENVENUE DANS L’EMPIRE DE JOSEPH GUILAVOGUI
          </h2>
          <p className="text-[#D4AF37]/60 text-sm font-bold tracking-[0.4em] uppercase">Excellence & Prestige</p>
        </div>

        {/* DROITE : LE BLOC DE CONNEXION NOIR & DORÉ */}
        <div className="lg:w-[450px] w-full">
          <div className="bg-[#111] p-8 rounded-[30px] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(0,0,0,1)]">
            <form onSubmit={handleSignup} className="space-y-4">
              {step === "signup" && (
                <div className="flex gap-4">
                  <input required type="text" placeholder="Prénom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-xl focus:border-[#D4AF37] outline-none" onChange={(e)=>setUser({...user, prenom: e.target.value})}/>
                  <input required type="text" placeholder="Nom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-xl focus:border-[#D4AF37] outline-none" onChange={(e)=>setUser({...user, nom: e.target.value})}/>
                </div>
              )}
              <input required type="email" placeholder="Adresse e-mail" className="w-full bg-black border border-zinc-800 text-white p-4 rounded-xl focus:border-[#D4AF37] outline-none" />
              <input required type="password" placeholder="Mot de passe" className="w-full bg-black border border-zinc-800 text-white p-4 rounded-xl focus:border-[#D4AF37] outline-none" />
              
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-xl text-lg hover:brightness-110 transition-all active:scale-95 shadow-[0_5px_15px_rgba(212,175,55,0.3)]">
                {step === "login" ? "CONNEXION" : "CRÉER MON COMPTE"}
              </button>

              <div className="text-center text-sm">
                <button type="button" onClick={() => setStep(step === "login" ? "signup" : "login")} className="text-[#D4AF37] font-bold hover:underline">
                  {step === "login" ? "Créer nouveau compte" : "Déjà membre ? Se connecter"}
                </button>
              </div>
            </form>
          </div>
          <p className="text-[#D4AF37]/40 text-center mt-8 text-xs font-bold tracking-widest leading-loose">
            CRÉER UNE PAGE POUR VOTRE COMMUNAUTÉ ET VISER PLUS LOIN.
          </p>
        </div>
      </div>
    );
  }

  // ACCUEIL APRÈS CONNEXION
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="p-4 bg-[#111] border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{user.prenom} {user.nom}</span>
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black">{user.prenom[0]}</div>
        </div>
      </nav>
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="bg-[#111] p-6 rounded-3xl border border-zinc-800 mb-6">
          <h2 className="text-2xl font-black mb-2 italic">BIENVENUE DANS VOTRE EMPIRE, {user.prenom} !</h2>
          <p className="text-zinc-500 text-sm">Votre succès commence ici chez GUISOGA.</p>
        </div>
      </div>
      <nav className="bg-[#111] border-t border-[#D4AF37]/20 p-4 flex justify-around sticky bottom-0">
        <Home className="text-[#D4AF37]" /> <Video className="text-zinc-600" /> <Plus className="bg-white text-black rounded-lg" /> <MessageCircle className="text-zinc-600" /> <Menu className="text-zinc-600" />
      </nav>
    </div>
  );
}