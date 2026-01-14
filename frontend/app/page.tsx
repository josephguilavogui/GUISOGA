"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Play, CheckCircle, Star,
  Image as ImageIcon, Bell, User, MoreVertical, ShoppingBag, Menu,
  Lock, Mail, UserPlus, LogIn
} from "lucide-react";

export default function GuisogaEmpire() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulation de base de données infinie
  const [feed, setFeed] = useState(() => Array.from({ length: 10 }, (_, i) => ({
    id: `p-${i}`,
    user: i % 2 === 0 ? "Joseph Guilavogui" : `Membre Empire ${i}`,
    text: i % 3 === 0 ? "Bienvenue dans l'élite. #GUISOGA" : "Une nouvelle opportunité aujourd'hui !",
    videoId: i % 2 === 0 ? "RCgjYlZ34jw" : "SKfHpHnr5WY",
    likes: Math.floor(Math.random() * 500),
    isAd: i % 5 === 0
  })));

  useEffect(() => { setHasMounted(true); }, []);

  const loadMore = useCallback(() => {
    const next = Array.from({ length: 5 }, (_, i) => ({
      id: `p-${feed.length + i}`,
      user: `Membre Empire ${feed.length + i}`,
      text: "Le flux ne s'arrête jamais. #INFINITE",
      videoId: "gcpq4wDm9gM",
      likes: 120,
      isAd: false
    }));
    setFeed(prev => [...prev, ...next]);
  }, [feed.length]);

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  // --- ÉCRAN DE CONNEXION / CRÉATION DE COMPTE ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <h1 className="text-5xl font-black text-yellow-500 italic mb-2 tracking-tighter">GUISOGA</h1>
        <p className="text-zinc-500 text-sm mb-10 font-bold uppercase tracking-widest">Connectez-vous à l'Empire</p>
        
        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-zinc-500" size={20} />
            <input className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 outline-none focus:border-yellow-500 transition-all" placeholder="Email ou Nom d'utilisateur" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-zinc-500" size={20} />
            <input type="password" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 outline-none focus:border-yellow-500 transition-all" placeholder="Mot de passe" />
          </div>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            SE CONNECTER <LogIn size={20} />
          </button>
          
          <div className="flex items-center gap-4 py-4">
            <div className="h-[1px] bg-zinc-800 flex-1" />
            <span className="text-zinc-600 text-xs font-bold">OU</span>
            <div className="h-[1px] bg-zinc-800 flex-1" />
          </div>

          <button className="w-full bg-zinc-800 text-white font-black py-4 rounded-2xl border border-zinc-700 active:scale-95 transition-transform flex items-center justify-center gap-2">
            CRÉER UN COMPTE <UserPlus size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- INTERFACE PRINCIPALE (APRÈS CONNEXION) ---
  return (
    <main className="h-screen bg-zinc-950 text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER TYPE FACEBOOK */}
      <nav className="px-4 py-3 flex justify-between items-center bg-zinc-900 border-b border-zinc-800 z-50 shadow-2xl">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-zinc-800 rounded-full cursor-pointer hover:bg-zinc-700"><Search size={22} /></div>
          <div className="p-2 bg-zinc-800 rounded-full cursor-pointer hover:bg-zinc-700" onClick={() => setActiveTab("messenger")}><MessageCircle size={22} /></div>
        </div>
      </nav>

      {/* ZONE DE CONTENU INFINI */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-hide"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollHeight - scrollTop <= clientHeight + 50) loadMore();
        }}
      >
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-300 pb-20">
            {/* STORIES */}
            <div className="flex gap-2 p-3 bg-zinc-900 border-b border-zinc-800 overflow-x-auto scrollbar-hide">
              <div className="min-w-[100px] h-44 bg-zinc-800 rounded-2xl relative border border-dashed border-zinc-600 flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Plus size={24} className="text-yellow-500 mb-1" />
                <span className="text-[10px] font-black uppercase">Ma Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="min-w-[100px] h-44 bg-zinc-700 rounded-2xl relative overflow-hidden border border-zinc-600">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* PUBLICATION (image_b59a51) */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black">J</div>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-zinc-800 text-left px-5 py-2.5 rounded-full text-zinc-400 text-sm hover:bg-zinc-700">
                Exprimez-vous, Joseph...
              </button>
              <ImageIcon className="text-green-500" size={24} />
            </div>

            {/* FLUX DE POSTS ALGORITHMIQUE */}
            {feed.map((post) => (
              <div key={post.id} className="bg-zinc-900 mb-3 border-y border-zinc-800 shadow-xl">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-zinc-800 border-2 border-yellow-500 shadow-md" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black uppercase tracking-widest">{post.user}</span>
                        {post.isAd ? <Star size={10} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={10} className="text-blue-500 fill-blue-500" />}
                      </div>
                      <p className="text-[9px] text-zinc-500 uppercase">{post.isAd ? "Publicité" : "Post Empire"}</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-zinc-500 cursor-pointer" />
                </div>
                <p className="px-4 pb-4 text-sm text-zinc-200">{post.text}</p>
                <div className="aspect-video bg-black relative">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${playingId === post.id ? 1 : 0}&mute=0&controls=1`} />
                  {playingId !== post.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(post.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl transition-transform active:scale-90"><Play size={32} fill="currentColor" /></div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between items-center border-t border-zinc-800/50">
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500"><Heart size={24} /> <span className="text-xs font-bold">{post.likes}</span></div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500"><MessageSquare size={24} /> <span className="text-xs font-bold">Commenter</span></div>
                  </div>
                  <Share2 size={24} className="text-zinc-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION VIDÉOS PLEIN ÉCRAN (TIKTOK) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {feed.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`} />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={32} /></div><span className="text-[10px] font-bold mt-1">Aimer</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={32} /></div><span className="text-[10px] font-bold mt-1">Messenger</span></div>
                </div>
                <div className="absolute left-4 bottom-32 drop-shadow-2xl">
                   <p className="font-black text-yellow-500 text-xl italic mb-1">@{v.user}</p>
                   <p className="text-sm font-medium">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NAV BARRE INFÉRIEURE */}
      <nav className="bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-[100]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
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