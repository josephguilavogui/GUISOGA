"use client";
import { useState, useRef, useEffect } from "react";
// Importation de TOUTES les icônes nécessaires pour éviter les bugs
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera, Play, CheckCircle, Star,
  TrendingUp, Zap, User, Bell, Smile, Image, Paperclip
} from "lucide-react";

export default function GuisogaEmpireFinal() {
  const [activeTab, setActiveTab] = useState("home"); // home, cinema, match, video, chat
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Algorithme de contenu (Mélange Posts, Pubs et Vidéos)
  const masterContent = [
    { id: "v1", type: "reels", user: "Guisoga Cinema", videoId: "RCgjYlZ34jw", text: "L'empire ne dort jamais. 🌍", likes: "1.2M" },
    { id: "ad1", type: "ads", user: "BUSINESS ADS", videoId: "gcpq4wDm9gM", text: "Propulsez votre marque ici.", isAd: true },
    { id: "v2", type: "reels", user: "Joseph Pro", videoId: "SKfHpHnr5WY", text: "Production Guisoga 2026.", likes: "800K" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* --- HEADER STYLE FACEBOOK PREMIUM --- */}
      <nav className="px-4 py-3 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* --- ZONE DE CONTENU PRINCIPAL --- */}
      <div className="flex-1 overflow-y-auto bg-zinc-950">
        
        {/* 1. ACCUEIL (Style Facebook avec Algorithme) */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in">
            {/* STORIES */}
            <div className="flex gap-2 p-4 overflow-x-auto bg-black border-b border-zinc-900 scrollbar-hide">
              <div className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center">
                <Plus size={24} className="text-yellow-500 mb-1" />
                <span className="text-[9px] font-black uppercase">Story</span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION */}
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black text-xs">J</div>
              <button className="flex-1 bg-zinc-900 text-left px-5 py-2.5 rounded-full text-zinc-500 text-xs border border-zinc-800">Quoi de neuf Joseph ?</button>
              <Image className="text-green-500" size={20} />
            </div>

            {/* FEED ALGORITHMIQUE */}
            {masterContent.map(item => (
              <div key={item.id} className="bg-black mb-3 border-b border-zinc-900">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500/50" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black uppercase tracking-widest">{item.user}</span>
                        {item.isAd ? <Star size={10} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={10} className="text-blue-500 fill-blue-500" />}
                      </div>
                      <p className="text-[9px] text-zinc-500 uppercase">{item.isAd ? "Sponsorisé" : "Certifié Empire"}</p>
                    </div>
                  </div>
                </div>
                <p className="px-4 pb-3 text-sm text-zinc-300">{item.text}</p>
                <div className="aspect-video bg-black relative">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=${playingId === item.id ? 1 : 0}&mute=0&controls=1`}
                  />
                  {playingId !== item.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(item.id)}>
                      <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl transition-transform active:scale-90">
                        <Play size={28} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between">
                  <div className="flex gap-6">
                    <Heart size={22} className="hover:text-red-500 cursor-pointer" />
                    <MessageSquare size={22} className="hover:text-yellow-500 cursor-pointer" />
                  </div>
                  <Share2 size={22} className="text-zinc-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. VIDÉOS INFINIES (Algorithme TikTok) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {masterContent.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full" 
                  src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}&mute=0`}
                />
                {/* Overlay TikTok-style */}
                <div className="absolute right-4 bottom-28 flex flex-col gap-5 items-center">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={28} /></div><span className="text-[10px] font-bold mt-1">{v.likes}</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={28} /></div><span className="text-[10px] font-bold mt-1">10K</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Share2 size={28} /></div><span className="text-[10px] font-bold mt-1">Share</span></div>
                </div>
                <div className="absolute left-4 bottom-28 max-w-[70%] drop-shadow-lg">
                  <p className="font-black text-yellow-500 text-lg mb-1 italic">@{v.user}</p>
                  <p className="text-sm font-medium">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. MESSENGER (Partie Chat Fonctionnelle) */}
        {activeTab === "chat" && (
          <div className="h-full flex flex-col bg-black animate-in slide-in-from-right">
            <div className="p-4 border-b border-zinc-900 flex items-center gap-3">
              <ChevronLeft onClick={() => setActiveTab("home")} className="text-yellow-500 cursor-pointer" />
              <h2 className="text-lg font-black uppercase">Empire Messenger</h2>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-end gap-4 overflow-y-auto">
               <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">Bonjour Joseph ! Prêt à gérer l'empire aujourd'hui ?</div>
               <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-br-none max-w-[80%] self-end text-sm font-bold">Oui, tout est prêt pour le succès.</div>
            </div>
            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex items-center gap-3">
               <Plus className="text-zinc-500" />
               <input className="flex-1 bg-zinc-900 rounded-full px-4 py-2 text-sm outline-none border border-zinc-800" placeholder="Écrire à un membre..." />
               <Send className="text-yellow-500" />
            </div>
          </div>
        )}

        {/* 4. EMPIRE MATCH (Algorithme Rencontre) */}
        {activeTab === "match" && (
          <div className="h-full flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-sm bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl relative">
                <img src="https://i.pravatar.cc/600?u=empire" className="w-full h-[500px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                   <h3 className="text-3xl font-black mb-1">Inès, 24</h3>
                   <div className="flex items-center gap-2 text-yellow-500 text-sm font-bold"><Globe size={16} /> <span>Membre Élite</span></div>
                </div>
                <div className="absolute right-4 top-4 bg-yellow-500 text-black p-2 rounded-full"><Star size={20} fill="currentColor" /></div>
             </div>
             <div className="flex gap-6 mt-6">
                <button className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-red-500 shadow-xl"><X size={30} /></button>
                <button className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-xl scale-110"><Heart size={30} fill="currentColor" /></button>
             </div>
          </div>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION UNIFIÉE (TOUT EN UN) --- */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer">
          <Plus size={30} strokeWidth={3} />
        </div>

        <NavIcon icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
        <NavIcon icon={<Film />} label="Cinéma" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
      </nav>
    </main>
  );
}

// Composant Nav pour une excellence visuelle
function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-yellow-500 scale-110" : "text-zinc-600"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}