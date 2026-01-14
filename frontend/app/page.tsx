"use client";
import { useState } from "react";
import { Lock, Mail, User, Star, ArrowRight } from "lucide-react";

export default function GuisogaLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ prenom: "", nom: "" });

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center p-6 font-sans">
      
      {/* SECTION GAUCHE : LOGO ET MESSAGE */}
      <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-10">
        <div className="flex justify-center lg:justify-start mb-6">
          {/* Utilisation du logo doré que tu as fourni */}
          <img src="/icon-512.png.png" alt="GUISOGA Logo" className="w-32 h-32 object-contain shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
        </div>
        <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">
          GUISOGA
        </h1>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 uppercase">
          BIENVENUE DANS L’EMPIRE DE JOSEPH GUILAVOGUI
        </h2>
        <p className="text-[#D4AF37]/60 text-lg uppercase tracking-[0.4em] font-light">
          Bâtissez l'excellence. Rejoignez l'élite.
        </p>
      </div>

      {/* SECTION DROITE : FORMULAIRE NOIR ET DORÉ (IDENTIQUE À TON IMAGE) */}
      <div className="lg:w-[450px] w-full">
        <div className="bg-[#111111] p-10 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,1)] border border-[#D4AF37]/20">
          <form className="space-y-6">
            {!isLogin && (
              <div className="flex gap-4">
                <input required type="text" placeholder="Prénom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" onChange={(e)=>setUserData({...userData, prenom: e.target.value})} />
                <input required type="text" placeholder="Nom" className="w-1/2 bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none transition-all" onChange={(e)=>setUserData({...userData, nom: e.target.value})} />
              </div>
            )}
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Adresse e-mail ou numéro de tél." 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                placeholder="Mot de passe" 
                className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-5 rounded-2xl text-xl hover:brightness-110 transition-all shadow-[0_10px_25px_rgba(212,175,55,0.2)]"
            >
              {isLogin ? "CONNEXION" : "REJOINDRE L'EMPIRE"}
            </button>
            
            <div className="text-center">
              <a href="#" className="text-[#D4AF37]/70 text-sm hover:underline hover:text-[#D4AF37]">Mot de passe oublié ?</a>
            </div>
            
            <hr className="border-zinc-800 my-6" />
            
            <div className="flex justify-center items-center gap-4">
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="bg-zinc-800 text-white font-bold py-4 px-8 rounded-2xl hover:bg-zinc-700 transition-all border border-zinc-700 text-sm"
              >
                {isLogin ? "Créer nouveau compte" : "Se connecter"}
              </button>
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <ArrowRight size={20} />
              </div>
            </div>
          </form>
        </div>
        
        {/* MESSAGE BAS DE PAGE RÉPARÉ */}
        <p className="text-zinc-500 text-center mt-10 text-xs font-bold tracking-widest leading-loose uppercase">
          Créer une Page pour votre <br/>
          <span className="text-[#D4AF37]">Communauté</span> et Viser plus loin.
        </p>
      </div>
    </div>
  );
}