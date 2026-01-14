"use client";
import { useState, useEffect } from "react";
import { Lock, Mail, User, LogIn, UserPlus, CheckCircle, Star, Home, MessageCircle, Video, Menu, Plus, Heart, Share2 } from "lucide-react";

export default function GuisogaSystem() {
  const [view, setView] = useState("login"); // login, signup, home
  const [userProfile, setUserProfile] = useState({ firstName: "", lastName: "" });
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  // Fonction pour Créer un Compte
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName) {
      setUserProfile({ firstName: formData.firstName, lastName: formData.lastName });
      setView("home"); // Redirection directe après création
    }
  };

  // Fonction pour Connexion
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile.firstName) {
      setView("home");
    } else {
      alert("Aucun compte trouvé. Veuillez d'abord Créer un compte.");
      setView("signup");
    }
  };

  // --- INTERFACE DE CONNEXION / CRÉATION ---
  if (view === "login" || view === "signup") {
    return (
      <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center p-6 font-sans">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-10 animate-in">
          <h1 className="text-7xl lg:text-9xl font-black text-yellow-500 italic tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            GUISOGA
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 uppercase tracking-tighter">
            L'EMPIRE DE JOSEPH GUILAVOGUI
          </h2>
          <p className="text-zinc-500 text-lg font-light tracking-[0.3em]">EXCELLENCE & PRESTIGE</p>
        </div>

        <div className="lg:w-[450px] w-full animate-in">
          <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-zinc-800">
            <form onSubmit={view === "login" ? handleLogin : handleSignup} className="space-y-4">
              {view === "signup" && (
                <div className="flex gap-4">
                  <input required type="text" placeholder="Prénom" className="w-1/2 bg-black border border-zinc-700 text-white p-4 rounded-2xl focus:border-yellow-500 outline-none" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  <input required type="text" placeholder="Nom" className="w-1/2 bg-black border border-zinc-700 text-white p-4 rounded-2xl focus:border-yellow-500 outline-none" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-zinc-600" size={20} />
                <input required type="email" placeholder="Adresse e-mail" className="w-full bg-black border border-zinc-700 text-white p-4 pl-12 rounded-2xl focus:border-yellow-500 outline-none" />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-zinc-600" size={20} />
                <input required type="password" placeholder="Mot de passe" className="w-full bg-black border border-zinc-700 text-white p-4 pl-12 rounded-2xl focus:border-yellow-500 outline-none" />
              </div>

              <button type="submit" className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl text-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 active:scale-95">
                {view === "login" ? "CONNEXION" : "REJOINDRE L'EMPIRE"}
              </button>

              <div className="text-center">
                <span className="text-zinc-500 text-sm">
                  {view === "login" ? "Pas encore membre ?" : "Déjà un compte ?"}
                </span>
                <button type="button" onClick={() => setView(view === "login" ? "signup" : "login")} className="ml-2 text-yellow-500 font-bold hover:underline">
                  {view === "login" ? "Créer nouveau compte" : "Se connecter"}
                </button>
              </div>
            </form>
          </div>
          <p className="text-zinc-600 text-center mt-8 text-xs font-bold tracking-widest uppercase">
            Créer une Page pour votre Communauté et Viser plus loin.
          </p>
        </div>
      </div>
    );
  }

  // --- ÉCRAN D'ACCUEIL APRÈS CONNEXION ---
  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <nav className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
        <h1 className="text-2xl font-black text-yellow-500 italic">GUISOGA</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-yellow-500 tracking-tighter">
            {userProfile.firstName} {userProfile.lastName}
          </span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-black uppercase">
            {userProfile.firstName[0]}
          </div>
        </div>
      </nav>

      {/* FEED (Même style que Facebook mais Noir/Or) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-zinc-900 p-6 rounded-[24px] border border-zinc-800">
           <h3 className="text-xl font-black mb-2">Bonjour, {userProfile.firstName} !</h3>
           <p className="text-zinc-400">Prêt à bâtir l'excellence aujourd'hui dans l'Empire de Joseph Guilavogui ?</p>
        </div>
        
        {/* POST EXEMPLE */}
        <div className="bg-zinc-900 rounded-[24px] border border-zinc-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">JG</div>
            <div>
              <p className="font-black text-sm">JOSEPH GUILAVOGUI <Star size={12} className="inline text-yellow-500 fill-yellow-500" /></p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Fondateur • En ligne</p>
            </div>
          </div>
          <div className="h-64 bg-zinc-800 flex items-center justify-center text-zinc-700 italic">Publication de l'Empire...</div>
          <div className="p-4 flex justify-around border-t border-zinc-800">
            <Heart size={20} className="text-zinc-500" />
            <MessageCircle size={20} className="text-zinc-500" />
            <Share2 size={20} className="text-zinc-500" />
          </div>
        </div>
      </div>

      {/* BARRE NAV BAS */}
      <nav className="bg-zinc-900 border-t border-zinc-800 p-4 flex justify-around">
        <Home className="text-yellow-500" />
        <Video className="text-zinc-600" />
        <Plus className="bg-white text-black rounded-lg p-1" />
        <MessageCircle className="text-zinc-600" />
        <Menu className="text-zinc-600" />
      </nav>
    </main>
  );
}