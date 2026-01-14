"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Play, CheckCircle, Star,
  Image as ImageIcon, Bell, User, MoreVertical, Lock, Mail, LogIn, UserPlus
} from "lucide-react";

export default function GuisogaEmpireElite() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ALGORITHME GUISOGA : Met en avant le fondateur Joseph Guilavogui
  const [feed, setFeed] = useState(() => Array.from({ length: 15 }, (_, i) => ({
    id: `g-post-${i}`,
    user: i === 0 ? "JOSEPH GUILAVOGUI" : `Membre Élite #${i + 100}`,
    isFounder: i === 0,
    text: i === 0 
      ? "Bienvenue sur GUISOGA. Ici, nous bâtissons l'excellence ensemble. 🚀" 
      : "Le réseau de l'élite progresse chaque jour. #GUISOGA",
    videoId: i % 2 === 0 ? "RCgjYlZ34jw" : "SKfHpHnr5WY",
    likes: Math.floor(Math.random() * 999) + "K",
    isAd: i % 5 === 0 && i !== 0
  })));

  useEffect(() => { setHasMounted(true); }, []);

  // Chargement infini pour une navigation sans limite
  const loadMore = useCallback(() => {
    const next = Array.from({ length: 10 }, (_, i) => ({
      id: `g-post-${feed.length + i}`,
      user: `Empire Partner ${feed.length + i}`,
      isFounder: false,
      text: "L'excellence GUISOGA n'a pas de limites.",
      videoId: "gcpq4wDm9gM",
      likes: "12K",
      isAd: false
    }));
    setFeed(prev => [...prev, ...next]);
  }, [feed.length]);

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  // --- ÉCRAN D'ACCÈS GUISOGA ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-6 animate-in fade-in">
        <h1 className="text-6xl font-black text-yellow-500 italic mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">GUISOGA</h1>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Fondé par Joseph Guilavogui</p>
        
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center px-4 py-5 focus-within:border-yellow-500 transition-all">
            <Mail className="text-zinc-600 mr-3" size={20} />
            <input className="bg-transparent w-full outline-none text-white text-sm" placeholder="NOM D'UTILISATEUR EMPIRE" />
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center px-4 py-5 focus-within:border-yellow-500 transition-all">
            <Lock className="text-zinc-600 mr-3" size={20} />
            <input type="password" className="bg-transparent w-full outline-none text-white text-sm" placeholder="CLEF D'ACCÈS" />
          </div>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-transform text-sm uppercase tracking-widest"
          >
            ENTRER DANS L'EXCELLENCE
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER GUISOGA PREMIUM */}
      <nav className="px-5 py-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-yellow-500 italic leading-none">GUISOGA</h1>
          <span className="text-[7px] font-bold text-zinc-500 tracking-[0.2em]">BY JOSEPH GUILAVOGUI</span>
        </div>
        <div className="flex gap-4">
          <div className="p-2 bg-zinc-900 rounded-full cursor-pointer hover:text-yellow-500"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full cursor-pointer hover:text-yellow-500" onClick={() => setActiveTab("messenger")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* CONTENU FLUIDE */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-hide bg-zinc-950"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollHeight - scrollTop <= clientHeight + 150) loadMore();
        }}
      >
        {activeTab === "home" && (
          <div className="animate-in fade-in pb-24">
            {/* STORIES EXCELLENCE */}
            <div className="flex gap-3 p-4 bg-black overflow-x-auto scrollbar-hide">
              <div className="min-w-[110px] h-44 bg-zinc-900 rounded-3xl relative border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 group" onClick={() => fileInputRef.current?.click()}>
                <Plus size={28} className="text-yellow-500 group-hover:scale-125 transition-transform" />
                <span className="text-[8px] font-black uppercase mt-2">Ma Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-800 rounded-3xl relative overflow-hidden border border-zinc-800 shadow-2xl">
                  <img src={`https://picsum.photos/200/400?random=${i+50}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-yellow-500 p-0.5">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} className="rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* MUR DE PUBLICATION */}
            <div className="mx-4 p-4 bg-zinc-900/50 rounded-3xl border border-zinc-800 flex items-center gap-4 my-2">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black text-xs shadow-lg">J</div>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 text-left text-zinc-500 text-xs font-bold tracking-wide">
                QUOI DE NEUF POUR L'EMPIRE, JOSEPH ?
              </button>
              <ImageIcon className="text-yellow-500/50" size={20} />
            </div>

            {/* FEED ALGORITHMIQUE */}
            {feed.map((post) => (
              <div key={post.id} className="bg-black mt-4 border-b border-zinc-900/50 pb-6">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full p-0.5 ${post.isFounder ? 'bg-yellow-500' : 'bg-zinc-800'}`}>
                       <div className="w-full h-full bg-black rounded-full overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${post.id}`} alt="avatar" />
                       </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-black tracking-tighter ${post.isFounder ? 'text-yellow-500' : 'text-white'}`}>{post.user}</span>
                        {post.isFounder ? <Star size={12} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={12} className="text-blue-500 fill-blue-500" />}
                      </div>
                      <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{post.isFounder ? "Fondateur" : "Membre Certifié"}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={20} className="text-zinc-700 cursor-pointer" />
                </div>
                <p className="px-4 pb-4 text-sm text-zinc-300 font-medium leading-relaxed">{post.text}</p>
                <div className="aspect-video bg-zinc-900 relative group">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${playingId === post.id ? 1 : 0}&mute=0&controls=1`} />
                  {playingId !== post.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(post.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all hover:scale-110">
                        <Play size={32} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors"><Heart size={24} /> <span className="text-xs font-black">{post.likes}</span></div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors"><MessageSquare size={24} /> <span className="text-xs font-black">Réagir</span></div>
                  </div>
                  <Share2 size={24} className="text-zinc-600 cursor-pointer hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION VIDÉOS PLEIN ÉCRAN (GUISOGA REELS) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {feed.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`} />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={30} /></div><span className="text-[10px] font-bold mt-1">Like</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={30} /></div><span className="text-[10px] font-bold mt-1">Chat</span></div>
                </div>
                <div className="absolute left-4 bottom-32 max-w-[70%]">
                  <p className="font-black text-yellow-500 text-xl italic drop-shadow-lg">@{v.user}</p>
                  <p className="text-sm font-bold text-white drop-shadow-md">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION GUISOGA */}
      <nav className="bg-zinc-950 border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.9)]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer">
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
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}