"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ prenom: "", nom: "" });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* --- CÔTÉ GAUCHE : LOGO ET TEXTE --- */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <img 
            src="/logo.png" 
            alt="GUISOGA" 
            className="w-48 h-48 mx-auto lg:mx-0 object-contain mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
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

        {/* --- CÔTÉ DROITE : CARTE DE CONNEXION --- */}
        <div className="lg:w-[450px] w-full">
          <div className="bg-[#111] p-8 rounded-[35px] shadow-[0_10px_50px_rgba(0,0,0,1)] border border-[#D4AF37]/20">
            <form className="space-y-4">
              {!isLogin && (
                <div className="flex gap-3">
                  <input required type="text" placeholder="Prénom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" onChange={(e)=>setUserData({...userData, prenom: e.target.value})} />
                  <input required type="text" placeholder="Nom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" onChange={(e)=>setUserData({...userData, nom: e.target.value})} />
                </div>
              )}
              
              <input 
                type="text" 
                placeholder="Adresse e-mail ou numéro de tél." 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all"
              />
              
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all"
              />
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 uppercase"
              >
                CONNEXION
              </button>
              
              <div className="text-center">
                <a href="#" className="text-[#D4AF37]/70 text-sm hover:underline">Mot de passe oublié ?</a>
              </div>
              
              <hr className="border-zinc-800 my-4" />
              
              <div className="flex justify-center">
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="bg-zinc-900 text-white font-bold py-4 px-10 rounded-2xl hover:bg-zinc-800 border border-zinc-700 transition-all"
                >
                  {isLogin ? "Créer nouveau compte" : "Se connecter"}
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-zinc-500 text-center mt-8 text-xs font-bold tracking-widest uppercase leading-loose">
            CRÉER UNE PAGE POUR VOTRE <br/>
            <span className="text-[#D4AF37]">COMMUNAUTÉ</span> ET VISER PLUS LOIN.
          </p>
        </div>

      </div>
    </div>
  );
}