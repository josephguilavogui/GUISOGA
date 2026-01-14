"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, 
  Share2, Send, Play, ShieldCheck, Plus, Radio, Camera, Film, Music, Users, ChevronLeft, Volume2
} from "lucide-react";

export default function GuisogaEmpireUnlimited() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Le son est activé par défaut après le premier clic
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // FLUX VIDÉOS INFINI (Simulation par rotation de 10 vidéos premium)
  const infiniteVideos = [
    { id: "SKfHpHnr5WY", user: "Action Cinema", title: "Film de combat 2026" },
    { id: "gcpq4wDm9gM", user: "Afro-Beats", title: "Hit de l'été" },
    { id: "dqt14eKqtac", user: "Funny Boss", title: "Compilation Humour" },
    { id: "RCgjYlZ34jw", user: "Naza Officiel", title: "Nouveau Single" },
    { id: "9bZkp7q19f0", user: "K-Drama", title: "Série Romance" },
    { id: "5PSVnS_y70Y", user: "Cuisine Pro", title: "Recette Rapide" },
    { id: "L_u97PqWX6g", user: "Sport Direct", title: "Match Highlights" },
    { id: "V-_O7nl0Ii0", user: "Urban Dance", title: "Chorégraphie 2026" },
    { id: "YykjpeuRE8E", user: "Tech News", title: "Nouveau iPhone" },
    { id: "kJQP7kiw5Fk", user: "Despacito Remix", title: "Classic Vibes" }
  ];

  const handleFileSelect = () => fileInputRef.current?.click();

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* BARRE DE RETOUR / HEADER */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 bg-zinc-800 rounded-full">
              <ChevronLeft size={24} className="text-yellow-500" />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <Volume2 
            size={24} 
            className={isMuted ? "text-red-500" : "text-green-500"} 
            onClick={() => setIsMuted(!isMuted)} 
          />
          <MessageCircle size={24} onClick={() => setActiveTab("chat")} className={activeTab === "chat" ? "text-yellow-500" : ""} />
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* --- ACCUEIL (Style Facebook / Social) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in pb-24">
            {/* STORIES */}
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
              <div onClick={handleFileSelect} className="min-w-[100px] h-40 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center">
                <Camera size={24} className="text-yellow-500" />
                <span className="text-[8px] font-bold mt-2">PUBLIER</span>
              </div>
              {infiniteVideos.map((v, i) => (
                <div key={i} className="min-w-[100px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden">
                  <img src={`https://picsum.photos/200/400?sig=${i}`} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full border border-yellow-500 bg-black" />
                </div>
              ))}
            </div>

            {/* FEED INFINI */}
            {infiniteVideos.map((vid, idx) => (
              <div key={idx} className="mb-8 bg-zinc-950 border-y border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black">G</div>
                  <p className="text-xs font-black uppercase">{vid.user} ✓</p>
                </div>
                <div className="aspect-video w-full bg-zinc-900 relative">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${vid.id}?autoplay=0&mute=${isMuted ? 1 : 0}`} 
                    allowFullScreen 
                  />
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart size={24} className="hover:text-red-500" />
                  <MessageCircle size={24} onClick={() => setActiveTab("chat")} />
                  <Share2 size={24} className="ml-auto" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- TIKTOK TV (Défilement Vertical Infini) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {infiniteVideos.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full object-cover" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${vid.id}&controls=0`} 
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-32 flex flex-col gap-8 z-20">
                  <Heart size={35} className="drop-shadow-lg text-white" />
                  <MessageCircle size={35} onClick={() => setActiveTab("chat")} className="text-white" />
                  <Share2 size={35} className="text-white" />
                </div>
                <div className="absolute left-4 bottom-20 z-20">
                  <p className="font-black text-sm uppercase">@{vid.user}</p>
                  <p className="text-xs opacity-90">{vid.title}</p>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* --- MESSAGERIE (Style Messenger) --- */}
        {activeTab === "chat" && (
          <section className="h-full flex flex-col p-4 bg-zinc-950">
             <div className="flex-1 overflow-y-auto space-y-4 mb-4">
               <div className="bg-zinc-900 p-4 rounded-2xl max-w-[80%] border border-zinc-800">
                 <p className="text-sm">Bienvenue Joseph. Écrivez votre message ici...</p>
               </div>
             </div>
             <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl">
               <input placeholder="Message..." className="flex-1 bg-transparent px-4 outline-none text-sm" />
               <button className="bg-yellow-500 p-3 rounded-xl text-black"><Send size={18} /></button>
             </div>
          </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION (Correction des accès) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home 
          className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("video")} 
        />
        <div onClick={() => setActiveTab("home")} className="w-14 h-9 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
          <Plus size={22} className="text-white" />
        </div>
        <Users 
          className={activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-600"} 
          onClick={() => setActiveTab("home")} 
        />
        <div className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden" onClick={() => setActiveTab("home")}>
          <img src="/icon-512.png" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}