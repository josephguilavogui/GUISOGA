"use client";
import { useState } from "react";
import { Lock, Mail, LogIn, UserPlus, ArrowRight } from "lucide-react";

export default function GuisogaLogin() {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center p-6 font-sans">
        
        {/* SECTION GAUCHE : LOGO ET MESSAGE */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-10">
          <h1 className="text-6xl lg:text-8xl font-black text-yellow-500 italic tracking-tighter mb-4">
            GUISOGA
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Bienvenue dans l'EMPIRE DE JOSEPH GUILAVOGUI
          </h2>
          <p className="text-zinc-400 text-lg uppercase tracking-widest font-light">
            Bâtissez l'excellence. Rejoignez l'élite.
          </p>
        </div>

        {/* SECTION DROITE : FORMULAIRE NOIR ET DORÉ */}
        <div className="lg:w-[400px] w-full">
          <div className="bg-zinc-900 p-8 rounded-2xl shadow-[0_20px_50px_rgba(234,179,8,0.1)] border border-zinc-800">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-zinc-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Adresse e-mail ou numéro de tél." 
                  className="w-full bg-black border border-zinc-700 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-yellow-500 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-zinc-500" size={20} />
                <input 
                  type="password" 
                  placeholder="Mot de passe" 
                  className="w-full bg-black border border-zinc-700 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-yellow-500 transition-all"
                />
              </div>
              
              <button 
                onClick={() => setIsLogged(true)}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl text-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
              >
                CONNEXION
              </button>
              
              <div className="text-center py-2">
                <a href="#" className="text-yellow-500/70 text-sm hover:underline">Mot de passe oublié ?</a>
              </div>
              
              <hr className="border-zinc-800 my-4" />
              
              <div className="flex justify-center">
                <button className="bg-zinc-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700">
                  Créer nouveau compte
                </button>
              </div>
            </div>
          </div>
          
          {/* MESSAGE BAS DE PAGE */}
          <p className="text-zinc-500 text-center mt-8 text-sm">
            <span className="font-bold text-zinc-400 cursor-pointer hover:text-yellow-500">Créer une Page</span> pour votre Communauté et Viser plus loin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center text-4xl font-black italic text-yellow-500">
      BIENVENUE DANS L'EMPIRE JOSEPH GUILAVOGUI
    </div>
  );
}