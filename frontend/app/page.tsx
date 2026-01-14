"use client";
import { useState, useRef, useEffect } from "react";
// Importation complète pour éviter les erreurs "is not defined"
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera, Play, CheckCircle, Star,
  TrendingUp, Zap, User
} from "lucide-react";

export default function GuisogaOmni() {
  const [activeTab, setActiveTab] = useState("home"); // home, cinema, live, match, video
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Base de données pour simuler le flux infini et les pubs
  const allContent = [
    { id: "p1", type: "post", user: "Joseph Guilavogui", videoId: "RCgjYlZ34jw", text: "L'Empire s'agrandit chaque jour ! 🌍", verified: true },
    { id: "ad1", type: "ads", user: "GUISOGA BUSINESS", videoId: "gcpq4wDm9gM", text: "Votre publicité ici pour toucher des millions de personnes. 🚀", isAd: true },
    { id: "v1", type: "video", user: "Guisoga Studio", videoId: "SKfHpHnr5WY", text: "Action pure. 🔥" },
    { id: "l1", type: "live", user: "Empire Live", videoId: "RCgjYlZ34jw", isLive: true }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER PREMIUM */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-2 bg-zinc-800 rounded-full text-yellow-500">
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-zinc-900 rounded-full text-red-500 animate-pulse flex items-center gap-1">
            <Radio size={18} /> <span className="text-[10px] font-bold">LIVE</span>
          </button>
          <div className="p-2 bg-zinc-900 rounded-full" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL DYNAMIQUE */}
      <div className="flex-1 overflow-y-auto bg-zinc-950">
        
        {/* 1. ACCUEIL STYLE FACEBOOK (image_aa4521 inspire) */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in">
            {/* STORIES (Inspiré de CheepChat image_2252) */}
            <div className="flex gap-3 p-4 overflow-x-auto bg-black border-b border-zinc-900">
              <div className="min-w-[100px] h-44 bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-700">
                <Plus size={28} className="text-yellow-500" />
                <span className="text-[10px] font-bold mt-2 uppercase">Créer</span>
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="min-w-[100px] h-44 bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* FLUX DE POSTS / PUBS / CINÉMA */}
            {allContent.map((item) => (
              <div key={item.id} className="bg-black mb-4 border-b border-zinc-900">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black shadow-lg">G</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black uppercase tracking-wide">{item.user}</span>
                        {item.isAd ? <Star size={12} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={12} className="text-blue-500" />}
                      </div>
                      <p className="text-[10px] text-zinc-500">{item.isAd ? "Sponsorisé" : "Officiel Empire"}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={20} className="text-zinc-600" />
                </div>
                <p className="px-4 pb-4 text-sm leading-relaxed">{item.text}</p>
                <div className="aspect-video bg-zinc-900 relative">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=${playingId === item.id ? 1 : 0}&controls=1`}
                    allow="autoplay"
                  />
                  {playingId !== item.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center" onClick={() => setPlayingId(item.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl">
                        <Play size={32} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex gap-8">
                  <div className="flex items-center gap-2"><Heart size={24} /> <span className="text-xs font-bold">12K</span></div>
                  <div className="flex items-center gap-2" onClick={() => setActiveTab("chat")}><MessageSquare size={24} /> <span className="text-xs font-bold">450</span></div>
                  <Share2 size={24} className="ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. VIDÉOS INFINIES STYLE TIKTOK REELS */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {allContent.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full" 
                  src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`}
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10">
                  <div className="flex flex-col items-center"><div className="p-3 bg-white/10 rounded-full backdrop-blur-md mb-1"><Heart size={32} /></div><span className="text-[10px] font-bold">Like</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-white/10 rounded-full backdrop-blur-md mb-1"><MessageCircle size={32} /></div><span className="text-[10px] font-bold">Chat</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-white/10 rounded-full backdrop-blur-md mb-1"><Share2 size={32} /></div><span className="text-[10px] font-bold">Share</span></div>
                </div>
                <div className="absolute left-4 bottom-32 max-w-[70%] drop-shadow-lg">
                  <p className="font-black text-yellow-500 mb-1 flex items-center gap-2 text-lg italic">@{v.user} <CheckCircle size={14} /></p>
                  <p className="text-sm font-medium line-clamp-2">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. EMPIRE MATCH STYLE TINDER (image_2253 inspire) */}
        {activeTab === "match" && (
          <div className="h-full p-4 flex flex-col items-center justify-center animate-in zoom-in">
             <div className="w-full max-w-sm bg-zinc-900 rounded-[3rem] overflow-hidden border-2 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="h-[480px] relative">
                  <img src="https://i.pravatar.cc/600?u=dating" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <h3 className="text-3xl font-black mb-1">Elite Member, 26</h3>
                    <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold">
                      <Globe size={16} /> <span>Proche de votre Empire</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex gap-4 bg-black/90 backdrop-blur-xl">
                  <button className="flex-1 bg-zinc-800 py-4 rounded-2xl text-red-500 flex justify-center hover:bg-zinc-700"><X size={32} /></button>
                  <button className="flex-1 bg-yellow-500 py-4 rounded-2xl text-black flex justify-center shadow-lg active:scale-90 transition-transform"><Heart size={32} fill="currentColor" /></button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE UNIFIÉE */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
        <NavButton icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavButton icon={<Film />} label="Cinéma" active={activeTab === "cinema"} onClick={() => setActiveTab("cinema")} />
        
        {/* BOUTON CENTRAL PUBLICATION */}
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(234,179,8,0.5)] active:scale-90 transition-all cursor-pointer">
          <Plus size={32} strokeWidth={3} />
        </div>

        <NavButton icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        <NavButton icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
      </nav>
    </main>
  );
}

// Composant Bouton Nav pour éviter les répétitions
function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? "text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}