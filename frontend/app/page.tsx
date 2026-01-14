"use client";
import { useState, useRef, useEffect } from "react";
// Correction de l'erreur image_a81558 : Importation correcte des icônes
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, Play
} from "lucide-react";

export default function GuisogaFinalApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Correction de l'erreur d'hydratation
  useEffect(() => { setHasMounted(true); }, []);

  const videoFeed = [
    { id: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Action 2026" },
    { id: "gcpq4wDm9gM", user: "Afro Beats", title: "Nouveau Hit" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* BANNIÈRE DE BIENVENUE JOSEPH (image_aa4521) */}
      {showWelcome && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex justify-between items-center z-[110] font-black text-[10px] uppercase italic">
          <span>Bienvenue sur l'Empire de JOSEPH GUILAVOGUI</span>
          <X size={16} onClick={() => setShowWelcome(false)} className="cursor-pointer" />
        </div>
      )}

      {/* HEADER AVEC BOUTON RETOUR */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 bg-zinc-800 rounded-full text-yellow-500">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-black text-yellow-500 italic">GUISOGA</h1>
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg">
          {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-500" />}
        </button>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 overflow-y-auto">
        
        {/* ONGLET ACCUEIL OU TV */}
        {(activeTab === "home" || activeTab === "video") && (
          <div className="pb-24">
            {videoFeed.map((post) => (
              <div key={post.id} className="mb-6 border-b border-zinc-900">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-[10px]">G</div>
                  <span className="text-xs font-bold uppercase">{post.user}</span>
                </div>
                <div className="aspect-video w-full bg-zinc-900">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${post.id}?controls=1&modestbranding=1`}
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex gap-6">
                  <Heart size={28} />
                  <MessageSquare size={28} onClick={() => setActiveTab("chat")} />
                  <Share2 size={28} className="ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ONGLET MATCH (GLOBE) */}
        {activeTab === "match" && (
          <div className="p-8 text-center animate-in fade-in">
            <Globe size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-xl font-black uppercase italic mb-4">Elite Match</h2>
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800">
              <p className="text-zinc-500 text-sm mb-6">Recherche de profils dans votre zone...</p>
              <button onClick={() => setActiveTab("chat")} className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-xs">
                Lancer la recherche
              </button>
            </div>
          </div>
        )}

        {/* ONGLET MESSAGES */}
        {activeTab === "chat" && (
          <div className="h-full flex flex-col p-4 animate-in slide-in-from-right">
             <h2 className="text-yellow-500 font-black mb-4 uppercase text-center">Messages</h2>
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 italic text-sm">
                <MessageCircle size={48} className="mb-4 opacity-20" />
                <p>Prêt à discuter avec vos nouveaux matchs ?</p>
             </div>
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION (FIXÉE) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home 
          className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("video")} 
        />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 cursor-pointer">
          <Plus size={24} className="text-black" />
        </div>
        <Globe 
          className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("match")} 
        />
        {/* Correction finale : On utilise l'icône MessageCircle ici */}
        <MessageCircle 
          className={activeTab === "chat" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("chat")} 
        />
      </nav>
    </main>
  );
}