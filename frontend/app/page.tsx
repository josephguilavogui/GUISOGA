"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, PlayCircle
} from "lucide-react";

export default function GuisogaMasterFix() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  const feed = [
    { id: 1, videoId: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Action 2026" },
    { id: 2, videoId: "gcpq4wDm9gM", user: "Afro Beats", title: "Hit Music" }
  ];

  const matches = [
    { id: 101, name: "Sarah", age: 24, country: "France", img: "https://i.pravatar.cc/150?u=sarah" },
    { id: 102, name: "Moussa", age: 28, country: "Guinée", img: "https://i.pravatar.cc/150?u=moussa" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* BIENVENUE JOSEPH */}
      {showWelcome && (
        <div className="bg-yellow-500 text-black px-4 py-1.5 flex justify-between items-center z-[110]">
          <p className="text-[9px] font-black uppercase italic">Empire de Joseph Guilavogui</p>
          <X size={14} onClick={() => setShowWelcome(false)} className="cursor-pointer" />
        </div>
      )}

      {/* HEADER AVEC BOUTON RETOUR RÉEL */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button 
              onClick={() => setActiveTab("home")} 
              className="p-1.5 bg-zinc-800 rounded-full text-yellow-500 hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <h1 className="text-xl font-black text-yellow-500 italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-500" />}
          </button>
        </div>
      </nav>

      {/* ZONE DE CONTENU */}
      <div className="flex-1 overflow-y-auto bg-black">
        
        {/* --- ACCUEIL (FEED) --- */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in">
            {feed.map((post) => (
              <div key={post.id} className="mb-8 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black">G</div>
                  <span className="text-xs font-bold uppercase">{post.user}</span>
                </div>
                
                {/* LECTEUR VIDÉO AMÉLIORÉ */}
                <div className="aspect-video w-full bg-zinc-900 relative">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${post.videoId}?controls=1&modestbranding=1&rel=0&autoplay=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-4 flex gap-8">
                  <Heart 
                    size={28} 
                    onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))}
                    className={likes[post.id] ? "text-red-500 fill-red-500" : "text-white"}
                  />
                  <MessageSquare size={28} onClick={() => setActiveTab("chat")} />
                  <Share2 size={28} className="ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PARTIE MATCH (GLOBE) --- */}
        {activeTab === "match" && (
          <div className="p-4 grid grid-cols-1 gap-6 pb-24 animate-in slide-in-from-bottom">
            <h2 className="text-yellow-500 font-black uppercase text-center mb-2">Rencontres Internationales</h2>
            {matches.map((m) => (
              <div key={m.id} className="bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800 p-6 flex flex-col items-center shadow-xl">
                <img src={m.img} className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover mb-4" />
                <h3 className="text-xl font-black">{m.name}, {m.age}</h3>
                <p className="text-zinc-500 text-xs uppercase font-bold mb-4">{m.country}</p>
                <div className="flex gap-4 w-full">
                  <button className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold text-red-500">Passer</button>
                  <button onClick={() => setActiveTab("chat")} className="flex-1 bg-yellow-500 py-3 rounded-xl font-bold text-black flex items-center justify-center gap-2">
                    <Send size={16} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PARTIE CHAT --- */}
        {activeTab === "chat" && (
          <div className="h-full flex flex-col p-4 animate-in fade-in">
            <div className="flex-1 bg-zinc-900/50 rounded-3xl p-6 flex flex-col items-center justify-center border border-zinc-800 border-dashed">
              <MessageCircle size={48} className="text-zinc-700 mb-4" />
              <p className="text-zinc-500 italic text-sm">Aucune discussion ouverte.</p>
              <button onClick={() => setActiveTab("match")} className="mt-4 text-yellow-500 text-xs font-black uppercase">Trouver quelqu'un</button>
            </div>
            <div className="mt-4 flex gap-2">
              <input placeholder="Votre message..." className="flex-1 bg-zinc-900 rounded-2xl px-4 py-3 text-sm outline-none border border-zinc-800 focus:border-yellow-500" />
              <button className="bg-yellow-500 text-black p-3 rounded-2xl"><Send size={20} /></button>
            </div>
          </div>
        )}
      </div>

      {/* --- NAVIGATION DU BAS --- */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? "text-yellow-500" : "text-zinc-600"}>
          <Home size={26} />
        </button>
        <button onClick={() => setActiveTab("home")} className="text-zinc-600">
          <Tv size={26} />
        </button>
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 cursor-pointer">
          <Plus size={24} className="text-black" />
        </div>
        <button onClick={() => setActiveTab("match")} className={activeTab === "match" ? "text-yellow-500" : "text-zinc-600"}>
          <Globe size={26} />
        </button>
        <button onClick={() => setActiveTab("chat")} className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-600"}>
          <MessageCircle size={26} />
        </button>
      </nav>
    </main>
  );
}