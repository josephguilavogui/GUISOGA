"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, X, Users, 
  Video, Radio, Film, MoreHorizontal, Camera, Play, CheckCircle, Star
} from "lucide-react";

export default function GuisogaInfinity() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Liste étendue pour simuler l'infini et la pub
  const contentData = [
    { id: "vid1", type: "post", user: "Joseph Guilavogui", videoId: "RCgjYlZ34jw", text: "Bienvenue dans l'Empire ! 🌍" },
    { id: "ad1", type: "ads", user: "GUISOGA ADS", videoId: "gcpq4wDm9gM", text: "Boostez votre visibilité ici ! 🚀", isAd: true },
    { id: "vid2", type: "video", user: "Guisoga Cinema", videoId: "SKfHpHnr5WY", text: "Le film du moment." },
    { id: "vid3", type: "video", user: "Empire Music", videoId: "dqt14eKqtac", text: "Mix 2026." },
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* HEADER FIXE AVEC BOUTON RETOUR */}
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
          <div className="p-2 bg-zinc-900 rounded-full text-yellow-500 animate-pulse"><Radio size={20} /></div>
          <div className="p-2 bg-zinc-900 rounded-full" onClick={() => setActiveTab("chat")}><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* ZONE DE CONTENU */}
      <div className="flex-1 overflow-y-auto bg-zinc-950 scroll-smooth">
        
        {/* --- 1. ACCUEIL (TYPE FACEBOOK) --- */}
        {activeTab === "home" && (
          <div className="pb-24">
            {/* STORIES */}
            <div className="flex gap-3 p-4 overflow-x-auto bg-black border-b border-zinc-900">
              <div className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-700">
                <Plus size={24} className="text-yellow-500" />
                <span className="text-[10px] font-bold mt-1 uppercase">Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border border-zinc-800 relative overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                </div>
              ))}
            </div>

            {/* FLUX DE POSTS ET PUBS */}
            {contentData.map((item) => (
              <div key={item.id} className="bg-black mb-4 border-b border-zinc-900">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black">G</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-black uppercase">{item.user}</span>
                        {item.isAd ? <Star size={12} className="text-yellow-500 fill-yellow-500" /> : <CheckCircle size={12} className="text-blue-500" />}
                      </div>
                      <p className="text-[10px] text-zinc-500">{item.isAd ? "Sponsorisé • Publicité" : "Empire Officiel"}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={20} />
                </div>
                <p className="px-4 pb-4 text-sm">{item.text}</p>
                <div className="aspect-video bg-zinc-900 relative">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=${playingId === item.id ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1`}
                    allow="autoplay"
                  />
                  {playingId !== item.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer" onClick={() => setPlayingId(item.id)}>
                      <Play size={48} className="text-yellow-500" fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex gap-6">
                  <Heart size={24} />
                  <MessageSquare size={24} />
                  <Share2 size={24} className="ml-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 2. VIDÉOS INFINIES (STYLE TIKTOK) --- */}
        {activeTab === "video" && (
          <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
            {contentData.map((v) => (
              <div key={v.id} className="h-full w-full snap-start relative bg-black">
                <iframe 
                  className="w-full h-full" 
                  src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${v.videoId}`}
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-28 flex flex-col gap-6 items-center">
                  <div className="p-3 bg-black/50 rounded-full backdrop-blur-md"><Heart size={30} /></div>
                  <div className="p-3 bg-black/50 rounded-full backdrop-blur-md"><MessageCircle size={30} /></div>
                  <div className="p-3 bg-black/50 rounded-full backdrop-blur-md"><Share2 size={30} /></div>
                </div>
                <div className="absolute left-4 bottom-28 max-w-[70%]">
                  <p className="font-black text-yellow-500">@{v.user}</p>
                  <p className="text-sm line-clamp-2">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 3. GUISOGA MATCH (GLOBE) --- */}
        {activeTab === "match" && (
          <div className="p-4 flex flex-col items-center justify-center h-full animate-in zoom-in">
             <div className="w-full max-w-sm bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl">
                <img src="https://i.pravatar.cc/500?u=match" className="w-full h-96 object-cover" />
                <div className="p-8 text-center bg-zinc-950">
                   <h2 className="text-2xl font-black mb-2">Empire Match</h2>
                   <p className="text-zinc-500 text-sm mb-6">Trouvez des profils d'exception.</p>
                   <div className="flex gap-4">
                      <button className="flex-1 bg-zinc-800 py-4 rounded-2xl text-red-500"><X /></button>
                      <button className="flex-1 bg-yellow-500 py-4 rounded-2xl text-black"><Heart fill="currentColor" /></button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* BARRE DE NAVIGATION (L'EMPIRE) */}
      <nav className="bg-black border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-[100]">
        <NavBtn icon={<Home />} label="Empire" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavBtn icon={<Film />} label="Cinema" active={activeTab === "cinema"} onClick={() => setActiveTab("cinema")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-11 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]">
          <Plus size={30} strokeWidth={3} />
        </div>
        <NavBtn icon={<Globe />} label="Match" active={activeTab === "match"} onClick={() => setActiveTab("match")} />
        <NavBtn icon={<Video />} label="Vidéo" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
      </nav>
    </main>
  );
}

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? "text-yellow-500 scale-110" : "text-zinc-600"}`}>
      {icon}
      <span className="text-[7px] font-black uppercase">{label}</span>
    </button>
  );
}