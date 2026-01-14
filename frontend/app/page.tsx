"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera, Play, CheckCircle, Star,
  TrendingUp, Image as ImageIcon, Bell, User, MoreVertical
} from "lucide-react";

export default function GuisogaOmniPro() {
  const [activeTab, setActiveTab] = useState("home"); // home, video, live, match, cinema
  const [hasMounted, setHasMounted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Algorithme de contenu massif (Posts, Pubs, Vidéos, Cinéma)
  const allContent = [
    { id: "p1", type: "post", user: "Joseph Guilavogui", videoId: "RCgjYlZ34jw", text: "L'Empire s'étend ! 🌍", verified: true },
    { id: "ad1", type: "ads", user: "GUISOGA SPONSOR", videoId: "gcpq4wDm9gM", text: "Boostez vos revenus avec nos outils.", isAd: true },
    { id: "v1", type: "reels", user: "Guisoga Reels", videoId: "SKfHpHnr5WY", text: "Action pure. 🔥", likes: "2.4M" },
    { id: "l1", type: "live", user: "GUISOGA LIVE", videoId: "dqt14eKqtac", isLive: true, viewers: "45K" },
    { id: "c1", type: "cinema", user: "Cinema Elite", videoId: "RCgjYlZ34jw", text: "Sortie Mondiale 2026." }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* --- HEADER TYPE FACEBOOK / MESSENGER --- */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 shadow-xl z-50">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <div className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800"><Search size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* --- ZONE DE CONTENU DYNAMIQUE --- */}
      <div className="flex-1 overflow-y-auto bg-zinc-950 scrollbar-hide">
        
        {/* SECTION ACCUEIL (Style Facebook / image_b59a51) */}
        {activeTab === "home" && (
          <div className="pb-24 animate-in fade-in">
            {/* STORIES FONCTIONNELLES */}
            <div className="flex gap-3 p-4 overflow-x-auto bg-black border-b border-zinc-900">
              <div className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-700" onClick={() => fileInputRef.current?.click()}>
                <Plus size={32} className="text-yellow-500 mb-2" />
                <span className="text-[10px] font-black uppercase">Ma Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden shadow-lg transition-transform active:scale-95" onClick={() => setStoryOpen(true)}>
                  <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-yellow-500 overflow-hidden shadow-md">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* PUBLICATION DE POST (image_b59a51) */}
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-black">J</div>
              <button className="flex-1 bg-zinc-900 text-left px-5 py-2.5 rounded-full text-zinc-500 text-sm border border-zinc-800 hover:bg-zinc-800">Quoi de neuf Joseph ?</button>
              <ImageIcon className="text-green-500" size={24} />
            </div>

            {/* FLUX ALGORITHMIQUE (Posts + Ads + Cinema) */}
            {allContent.filter(c => c.type !== "reels").map(post => (
              <EmpirePost key={post.id} post={post} isPlaying={playingId === post.id} onPlay={() => setPlayingId(post.id)} />
            ))}
          </div>
        )}

        {/* SECTION VIDÉOS INFINIES (Algorithme TikTok / image_a8fdee) */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-black">
            {allContent.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full" 
                  src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&controls=0&loop=1&playlist=${v.videoId}&mute=0`}
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10">
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Heart size={32} /></div><span className="text-[10px] font-bold mt-1">12.5K</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={32} /></div><span className="text-[10px] font-bold mt-1">2K</span></div>
                  <div className="flex flex-col items-center"><div className="p-3 bg-zinc-900/60 rounded-full backdrop-blur-md border border-white/10"><Share2 size={32} /></div><span className="text-[10px] font-bold mt-1">Partage</span></div>
                </div>
                <div className="absolute left-4 bottom-32 max-w-[70%] drop-shadow-xl">
                  <p className="font-black text-yellow-500 text-xl mb-1 italic">@{v.user} <CheckCircle size={14} className="inline ml-1" /></p>
                  <p className="text-sm font-medium leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION LIVE (image_aa4521 inspire) */}
        {activeTab === "live" && (
          <div className="p-4 flex flex-col gap-4 pb-24 animate-in slide-in-from-bottom">
            <h2 className="text-2xl font-black text-red-500 flex items-center gap-2">
              <Radio size={24} className="animate-pulse" /> LIVES EN DIRECT
            </h2>
            {allContent.filter(c => c.isLive).map(live => (
              <div key={live.id} className="rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl relative">
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black z-10 flex items-center gap-1">
                  <Users size={12} /> {live.viewers} SPECTATEURS
                </div>
                <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${live.videoId}?autoplay=1`} />
                <div className="p-4 flex items-center justify-between">
                  <span className="font-black uppercase tracking-widest">{live.user}</span>
                  <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black text-xs">REJOINDRE</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION MATCH (image_2253 inspire) */}
        {activeTab === "match" && (
          <div className="h-full flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-zinc-900 rounded-[3rem] overflow-hidden border-2 border-zinc-800 shadow-2xl relative group">
              <img src="https://i.pravatar.cc/600?u=dating" className="w-full h-[520px] object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
                <h3 className="text-3xl font-black mb-1">Elite Member, 26</h3>
                <p className="text-yellow-500 font-bold flex items-center gap-2"><Globe size={18} /> Proche de votre Empire</p>
              </div>
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-16 h-16 bg-zinc-800 rounded-full text-red-500 shadow-xl flex items-center justify-center hover:scale-110"><X size={32} /></button>
                <button className="w-16 h-16 bg-yellow-500 rounded-full text-black shadow-xl flex items-center justify-center hover:scale-110"><Heart size={32} fill="currentColor" /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION UNIFIÉE (L'EMPIRE) --- */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
        <NavIcon icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavIcon icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-white rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90 transition-all cursor-pointer">
          <Plus size={30} strokeWidth={3} />
        </div>

        <NavIcon icon={<Video />} label="Vidéos" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
        <NavIcon icon={<Radio />} label="Live" active={activeTab === "live"} onClick={() => setActiveTab("live")} />
      </nav>
    </main>
  );
}

// COMPOSANTS RÉUTILISABLES POUR ÉVITER LES BUGS
function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? "text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function EmpirePost({ post, isPlaying, onPlay }: any) {
  return (
    <div className="bg-black mb-4 border-b border-zinc-900">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-black" />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-black uppercase tracking-widest">{post.user}</span>
              {post.isAd ? <Star size={10} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={10} className="text-blue-500 fill-blue-500" />}
            </div>
            <p className="text-[9px] text-zinc-500 uppercase">{post.isAd ? "Sponsorisé" : "Certifié Empire"}</p>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-zinc-600" />
      </div>

      <p className="px-4 pb-4 text-sm text-zinc-300">{post.text}</p>

      <div className="aspect-video bg-zinc-900 relative group">
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${post.videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0&controls=1`}
          allow="autoplay"
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer group-hover:bg-black/30 transition-all" onClick={onPlay}>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl scale-90 group-hover:scale-100 transition-transform">
              <Play size={32} fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex gap-8">
        <Heart size={24} className="hover:text-red-500 transition-colors" />
        <MessageSquare size={24} className="hover:text-yellow-500 transition-colors" />
        <Share2 size={24} className="ml-auto text-zinc-500" />
      </div>
    </div>
  );
}