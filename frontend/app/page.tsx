"use client";
import { useState, useRef, useEffect } from "react";
// Correction de l'erreur image_a81558 : Ajout de Users et Heart
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, CheckCircle, X, Users
} from "lucide-react";

export default function GuisogaEliteFinal() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [hasMounted, setHasMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Correction Hydratation (image_9cb8ca) : On attend que le client soit prêt
  useEffect(() => { setHasMounted(true); }, []);

  const feed = [
    { id: 1, videoId: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Action 2026" },
    { id: 2, videoId: "gcpq4wDm9gM", user: "Afro Beats", title: "Hit Music" }
  ];

  const matches = [
    { id: 101, name: "Sarah", age: 24, bio: "Passionnée de voyage", img: "https://i.pravatar.cc/150?u=sarah" },
    { id: 102, name: "Moussa", age: 28, bio: "Entrepreneur Tech", img: "https://i.pravatar.cc/150?u=moussa" }
  ];

  if (!hasMounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" />

      {/* BIENVENUE JOSEPH (image_aa4521) */}
      {showWelcome && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex justify-between items-center z-[110]">
          <p className="text-[10px] font-black uppercase italic">
            Bienvenue sur l'Empire de JOSEPH GUILAVOGUI
          </p>
          <X size={16} onClick={() => setShowWelcome(false)} className="cursor-pointer" />
        </div>
      )}

      {/* HEADER FIXE */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900">
        <h1 className="text-xl font-black text-yellow-500 italic">GUISOGA</h1>
        <div className="flex gap-4">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-500" />}
          </button>
          <Search size={22} className="text-zinc-400" />
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* FIL D'ACTUALITÉ */}
        {activeTab === "home" && (
          <div className="pb-24">
            {feed.map((post) => (
              <div key={post.id} className="mb-6 border-b border-zinc-900">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-[10px]">G</div>
                  <span className="text-xs font-bold uppercase">{post.user}</span>
                </div>
                {/* LECTEUR VIDÉO (image_a78294) */}
                <div className="aspect-video w-full bg-zinc-900">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${post.videoId}?autoplay=0&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1`}
                    title={post.title}
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex gap-6">
                  <Heart 
                    size={28} 
                    onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))}
                    className={likes[post.id] ? "text-red-500 fill-red-500" : "text-white"}
                  />
                  <MessageSquare size={28} onClick={() => setActiveTab("chat")} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MATCHS (Correction : Maintenant ils fonctionnent) */}
        {activeTab === "match" && (
          <div className="p-4 grid grid-cols-1 gap-6 pb-24">
            {matches.map((m) => (
              <div key={m.id} className="bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-800 flex flex-col items-center p-6 shadow-2xl">
                <img src={m.img} className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover mb-4" alt={m.name} />
                <h3 className="text-xl font-black">{m.name}, {m.age}</h3>
                <p className="text-zinc-500 text-sm italic mb-4">"{m.bio}"</p>
                <div className="flex gap-4 w-full">
                  <button className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold text-red-500 border border-zinc-700">Passer</button>
                  <button onClick={() => setActiveTab("chat")} className="flex-1 bg-yellow-500 py-3 rounded-xl font-bold text-black">Message</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <div className="h-full flex flex-col p-4">
            <h2 className="text-yellow-500 font-black mb-4 uppercase">Messagerie Directe</h2>
            <div className="flex-1 bg-zinc-900/30 rounded-3xl p-4 italic text-zinc-500 text-center flex items-center justify-center">
              Dites bonjour à votre nouveau match !
            </div>
            <div className="mt-4 flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
               <input placeholder="Ecrire un message..." className="flex-1 bg-transparent px-2 outline-none text-sm" />
               <button className="bg-yellow-500 text-black p-2 rounded-xl"><Send size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION BASSE (Correction ReferenceError Users) */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 active:scale-95 transition-all cursor-pointer">
          <Plus size={24} className="text-black" />
        </div>
        <Globe className={activeTab === "match" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        {/* Utilisation de MessageCircle au lieu de Users pour éviter l'erreur (image_a81558) */}
        <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("chat")} />
      </nav>
    </main>
  );
}