"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera, Play, CheckCircle
} from "lucide-react";

export default function GuisogaEmpireUltimate() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Liste de contenus pour les différentes sections
  const feedPosts = [
    { id: "vid1", type: "post", user: "Joseph Guilavogui", videoId: "RCgjYlZ34jw", text: "Ma vision pour l'Empire 2026 🌍" },
    { id: "vid2", type: "cinema", user: "Guisoga Cinema", videoId: "SKfHpHnr5WY", text: "Nouveau blockbuster disponible !" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* BANNIÈRE DE BIENVENUE ÉLÉGANTE */}
      <div className="bg-yellow-500 text-black px-4 py-1.5 flex justify-between items-center z-[110] text-[9px] font-black uppercase tracking-widest italic">
        <span>Empire de JOSEPH GUILAVOGUI</span>
        <div className="flex gap-2 items-center">
           <Radio size={12} className="animate-pulse text-red-600" />
           <span>LIVE SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* HEADER PRINCIPAL AVEC RETOUR */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 shadow-2xl">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1.5 bg-zinc-800 rounded-full text-yellow-500 shadow-lg">
              <ChevronLeft size={22} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-zinc-900 rounded-full text-zinc-400"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full text-zinc-400" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* CORPS DE L'APPLICATION */}
      <div className="flex-1 overflow-y-auto bg-zinc-950 scrollbar-hide">
        
        {/* --- SECTION ACCUEIL (Style Facebook) --- */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in duration-500">
            {/* STORIES */}
            <div className="flex gap-3 p-4 overflow-x-auto bg-black/50 backdrop-blur-md border-b border-zinc-900">
              <div className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative overflow-hidden border border-dashed border-zinc-600 flex flex-col items-center justify-center">
                <Plus size={32} className="text-yellow-500 mb-2" />
                <span className="text-[10px] font-bold uppercase">Ajouter</span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border border-zinc-800 relative shadow-lg">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-9 h-9 rounded-full absolute top-2 left-2 border-2 border-yellow-500 shadow-md" />
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-yellow-500/30 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* CRÉATION DE POST */}
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black">J</div>
              <div className="flex-1 bg-zinc-900 px-5 py-2.5 rounded-full text-zinc-500 text-sm border border-zinc-800">Partagez votre empire, Joseph...</div>
              <Camera className="text-yellow-500" size={24} />
            </div>

            {/* FLUX D'ACTUALITÉ */}
            {feedPosts.map(post => (
              <EmpirePost 
                key={post.id} 
                post={post} 
                isPlaying={playingId === post.id} 
                onPlay={() => setPlayingId(post.id)}
                isMuted={isMuted}
              />
            ))}
          </div>
        )}

        {/* --- SECTION CINEMA --- */}
        {activeTab === "cinema" && (
          <div className="p-4 pb-24 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom">
            <h2 className="col-span-2 text-yellow-500 font-black italic border-l-4 border-yellow-500 pl-3">GUISOGA CINÉMA</h2>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 relative group shadow-2xl">
                <img src={`https://picsum.photos/400/600?random=${i}`} className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <Play className="absolute inset-0 m-auto text-yellow-500" size={40} fill="currentColor" />
                <p className="absolute bottom-3 left-3 text-[10px] font-black uppercase">Exclusivité Guisoga</p>
              </div>
            ))}
          </div>
        )}

        {/* --- SECTION MATCH --- */}
        {activeTab === "match" && (
          <div className="h-full p-4 flex flex-col items-center justify-center animate-in zoom-in">
            <div className="w-full max-w-sm bg-zinc-900 rounded-[3rem] overflow-hidden border-2 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="h-[450px] relative">
                <img src="https://i.pravatar.cc/600?u=empire_match" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-3xl font-black mb-1">Elena, 24</h3>
                  <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold">
                    <Globe size={16} /> <span>À 5km de votre Empire</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex gap-4 bg-zinc-950">
                <button className="flex-1 bg-zinc-800 py-4 rounded-2xl text-red-500 hover:bg-zinc-700 transition-colors"><X size={30} /></button>
                <button className="flex-1 bg-yellow-500 py-4 rounded-2xl text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-transform active:scale-90"><Heart size={30} fill="currentColor" /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION INFÉRIEURE (L'Empire) --- */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Film />} label="Cinema" active={activeTab === "cinema"} onClick={() => setActiveTab("cinema")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] active:scale-95 transition-all">
          <Plus size={32} strokeWidth={3} />
        </div>
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        <NavIcon icon={<Video />} label="Vidéo" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
      </nav>
    </main>
  );
}

// COMPOSANTS POUR ÉVITER LES ERREURS DE DÉFINITION
function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? "text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function EmpirePost({ post, isPlaying, onPlay, isMuted }: any) {
  return (
    <div className="bg-black mb-4 border-b border-zinc-900">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-black shadow-lg" />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-black uppercase tracking-widest">{post.user}</span>
              <CheckCircle size={12} className="text-blue-500" fill="currentColor" />
            </div>
            <p className="text-[10px] text-zinc-500">Il y a 2 heures • Empire Public</p>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-zinc-600" />
      </div>

      <p className="px-4 pb-4 text-sm text-zinc-300 leading-relaxed">{post.text}</p>

      {/* ZONE VIDÉO AVEC SMART AUTO-STOP */}
      <div className="aspect-video bg-zinc-900 relative group">
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1`}
          allow="autoplay; encrypted-media"
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer group-hover:bg-black/30 transition-all" onClick={onPlay}>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl scale-90 group-hover:scale-100 transition-transform">
              <Play size={32} fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex items-center justify-between border-t border-zinc-900/50">
        <div className="flex gap-6">
          <div className="flex items-center gap-2"><Heart size={22} className="hover:text-red-500 transition-colors" /> <span className="text-xs font-bold text-zinc-500">12.5K</span></div>
          <div className="flex items-center gap-2" onClick={() => onPlay()}><MessageSquare size={22} className="hover:text-yellow-500 transition-colors" /> <span className="text-xs font-bold text-zinc-500">430</span></div>
        </div>
        <Share2 size={22} className="text-zinc-500" />
      </div>
    </div>
  );
}