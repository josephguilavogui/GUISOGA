"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Home, MessageCircle, Heart, Search, Share2, Plus, 
  MessageSquare, Globe, X, Video, Radio, Play, CheckCircle, Star,
  Image as ImageIcon, User, LogIn, UserPlus, ShieldCheck, Zap
} from "lucide-react";

export default function GuisogaMVP() {
  const [step, setStep] = useState("auth"); // auth, empire
  const [activeTab, setActiveTab] = useState("home"); 
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. ALGORITHME TRANSPARENT (MVP) ---
  // Au lieu d'un chaos, on trie par "Interêt" et "Temps"
  const [feed, setFeed] = useState(() => Array.from({ length: 10 }, (_, i) => ({
    id: `post-${i}`,
    author: i % 2 === 0 ? "Joseph Guilavogui" : `Expert Empire ${i}`,
    content: i % 3 === 0 ? "L'éthique est le futur des réseaux sociaux. 🔐" : "Nouveau projet validé sur la plateforme.",
    videoId: i % 2 === 0 ? "RCgjYlZ34jw" : "SKfHpHnr5WY",
    likes: Math.floor(Math.random() * 1000),
    category: i % 2 === 0 ? "Business" : "Tech"
  })));

  useEffect(() => { setHasMounted(true); }, []);

  // --- 2. SCROLL INFINI (Performance optimisée) ---
  const handleScroll = useCallback((e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      const more = Array.from({ length: 5 }, (_, i) => ({
        id: `post-${feed.length + i}`,
        author: `Membre ${feed.length + i}`,
        content: "Contenu généré par l'algorithme éthique.",
        videoId: "gcpq4wDm9gM",
        likes: 50,
        category: "Nouveauté"
      }));
      setFeed(prev => [...prev, ...more]);
    }
  }, [feed.length]);

  if (!hasMounted) return <div className="bg-zinc-950 min-h-screen" />;

  // --- ÉCRAN D'AUTHENTIFICATION (Phase 1) ---
  if (step === "auth") {
    return (
      <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 animate-in zoom-in duration-500">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-zinc-500">
            <ShieldCheck size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Social Éthique & Privé</span>
          </div>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <input className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 outline-none focus:border-yellow-500 text-sm" placeholder="Nom d'utilisateur" />
          <input type="password" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 outline-none focus:border-yellow-500 text-sm" placeholder="Mot de passe" />
          
          <button onClick={() => setStep("empire")} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            ENTRER DANS L'EMPIRE <LogIn size={20} />
          </button>

          <button className="w-full bg-zinc-800 text-white font-black py-4 rounded-2xl border border-zinc-700 flex items-center justify-center gap-2 active:scale-95 transition-all">
            CRÉER UN COMPTE <UserPlus size={20} />
          </button>
        </div>
        <p className="mt-8 text-zinc-600 text-[10px] text-center max-w-xs">
          En rejoignant Guisoga, vous reprenez le contrôle de vos données et de votre temps.
        </p>
      </div>
    );
  }

  // --- INTERFACE EMPIRE (MVP FONCTIONNEL) ---
  return (
    <main className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER PREMIUM */}
      <header className="p-4 flex justify-between items-center bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black italic">G</div>
           <h2 className="text-xl font-black tracking-tighter">GUISOGA</h2>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-zinc-800 rounded-full hover:bg-yellow-500 hover:text-black transition-all cursor-pointer"><Search size={20} /></div>
          <div className="p-2 bg-zinc-800 rounded-full cursor-pointer" onClick={() => setActiveTab("messenger")}><MessageCircle size={20} /></div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" onScroll={handleScroll}>
        {activeTab === "home" && (
          <div className="pb-24">
            {/* STORIES SÉLECTIONNÉES */}
            <div className="flex gap-3 p-4 bg-zinc-950 overflow-x-auto scrollbar-hide">
              <div className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 hover:border-yellow-500 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Plus size={28} />
                <span className="text-[9px] font-black mt-2 uppercase">Story</span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden border border-zinc-700">
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-40" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 bg-black" />
                </div>
              ))}
            </div>

            {/* FLUX ÉTHIQUE (Pas de chaos, trié par pertinence) */}
            {feed.map(post => (
              <div key={post.id} className="bg-zinc-900/40 mb-2 border-y border-zinc-900 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-yellow-500" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black">{post.author}</span>
                        <CheckCircle size={12} className="text-blue-500 fill-blue-500" />
                      </div>
                      <span className="text-[8px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400 font-bold uppercase">{post.category}</span>
                    </div>
                  </div>
                </div>
                <p className="px-4 pb-4 text-sm text-zinc-300 leading-relaxed">{post.content}</p>
                
                <div className="aspect-video bg-black relative group">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${playingId === post.id ? 1 : 0}&mute=0&controls=1`} />
                  {!playingId && (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(post.id)}>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl active:scale-90 transition-all"><Play size={32} fill="currentColor" /></div>
                    </div>
                  )}
                </div>

                <div className="p-4 flex justify-between">
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500"><Heart size={24} /> <span className="text-xs font-bold">{post.likes}</span></div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-500"><MessageSquare size={24} /> <span className="text-xs font-bold text-zinc-500">Réagir</span></div>
                  </div>
                  <Share2 size={24} className="text-zinc-600 hover:text-white cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION REELS (TIKTOK CLONE) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {feed.map(v => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}`} />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center"><div className="p-4 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={30} /></div></div>
                  <div className="flex flex-col items-center"><div className="p-4 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={30} /></div></div>
                </div>
                <div className="absolute left-4 bottom-32">
                  <p className="text-yellow-500 font-black text-xl italic">@{v.author}</p>
                  <p className="text-sm text-zinc-200 mt-1">{v.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION (Simplifiée & Rapide) */}
      <nav className="bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex justify-between items-center z-[100] shadow-2xl">
        <NavButton icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavButton icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        
        {/* POSTER (MVP central) */}
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg shadow-white/10 active:scale-90 transition-all cursor-pointer">
          <Plus size={28} strokeWidth={3} />
        </div>

        <NavButton icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
        <NavButton icon={<Zap />} label="Market" active={activeTab === "market"} onClick={() => setActiveTab("market")} />
      </nav>
    </main>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? "text-yellow-500 scale-110" : "text-zinc-500 hover:text-zinc-300"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}