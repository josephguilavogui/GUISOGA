"use client";
import { useState, useEffect } from "react";

export default function GuisogaEmpire() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Charger l'email sauvegardé au démarrage
  useEffect(() => {
    const savedEmail = localStorage.getItem("guisoga_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("guisoga_email", email);
    alert(isLoginView ? "Connexion à l'Empire..." : "Création de votre compte Empire...");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* GAUCHE : IDENTITÉ VISUELLE (Fixe comme Facebook) */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <img src="/logo.png" alt="GUISOGA" className="w-44 h-44 mx-auto lg:mx-0 mb-6 drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]" />
          <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
          <h2 className="text-2xl font-bold text-white uppercase leading-tight">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
          <p className="text-[#D4AF37]/60 text-lg tracking-[0.3em] font-light mt-2">BÂTISSEZ L'EXCELLENCE. REJOIGNEZ L'ÉLITE.</p>
        </div>

        {/* DROITE : BLOC DYNAMIQUE (Connexion ou Inscription) */}
        <div className="lg:w-[450px] w-full animate-in fade-in duration-500">
          <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/30 shadow-2xl">
            <form onSubmit={handleAuth} className="space-y-4">
              <h3 className="text-[#D4AF37] text-center font-black text-xl mb-4">
                {isLoginView ? "CONNEXION" : "REJOINDRE L'EMPIRE"}
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
                autoComplete="username"
                placeholder="Adresse e-mail ou mobile" 
                className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none placeholder:text-zinc-600"
              />
              
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Mot de passe" 
                className="w-full bg-black border border-zinc-800 text-white text-lg p-5 rounded-2xl focus:border-[#D4AF37] outline-none placeholder:text-zinc-600"
              />
              
              <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 uppercase">
                {isLoginView ? "Se connecter" : "S'inscrire"}
              </button>
              
              {isLoginView && (
                <div className="text-center">
                  <a href="#" className="text-[#D4AF37]/70 text-sm hover:underline">Mot de passe oublié ?</a>
                </div>
              )}
              
              <hr className="border-zinc-800 my-4" />
              
              <div className="flex justify-center">
                <button 
                  type="button" 
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/40 font-bold py-4 px-10 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all text-sm"
                >
                  {isLoginView ? "Créer nouveau compte" : "Retour à la connexion"}
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-zinc-600 text-center mt-8 text-[10px] font-bold tracking-[0.2em] uppercase leading-loose">
            Créer une Page pour votre <span className="text-[#D4AF37]">Communauté</span> et Viser plus loin.
          </p>
        </div>
      </div>
    </div>
  );
}