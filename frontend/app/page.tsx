"use client";
import { useState, useRef, useEffect } from "react";
// Importation sécurisée de toutes les icônes nécessaires
import { 
  Home, Tv, MessageCircle, Heart, Search, 
  Share2, Send, Play, ShieldCheck, Plus, Radio, Camera, Film, Music, Users, ChevronLeft
} from "lucide-react";

export default function GuisogaUltimateEmpire() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Empêcher les erreurs d'hydratation en attendant le montage côté client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // FLUX VIDÉOS VARIÉS (Action, Musique, Humour) - Remplacement de Zee Magic
  const feedVideos = [
    { id: "SKfHpHnr5WY", user: "Ciné Action", title: "Film Action Complet 2026", type: "Film" },
    { id: "gcpq4wDm9gM", user: "AfroBeats Premium", title: "Nouveau Hit 2026", type: "Music" },
    { id: "dqt14eKqtac", user: "L'Empire du Rire", title: "Meilleures Blagues 2026", type: "Funny" },
    { id: "RCgjYlZ34jw", user: "Urban Music", title: "Naza - Dernier Clip", type: "Music" }
  ];

  const handleFileSelect = () => fileInputRef.current?.click();

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      {/* Sélecteur de fichiers pour Stories et Publications */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,video/*" 
        onChange={() => alert("Fichier sélectionné pour publication !")}
      />

      {/* HEADER */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        <div className="flex gap-5 items-center">
          <Search size={22} className="text-zinc-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => setActiveTab("chat")}>
            <MessageCircle size={22} className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-400"} />
            <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* --- ACCUEIL (Facebook Style) --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in pb-20">
            {/* STORIES */}
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide bg-black">
              <div 
                onClick={handleFileSelect}
                className="min-w-[110px] h-44 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-all"
              >
                <Camera size={28} className="text-yellow-500 mb-2" />
                <span className="text-[9px] font-black uppercase">Ajouter Story</span>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[110px] h-44 bg-zinc-800 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-2 border-yellow-500 overflow-hidden z-10">
                    <img src={`https://i.pravatar.cc/100?u=${i+5}`} alt="user" className="object-cover" />
                  </div>
                  <img src={`https://picsum.photos/200/400?random=${i}`} alt="story" className="w-full h-full object-cover opacity-70" />
                </div>
              ))}
            </div>

            {/* ZONE DE PUBLICATION */}
            <div className="m-4 p-4 bg-zinc-900 rounded-2xl flex items-center gap-4 cursor-pointer" onClick={handleFileSelect}>
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-sm">JG</div>
              <p className="text-zinc-500 text-sm">Quoi de neuf aujourd'hui ?</p>
              <Plus className="ml-auto text-yellow-500" size={24} />
            </div>

            {/* ABONNEMENT */}
            <div className="mx-4 mb-6">
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  isSubscribed ? "bg-zinc-800 text-gray-500" : "bg-yellow-500 text-black"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER À L'EMPIRE"}
              </button>
            </div>

            {/* FEED DE PUBLICATIONS */}
            {feedVideos.slice(0, 2).map((vid, idx) => (
              <div key={idx} className="mb-6 bg-zinc-950 border-y border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-yellow-500/30">
                    {vid.type === "Film" ? <Film size={18} /> : <Music size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase">{vid.user}</p>
                    <p className="text-[9px] text-zinc-500">Publication récente</p>
                  </div>
                </div>
                <div className="aspect-video w-full bg-zinc-900">
                   <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid.id}?controls=1`} allowFullScreen />
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart size={24} className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle size={24} className="cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 size={24} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- TIKTOK TV (Défilement Vertical) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {feedVideos.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full object-cover" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&controls=0&loop=1&playlist=${vid.id}&modestbranding=1`} 
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-28 flex flex-col gap-6 items-center">
                  <Heart size={35} className="drop-shadow-lg" />
                  <MessageCircle size={35} className="drop-shadow-lg" onClick={() => setActiveTab("chat")} />
                  <Share2 size={35} className="drop-shadow-lg" />
                </div>
                <div className="absolute left-4 bottom-16">
                  <p className="font-black text-sm uppercase">@{vid.user}</p>
                  <p className="text-xs mt-1 opacity-80">{vid.title}</p>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* --- LIVES --- */}
        {activeTab === "live" && (
          <section className="h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 animate-in zoom-in">
            <div onClick={handleFileSelect} className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse cursor-pointer">
              <Radio size={45} />
            </div>
            <h2 className="text-2xl font-black italic uppercase">Studio Direct</h2>
            <p className="text-zinc-500 text-[10px] mt-2 mb-8 uppercase tracking-widest">Partagez votre contenu en temps réel.</p>
            <button onClick={handleFileSelect} className="bg-white text-black font-black px-12 py-4 rounded-full text-xs uppercase tracking-widest active:scale-95 transition-all">
              Démarrer le Direct
            </button>
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE CORRIGÉE */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        
        {/* Bouton Central Publication/Live */}
        <div onClick={() => setActiveTab("live")} className="w-14 h-9 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
          <Plus size={22} className="text-white" />
        </div>

        {/* Correction de l'erreur "Users is not defined" */}
        <Users className={activeTab === "users" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        
        <div onClick={() => setActiveTab("home")} className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden">
          <img src="/icon-512.png" className="w-full h-full object-cover" alt="Me" />
        </div>
      </nav>
    </main>
  );
}