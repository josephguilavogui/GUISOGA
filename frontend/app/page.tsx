"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Play, CheckCircle, Star,
  Image as ImageIcon, Bell, User, MoreVertical
} from "lucide-react";

// 1. ALGORITHME DE GÉNÉRATION DE CONTENU INFINI
const generateMoreContent = (startIndex: number) => {
  const videoIds = ["RCgjYlZ34jw", "SKfHpHnr5WY", "gcpq4wDm9gM", "dqt14eKqtac", "sk763h78", "jsh728h"];
  return Array.from({ length: 10 }, (_, i) => ({
    id: `item-${startIndex + i}`,
    type: (startIndex + i) % 3 === 0 ? "reels" : "post",
    user: `Empire User ${startIndex + i}`,
    videoId: videoIds[(startIndex + i) % videoIds.length],
    text: `Contenu exclusif Guisoga #${startIndex + i} - L'empire s'agrandit ! 🌍`,
    likes: `${Math.floor(Math.random() * 100)}K`,
    isLive: (startIndex + i) % 7 === 0
  }));
};

export default function GuisogaOmniExcellence() {
  const [activeTab, setActiveTab] = useState("home");
  const [hasMounted, setHasMounted] = useState(false);
  const [feed, setFeed] = useState(() => generateMoreContent(0));
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // 2. FONCTION POUR CHARGER PLUS (INFINI)
  const loadMore = useCallback(() => {
    setFeed(prev => [...prev, ...generateMoreContent(prev.length)]);
  }, []);

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER FIXE */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter cursor-pointer" onClick={() => setActiveTab("home")}>GUISOGA</h1>
        <div className="flex gap-4">
          <div className="p-2 bg-zinc-900 rounded-full cursor-pointer hover:bg-zinc-800"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full cursor-pointer hover:bg-zinc-800" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* ZONE DE CONTENU AVEC SCROLL INFINI */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-zinc-950 scrollbar-hide"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollHeight - scrollTop <= clientHeight + 100) loadMore();
        }}
      >
        
        {/* SECTION STORIES & PUBLICATION (HOME) */}
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex gap-3 p-4 overflow-x-auto bg-black border-b border-zinc-900">
              <div className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors" onClick={() => fileInputRef.current?.click()}>
                <Plus size={32} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase mt-2">Ma Story</span>
              </div>
              {/* Stories simulées */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION RÉACTIVE */}
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center gap-4 cursor-pointer hover:bg-zinc-900 transition-colors" onClick={() => fileInputRef.current?.click()}>
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black">J</div>
              <div className="flex-1 bg-zinc-900 px-5 py-2.5 rounded-full text-zinc-500 text-sm border border-zinc-800">Partagez une nouvelle victoire, Joseph...</div>
              <ImageIcon className="text-green-500" size={24} />
            </div>

            {/* FLUX DE POSTS GÉNÉRÉS */}
            {feed.map((item) => (
              <div key={item.id} className="bg-black mb-4 border-b border-zinc-900">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500/50" />
                    <span className="text-xs font-black uppercase tracking-widest">{item.user}</span>
                  </div>
                  <MoreHorizontal size={20} className="text-zinc-600 cursor-pointer" />
                </div>
                <p className="px-4 pb-4 text-sm text-zinc-300">{item.text}</p>
                <div className="aspect-video bg-zinc-900 relative">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${item.videoId}?autoplay=${playingId === item.id ? 1 : 0}&mute=0`} />
                  {playingId !== item.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(item.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl transition-transform active:scale-90"><Play size={32} fill="currentColor" /></div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex gap-8">
                  <Heart size={24} className="hover:text-red-500 cursor-pointer transition-colors" />
                  <MessageSquare size={24} className="hover:text-yellow-500 cursor-pointer transition-colors" />
                  <Share2 size={24} className="ml-auto text-zinc-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION VIDÉOS PLEIN ÉCRAN (TIKTOK STYLE) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {feed.filter(i => i.type === "reels").map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`} />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10 cursor-pointer active:scale-90"><Heart size={32} /></div><span className="text-[10px] font-bold mt-1">{v.likes}</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10 cursor-pointer active:scale-90"><MessageCircle size={32} /></div><span className="text-[10px] font-bold mt-1">Chat</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION - TOUT EST CLIQUABLE ICI */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100]">
        <NavBtn icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavBtn icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg active:scale-90 transition-all cursor-pointer">
          <Plus size={30} strokeWidth={3} />
        </div>

        <NavBtn icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
        <NavBtn icon={<Radio />} label="Live" active={activeTab === "live"} onClick={() => setActiveTab("live")} />
      </nav>
    </main>
  );
}

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}