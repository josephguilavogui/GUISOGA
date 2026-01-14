"use client";
import { useState, useEffect } from "react";

export default function GuisogaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Charge les infos enregistrées au démarrage
  useEffect(() => {
    const savedEmail = localStorage.getItem("guisoga_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Enregistre l'email pour la prochaine fois
    localStorage.setItem("guisoga_email", email);
    alert("Connexion à l'Empire en cours...");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* GAUCHE : IDENTITÉ VISUELLE */}
        <div className="lg:w-1/2 text-center lg:text-left animate-in">
          <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
          <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
          <h2 className="text-2xl font-bold text-white uppercase">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
          <p className="text-[#D4AF37]/60 text-lg tracking-[0.3em] font-light">EXCELLENCE & PRESTIGE</p>
        </div>

        {/* DROITE : FORMULAIRE DE CONNEXION (TEXTE BLANC LISIBLE) */}
        <div className="lg:w-[450px] w-full">
          <div className="bg-[#111] p-10 rounded-[40px] border border-[#D4AF37]/30 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input 
                  required
                  type="text" 
                  name="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail ou mobile" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
              
              <div>
                <input 
                  required
                  type="password" 
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe" 
                  className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-5 rounded-2xl text-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 uppercase"
              >
                CONNEXION
              </button>
              
              <div className="text-center">
                <a href="#" className="text-[#D4AF37]/70 text-sm hover:underline">Mot de passe oublié ?</a>
              </div>
              
              <hr className="border-zinc-800" />
              
              <div className="flex justify-center">
                <button type="button" className="bg-zinc-900 text-white font-bold py-4 px-10 rounded-2xl hover:bg-zinc-800 border border-zinc-700 transition-all text-sm">
                  Créer nouveau compte
                </button>
              </div>
            </form>
          </div>
          <p className="text-zinc-600 text-center mt-10 text-xs font-bold tracking-widest uppercase leading-loose">
            Créer une Page pour votre <span className="text-[#D4AF37]">Communauté</span> et Viser plus loin.
          </p>
        </div>
      </div>
    </div>
  );
}