"use client";
import { useState, useRef, useEffect, useCallback } from "react";
// Importation de l'arsenal complet d'icônes pour éviter les bugs
import { 
  Home, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Play, CheckCircle, Star,
  Image as ImageIcon, Bell, User, MoreVertical, ShoppingBag, Menu
} from "lucide-react";

export default function GuisogaSupremacy() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // Algorithme de génération infinie
  const [feed, setFeed] = useState(() => Array.from({ length: 10 }, (_, i) => ({
    id: `item-${i}`,
    user: i % 2 === 0 ? "Joseph Guilavogui" : `Elite Partner ${i}`,
    text: i % 3 === 0 ? "Bienvenue dans l'Empire GUISOGA. La réussite n'attend pas. 🚀" : "Nouveau projet en cours...",
    videoId: i % 2 === 0 ? "RCgjYlZ34jw" : "SKfHpHnr5WY",
    isAd: i % 5 === 0
  })));

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Fonction pour charger plus de contenu (Infini)
  const loadMore = useCallback(() => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: `item-${feed.length + i}`,
      user: `Empire Member ${feed.length + i}`,
      text: "Le futur se construit ici. #GUISOGA",
      videoId: "gcpq4wDm9gM",
      isAd: false
    }));
    setFeed(prev => [...prev, ...newItems]);
  }, [feed.length]);

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-zinc-950 text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* --- HEADER STYLE FACEBOOK PRO --- */}
      <nav className="px-4 py-2 flex justify-between items-center bg-zinc-900 border-b border-zinc-800 z-50">
        <h1 className="text-3xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-2">
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer"><Search size={22} /></div>
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 cursor-pointer" onClick={() => setActiveTab("chat")}><MessageCircle size={22} /></div>
        </div>
      </nav>

      {/* --- ZONE DE SCROLL INFINI --- */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-hide"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollHeight - scrollTop <= clientHeight + 50) loadMore();
        }}
      >
        {/* ACCUEIL (Style Facebook+) */}
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-500">
            {/* STORIES (Défilement horizontal) */}
            <div className="flex gap-2 p-3 bg-zinc-900 border-b border-zinc-800 overflow-x-auto">
              <div className="min-w-[110px] h-48 bg-zinc-800 rounded-xl relative border border-zinc-700 flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="p-2 bg-yellow-500 rounded-full text-black mb-2"><Plus size={24} /></div>
                <span className="text-[10px] font-black uppercase">Ma Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="min-w-[110px] h-48 bg-zinc-700 rounded-xl relative overflow-hidden border border-zinc-600">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* BARRE DE PUBLICATION (image_b59a51) */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black">J</div>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-zinc-800 text-left px-5 py-2.5 rounded-full text-zinc-400 text-sm hover:bg-zinc-700 transition-colors">
                Quoi de neuf, Joseph ?
              </button>
              <ImageIcon className="text-green-500" size={24} />
            </div>

            {/* FLUX DE PUBLICATIONS (Posts & Pubs) */}
            {feed.map((post) => (
              <div key={post.id} className="bg-zinc-900 mb-3 border-y border-zinc-800 shadow-lg">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-zinc-800 border-2 border-yellow-500 shadow-md" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black uppercase tracking-widest">{post.user}</span>
                        {post.isAd ? <Star size={10} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={10} className="text-blue-500 fill-blue-500" />}
                      </div>
                      <p className="text-[9px] text-zinc-500 uppercase">{post.isAd ? "Sponsorisé" : "Officiel Empire"}</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-zinc-500 cursor-pointer" />
                </div>
                <p className="px-4 pb-4 text-sm leading-relaxed text-zinc-200">{post.text}</p>
                
                {/* LECTEUR VIDÉO INTELLIGENT */}
                <div className="aspect-video bg-black relative group">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${playingId === post.id ? 1 : 0}&mute=0&controls=1`}
                    allow="autoplay"
                  />
                  {playingId !== post.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group-hover:bg-black/20" onClick={() => setPlayingId(post.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl scale-95 hover:scale-100 transition-transform">
                        <Play size={32} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 flex justify-between items-center border-t border-zinc-800/50">
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500"><Heart size={24} /> <span className="text-xs font-bold">2.4K</span></div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500"><MessageSquare size={24} /> <span className="text-xs font-bold">180</span></div>
                  </div>
                  <Share2 size={24} className="text-zinc-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION VIDÉOS INFINIES (Style TikTok / Reels) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {feed.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`} />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={32} /></div><span className="text-[10px] font-bold mt-1">Like</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={32} /></div><span className="text-[10px] font-bold mt-1">Chat</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Share2 size={32} /></div><span className="text-[10px] font-bold mt-1">Share</span></div>
                </div>
                <div className="absolute left-4 bottom-32 max-w-[70%]">
                  <p className="font-black text-yellow-500 text-xl italic mb-1">@{v.user}</p>
                  <p className="text-sm line-clamp-2">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION SUPRÊME --- */}
      <nav className="bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        
        {/* BOUTON CENTRAL PUBLIER */}
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg active:scale-90 transition-all cursor-pointer">
          <Plus size={30} strokeWidth={3} />
        </div>

        <NavIcon icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
        <NavIcon icon={<Menu />} label="Menu" active={activeTab === "menu"} onClick={() => setActiveTab("menu")} />
      </nav>
    </main>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-yellow-500 scale-110" : "text-zinc-500 hover:text-zinc-300"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}