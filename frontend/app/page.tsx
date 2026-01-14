"use client";
import { useState, useRef } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, Search, 
  Share2, Send, Play, ShieldCheck, Plus, Camera, DollarSign, Radio
} from "lucide-react";

export default function GuisogaTikTokEmpire() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Système de monétisation (Portefeuille fictif pour commencer)
  const [earnings, setEarnings] = useState(0.00);

  // Vidéos style TikTok (Scroll vertical)
  const feedVideos = [
    { id: "p68mMDBQRyA", title: "Zee Magic Live", user: "Guisoga TV", likes: "12K" },
    { id: "4YzrzUc8TAA", title: "Guddan Episode", user: "Zee Magic", likes: "45K" },
    { id: "jfKfPfyJRdk", title: "Lofi Beats 24/7", user: "Relax Station", likes: "8K" }
  ];

  const triggerLive = () => {
    alert("Démarrage du Studio LIVE Guisoga... (Connexion caméra en cours)");
  };

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      
      {/* BARRE SUPÉRIEURE : MONÉTISATION & RECHERCHE */}
      <nav className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full border border-yellow-500/50">
          <DollarSign size={14} className="text-yellow-500" />
          <span className="text-xs font-black">{earnings.toFixed(2)} €</span>
        </div>
        <h1 className="text-xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4">
          <Search size={22} />
          <Radio size={22} className="text-red-500 animate-pulse cursor-pointer" onClick={triggerLive} />
        </div>
      </nav>

      {/* ZONE DE CONTENU PRINCIPAL */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        
        {/* --- FLUX VIDÉO STYLE TIKTOK --- */}
        {activeTab === "home" && feedVideos.map((vid, idx) => (
          <section key={idx} className="h-[calc(100vh-140px)] w-full snap-start relative bg-zinc-950">
            {/* Lecteur Vidéo Plein Écran */}
            <iframe 
              className="w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${vid.id}`} 
              allow="autoplay; encrypted-media"
            ></iframe>

            {/* Overlay d'interactions (À droite) */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center" onClick={() => setEarnings(earnings + 0.01)}>
                <div className="bg-zinc-900/80 p-3 rounded-full border border-white/20">
                  <Heart size={28} className="text-white hover:text-red-500 transition-colors" />
                </div>
                <span className="text-[10px] font-bold mt-1">{vid.likes}</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-full border border-white/20" onClick={() => setActiveTab("chat")}>
                <MessageCircle size={28} />
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-full border border-white/20">
                <Share2 size={28} />
              </div>
              {/* Bouton Cadeau / Argent */}
              <div className="bg-yellow-500 p-3 rounded-full shadow-lg shadow-yellow-500/40" onClick={() => setEarnings(earnings + 1.50)}>
                <DollarSign size={28} className="text-black" />
              </div>
            </div>

            {/* Infos Vidéo (En bas à gauche) */}
            <div className="absolute left-4 bottom-20 max-w-[70%]">
              <p className="font-black text-sm mb-1 uppercase tracking-tighter">@{vid.user}</p>
              <p className="text-xs text-gray-300 line-clamp-2">{vid.title}</p>
              <div className="mt-4 flex items-center gap-2">
                 <button 
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${
                    isSubscribed ? "bg-zinc-800 text-gray-400" : "bg-yellow-500 text-black"
                  }`}
                 >
                   {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
                 </button>
              </div>
            </div>
          </section>
        ))}

        {/* --- SECTION LIVE (TikTok Style) --- */}
        {activeTab === "video" && (
          <section className="p-4 flex flex-col items-center justify-center h-full bg-zinc-950 text-center">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-red-500/20">
              <Radio size={48} />
            </div>
            <h2 className="text-2xl font-black uppercase mb-2 italic">Lancer un Direct</h2>
            <p className="text-gray-500 text-xs mb-8 max-w-[250px]">Partagez votre écran ou votre caméra et recevez des cadeaux en direct.</p>
            <button 
              onClick={triggerLive}
              className="bg-white text-black font-black px-10 py-4 rounded-full uppercase tracking-widest text-xs hover:bg-yellow-500 transition-all"
            >
              Démarrer le Live
            </button>
          </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-[100]">
        <Home 
          className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-700"} 
          onClick={() => setActiveTab("home")} 
        />
        <Plus 
          className="bg-white text-black rounded-xl p-1 scale-150" 
          onClick={triggerLive}
        />
        <Tv 
          className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-700"} 
          onClick={() => setActiveTab("video")} 
        />
        <div 
          onClick={() => setActiveTab("home")} 
          className={`w-8 h-8 rounded-full border-2 ${activeTab === "home" ? "border-yellow-500 shadow-lg" : "border-zinc-800"}`}
        >
           <img src="/icon-512.png" className="w-full h-full object-cover rounded-full" />
        </div>
      </nav>
    </main>
  );
}