"use client";
import { useState, useRef } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, 
  Share2, Send, Play, ShieldCheck, Plus, Radio, Camera, Film, Music
} from "lucide-react";

export default function GuisogaEmpireElite() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FLUX VIDÉOS VARIÉS (Action, Musique, Humour)
  const feedVideos = [
    { id: "SKfHpHnr5WY", user: "Ciné Action", title: "Nouveau Film Action 2025", type: "Film" },
    { id: "gcpq4wDm9gM", user: "Kedjevara", title: "Clip Officiel - Afrobeats", type: "Music" },
    { id: "dqt14eKqtac", user: "Funny Home", title: "Best Fails 2025", type: "Funny" },
    { id: "RCgjYlZ34jw", user: "Naza ft SDM", title: "Tout donner", type: "Music" }
  ];

  const handleFileSelect = () => fileInputRef.current?.click();

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      {/* Sélecteur de fichiers invisible pour Stories et Posts */}
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* HEADER PROFESSIONNEL */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-5 items-center">
          <Search size={22} className="text-zinc-400" />
          <div className="relative" onClick={() => setActiveTab("chat")}>
            <MessageCircle size={22} className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-400"} />
            <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* --- ACCUEIL STYLE FACEBOOK (Stories + Publications) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in pb-20">
            {/* STORIES INTERACTIVES */}
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide bg-black">
              <div 
                onClick={handleFileSelect}
                className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-all"
              >
                <Camera size={28} className="text-yellow-500 mb-2" />
                <span className="text-[9px] font-black uppercase">Ma Story</span>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-yellow-500 overflow-hidden z-10">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="object-cover" />
                  </div>
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute bottom-2 left-2 text-[8px] font-bold uppercase shadow-black">Membre VIP</div>
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION */}
            <div className="m-4 p-4 bg-zinc-900 rounded-2xl flex items-center gap-4 cursor-pointer" onClick={handleFileSelect}>
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-sm shadow-lg shadow-yellow-500/20">JG</div>
              <p className="text-zinc-500 text-sm italic">Quoi de neuf, Joseph ?</p>
              <Plus className="ml-auto text-yellow-500" size={24} />
            </div>

            {/* FEED DE PUBLICATIONS VIDÉO DIRECTES */}
            {feedVideos.slice(0, 2).map((vid, idx) => (
              <div key={idx} className="mb-8 bg-zinc-950 border-y border-zinc-900 pb-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-yellow-500/30">
                      {vid.type === "Film" ? <Film size={16} /> : <Music size={16} />}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase">{vid.user}</p>
                      <p className="text-[9px] text-zinc-500">Publication suggérée</p>
                    </div>
                  </div>
                  <button onClick={() => setIsSubscribed(!isSubscribed)} className="text-[10px] font-black text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full">
                    {isSubscribed ? "ABONNÉ" : "SUIVRE"}
                  </button>
                </div>
                <div className="aspect-video w-full bg-zinc-900">
                   <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid.id}?controls=1&modestbranding=1`} allowFullScreen />
                </div>
                <div className="flex gap-10 p-4 px-6 opacity-80">
                  <Heart size={22} className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle size={22} className="cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 size={22} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- MODE TIKTOK TV (Défilement Vertical Infini) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
            {feedVideos.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative flex items-center justify-center">
                <iframe 
                  className="w-full h-full object-cover" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&controls=0&loop=1&playlist=${vid.id}&modestbranding=1&rel=0`} 
                  allow="autoplay"
                />
                {/* Interactions TikTok */}
                <div className="absolute right-4 bottom-28 flex flex-col gap-7 z-20">
                  <div className="flex flex-col items-center"><Heart size={35} className="text-white drop-shadow-lg" /><span className="text-[10px] mt-1 font-bold">12K</span></div>
                  <div className="flex flex-col items-center" onClick={() => setActiveTab("chat")}><MessageCircle size={35} className="text-white drop-shadow-lg" /><span className="text-[10px] mt-1 font-bold">450</span></div>
                  <div className="flex flex-col items-center"><Share2 size={35} className="text-white drop-shadow-lg" /><span className="text-[10px] mt-1 font-bold">Share</span></div>
                </div>
                {/* Légende en bas */}
                <div className="absolute left-4 bottom-16 z-20 max-w-[70%]">
                  <p className="font-black text-sm drop-shadow-md">@{vid.user} ✓</p>
                  <p className="text-xs text-white/90 mt-1 line-clamp-2">{vid.title}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded animate-pulse">EN DIRECT</div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* --- MODE LIVE (Studio Direct) --- */}
        {activeTab === "live" && (
          <section className="h-full bg-zinc-950 flex flex-col items-center justify-center p-8 animate-in zoom-in">
            <div 
              onClick={handleFileSelect}
              className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-8 animate-pulse cursor-pointer shadow-[0_0_50px_rgba(220,38,38,0.4)]"
            >
              <Radio size={45} className="text-white" />
            </div>
            <h2 className="text-3xl font-black italic uppercase mb-3">Studio Live</h2>
            <p className="text-zinc-500 text-xs mb-10 max-w-[220px] text-center uppercase tracking-widest">Lancez votre diffusion et interagissez en temps réel.</p>
            <button 
              onClick={handleFileSelect}
              className="bg-white text-black font-black px-14 py-5 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-xl active:scale-95"
            >
              Démarrer le Direct
            </button>
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE FIXE (Premium) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        
        {/* BOUTON LIVE CENTRAL */}
        <div 
          onClick={() => setActiveTab("live")}
          className="w-14 h-9 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 hover:border-yellow-500 transition-all shadow-inner"
        >
          <Plus size={22} className="text-white" />
        </div>

        <Users className={activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <div onClick={() => setActiveTab("home")} className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden shadow-lg shadow-black">
          <img src="/icon-512.png" className="w-full h-full object-cover" alt="Me" />
        </div>
      </nav>
    </main>
  );
}