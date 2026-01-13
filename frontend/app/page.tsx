"use client";
import { useState } from "react";
import { Home, Tv, MessageCircle, Users, Heart, PlusSquare, Search, Share2, ShieldCheck } from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [subs, setSubs] = useState(1250); // Un nombre stable pour commencer

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-20">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-black text-yellow-500 tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4">
          <PlusSquare className="text-gray-300 cursor-pointer" />
          <Search className="text-gray-300 cursor-pointer" />
          <MessageCircle className="text-gray-300 cursor-pointer" />
        </div>
      </nav>

      <div className="p-0">
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-500">
            
            {/* MESSAGE DE BIENVENUE - EMPREINTE JOSEPH GUILAVOGUI */}
            <div className="bg-gradient-to-r from-yellow-900/20 to-black m-4 p-6 rounded-3xl border border-yellow-500/30">
              <h2 className="text-lg font-black text-yellow-500 mb-1">BIENVENUE DANS L'EMPIRE</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                "Ici, chaque analyse est une clé vers votre succès. Voyez plus loin avec nous."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-yellow-500"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
                  JOSEPH GUILAVOGUI
                </span>
              </div>
            </div>

            {/* SECTION ABONNEMENT SIMPLIFIÉE */}
            <div className="px-4 mb-6">
              <button 
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl hover:bg-white transition-all active:scale-95 shadow-lg shadow-yellow-500/10 uppercase tracking-widest text-xs"
              >
                S'ABONNER
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-2 uppercase tracking-tighter">
                Rejoignez {subs.toLocaleString()} membres actifs mondialement
              </p>
            </div>

            {/* FIL D'ACTUALITÉ */}
            {[1, 2].map((post) => (
              <div key={post} className="border-b border-zinc-900 pb-4 mb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full border border-yellow-500 flex items-center justify-center overflow-hidden">
                    <img src="/icon-192.png" alt="JG" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">GUISOGA Officiel</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter text-yellow-600">Certifié par Joseph Guilavogui</p>
                  </div>
                </div>
                <div className="aspect-video bg-zinc-900 w-full flex items-center justify-center border-y border-white/5">
                   <p className="text-gray-700 font-black italic text-4xl opacity-20">GUISOGA LIVE</p>
                </div>
                <div className="flex gap-6 p-4">
                  <Heart size={22} className="cursor-pointer hover:text-red-500 transition-colors" />
                  <MessageCircle size={22} className="cursor-pointer" />
                  <Share2 size={22} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Autres onglets (Video, Dating) restent identiques */}
        {activeTab === "video" && (
           <section className="h-[80vh] flex flex-col items-center justify-center p-10 text-center">
             <Tv size={60} className="text-yellow-500 mb-4" />
             <h2 className="text-xl font-black">FLUX VIDÉO DIRECT</h2>
             <p className="text-gray-500 text-sm mt-2">Contenu exclusif sans redirection.</p>
           </section>
        )}

        {activeTab === "dating" && (
           <section className="p-6">
             <h2 className="text-2xl font-black text-yellow-500 mb-6">RENCONTRES</h2>
             <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black">
                      <p className="font-bold text-xs text-white">Membre Global {i}</p>
                    </div>
                 </div>
               ))}
             </div>
           </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION FIXE */}
      <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-lg border-t border-zinc-800 px-8 py-4 flex justify-between items-center z-50">
        <Home 
          className={`cursor-pointer transition-all ${activeTab === "home" ? "text-yellow-500 scale-125" : "text-gray-500"}`} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          className={`cursor-pointer transition-all ${activeTab === "video" ? "text-yellow-500 scale-125" : "text-gray-500"}`} 
          onClick={() => setActiveTab("video")} 
        />
        <Users 
          className={`cursor-pointer transition-all ${activeTab === "dating" ? "text-yellow-500 scale-125" : "text-gray-500"}`} 
          onClick={() => setActiveTab("dating")} 
        />
        <div className="w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.3)]">
          <img src="/icon-512.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </nav>
    </main>
  );
}