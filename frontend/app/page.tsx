"use client";
import { useState } from "react";

export default function GuisogaEmpire() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* --- CÔTÉ GAUCHE : LOGO ET TITRES --- */}
        <div className="lg:w-1/2 text-center lg:text-left animate-in fade-in duration-1000">
          <img 
            src="/logo.png" 
            alt="GUISOGA" 
            className="w-40 h-40 mx-auto lg:mx-0 object-contain mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
          />
          <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">
            GUISOGA
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 uppercase leading-tight">
            BIENVENUE DANS L’EMPIRE <br/> DE JOSEPH GUILAVOGUI
          </h2>
          <p className="text-[#D4AF37]/60 text-lg uppercase tracking-[0.3em] font-light">
            Bâtissez l'excellence. Rejoignez l'élite.
          </p>
        </div>

        {/* --- CÔTÉ DROITE : FORMULAIRE STYLE IMAGE 2 --- */}
        <div className="lg:w-[450px] w-full animate-in slide-in-from-right duration-700">
          <div className="bg-[#121212] p-8 rounded-[40px] shadow-[0_0_60px_rgba(0,0,0,1)] border border-[#D4AF37]/20">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Adresse e-mail ou numéro de tél." 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
              />
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
              />
              
              <button className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F2D472] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 uppercase">
                CONNEXION
              </button>
              
              <div className="text-center">
                <a href="#" className="text-[#D4AF37]/70 text-sm hover:underline hover:text-[#D4AF37]">Mot de passe oublié ?</a>
              </div>
              
              <hr className="border-zinc-800 my-4" />
              
              <div className="flex justify-center">
                <button 
                  type="button"
                  className="bg-zinc-900 text-white font-bold py-4 px-10 rounded-2xl hover:bg-zinc-800 border border-zinc-700 transition-all text-sm"
                >
                  Créer nouveau compte
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-zinc-600 text-center mt-10 text-xs font-bold tracking-widest uppercase leading-loose">
            CRÉER UNE PAGE POUR VOTRE <br/>
            <span className="text-[#D4AF37]">COMMUNAUTÉ</span> ET VISER PLUS LOIN.
          </p>
        </div>

      </div>
    </div>
  );
}