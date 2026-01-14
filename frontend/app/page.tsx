"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera
} from "lucide-react";

export default function GuisogaUltimate() {
  const [activeTab, setActiveTab] = useState("home"); // home, cinema, live, match, video
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Gestion de l'arrêt automatique des vidéos
  const handlePlay = (id: string) => {
    setPlayingId(id);
  };

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* BIENVENUE JOSEPH */}
      <div className="bg-yellow-500 text-black px-4 py-1 flex justify-between items-center z-[110] text-[10px] font-black uppercase italic">
        <span>Empire de JOSEPH GUILAVOGUI</span>
        <MoreHorizontal size={14} />
      </div>

      {/* HEADER TYPE FACEBOOK */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 shadow-2xl">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1.5 bg-zinc-800 rounded-full text-yellow-500">
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <div className="p-2 bg-zinc-900 rounded-full"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* ZONE DE CONTENU DYNAMIQUE */}
      <div className="flex-1 overflow-y-auto bg-zinc-950">
        
        {/* --- 1. ACCUEIL (Style Facebook) --- */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in">
            {/* STORIES */}
            <div className="flex gap-2 p-4 overflow-x-auto bg-black border-b border-zinc-900">
              <div className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden border border-zinc-700">
                <div className="absolute top-2 left-2 p-1 bg-yellow-500 rounded-full"><Plus size={16} className="text-black"/></div>
                <p className="absolute bottom-2 left-2 text-[10px] font-bold">Créer une story</p>
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border border-zinc-800 relative">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full absolute top-2 left-2 border-2 border-yellow-500" />
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION */}
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500" />
              <button className="flex-1 bg-zinc-900 text-left px-4 py-2 rounded-full text-zinc-500 text-sm">Quoi de neuf, Joseph ?</button>
              <Camera className="text-zinc-500" />
            </div>

            {/* FEED (Posts avec arrêt automatique) */}
            <Post id="post1" user="Guisoga Cinema" videoId="SKfHpHnr5WY" currentPlaying={playingId} onPlay={handlePlay} />
            <Post id="post2" user="Guisoga Live" videoId="gcpq4wDm9gM" currentPlaying={playingId} onPlay={handlePlay} />
          </div>
        )}

        {/* --- 2. GUISOGA CINEMA --- */}
        {activeTab === "cinema" && (
          <div className="p-4 pb-24 grid grid-cols-2 gap-4">
            <h2 className="col-span-2 text-yellow-500 font-black italic">CINÉMA EXCLUSIF</h2>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative group">
                <img src={`https://picsum.photos/400/600?random=${i}`} className="w-full h-full object-cover opacity-60" />
                <Play className="absolute inset-0 m-auto text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
              </div>
            ))}
          </div>
        )}

        {/* --- 3. GUISOGA MATCH (GLOBE) --- */}
        {activeTab === "match" && (
          <div className="p-4 pb-24 flex flex-col items-center">
            <div className="w-full max-w-sm bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl">
              <img src="https://i.pravatar.cc/500?u=dating" className="w-full h-96 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-black">Elite Match</h3>
                <p className="text-zinc-500 mb-6">Trouvez des partenaires à votre image.</p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-zinc-800 py-4 rounded-2xl text-red-500"><X /></button>
                  <button className="flex-1 bg-yellow-500 py-4 rounded-2xl text-black"><Heart fill="currentColor" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION INFÉRIEURE SPÉCIALISÉE --- */}
      <nav className="bg-black border-t border-zinc-900 px-4 py-4 flex justify-between items-center z-[100]">
        <NavButton icon={<Home />} label="Accueil" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavButton icon={<Film />} label="Cinema" active={activeTab === "cinema"} onClick={() => setActiveTab("cinema")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black shadow-lg">
          <Plus size={28} />
        </div>
        <NavButton icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        <NavButton icon={<Video />} label="Vidéo" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
      </nav>
    </main>
  );
}

// Composants réutilisables
function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? "text-yellow-500 scale-110" : "text-zinc-600"}`}>
      {icon}
      <span className="text-[8px] font-bold uppercase">{label}</span>
    </button>
  );
}

function Post({ id, user, videoId, currentPlaying, onPlay }: any) {
  const isPlaying = currentPlaying === id;
  return (
    <div className="bg-black mb-2 border-b border-zinc-900">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-500" />
        <span className="text-xs font-black">{user}</span>
      </div>
      <div className="aspect-video bg-zinc-900 relative">
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0&controls=1`}
          onPlay={() => onPlay(id)}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer" onClick={() => onPlay(id)}>
            <Play className="text-yellow-500" size={50} fill="currentColor" />
          </div>
        )}
      </div>
      <div className="p-4 flex gap-6">
        <Heart size={24} />
        <MessageSquare size={24} />
        <Share2 size={24} className="ml-auto" />
      </div>
    </div>
  );
}