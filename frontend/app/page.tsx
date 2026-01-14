"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  Users, ChevronLeft, Volume2, VolumeX, MessageSquare, ShieldCheck, 
  Globe, Star, CheckCircle, Zap, Menu
} from "lucide-react";

export default function GuisogaRevolution() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentInput, setCommentInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pour le Smart Focus (arrêter la vidéo précédente)
  const [playingId, setPlayingId] = useState<string | null>(null);

  const feed = [
    { id: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Film Action Exclusif", reputation: 950 },
    { id: "gcpq4wDm9gM", user: "Music Empire", title: "Global Hit 2026", reputation: 1200 },
    { id: "RCgjYlZ34jw", user: "Joseph Pro", title: "Presentation de l'Empire", reputation: 5000 },
    { id: "dqt14eKqtac", user: "Comedy Gold", title: "Top Humour", reputation: 800 }
  ];

  useEffect(() => {
    // Supprime le message de bienvenue après 5 secondes
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* MESSAGE DE BIENVENUE RÉVOLUTIONNAIRE */}
      {showWelcome && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-[4000ms]">
          <div className="relative">
            <div className="w-32 h-32 bg-yellow-500 rounded-full animate-ping absolute opacity-20"></div>
            <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center relative shadow-[0_0_60px_rgba(234,179,8,0.5)]">
              <span className="text-4xl font-black text-black italic">G</span>
            </div>
          </div>
          <h2 className="mt-10 text-3xl font-black text-white italic tracking-tighter uppercase">Bienvenue</h2>
          <h1 className="text-xl font-bold text-yellow-500 mt-2">JOSEPH GUILAVOGUI</h1>
          <p className="mt-4 text-zinc-500 text-[10px] uppercase tracking-[0.5em] animate-pulse">Initialisation de votre Empire Social...</p>
        </div>
      )}

      {/* HEADER AVEC SMART-NAV */}
      <nav className="p-4 flex justify-between items-center bg-black border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => { setPlayingId(null); setActiveTab("home"); }} className="p-2 text-yellow-500">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        <div className="flex gap-4 items-center">
           <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
              {isMuted ? <VolumeX size={20} className="text-red-500" /> : <Volume2 size={20} className="text-green-500" />}
           </button>
           <Zap size={24} className="text-yellow-500 animate-pulse" />
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory">
        
        {/* --- FEED NATIVE (Smart Focus) --- */}
        {activeTab === "home" && feed.map((post) => (
          <section key={post.id} className="h-full w-full snap-start bg-black flex flex-col border-b border-zinc-900">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-yellow-500 p-0.5">
                  <img src={`https://i.pravatar.cc/100?u=${post.id}`} className="rounded-full" alt="user" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black uppercase tracking-widest">{post.user}</span>
                    <CheckCircle size={12} className="text-blue-500" fill="currentColor" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-yellow-500">
                    <Zap size={10} fill="currentColor" />
                    <span>{post.reputation} G-Reputation</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-black text-[10px] font-black px-4 py-2 rounded-full uppercase">S'abonner</button>
            </div>

            {/* LECTEUR INDÉPENDANT (S'arrête si on change) */}
            <div className="flex-1 bg-zinc-950 relative group">
              <iframe 
                className="w-full h-full" 
                src={`https://www.youtube.com/embed/${post.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                allow="autoplay; encrypted-media"
                onLoad={() => setPlayingId(post.id)}
              />
              {/* Le "Shadow Overlay" : Empêche les clics vers YouTube et les publicités */}
              <div className="absolute inset-0 bg-transparent" />
            </div>

            {/* INTERACTIONS ET COMMENTAIRES NATIVES */}
            <div className="p-4 bg-black">
              <div className="flex gap-8 mb-4">
                <Heart 
                  size={30} 
                  onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))} 
                  className={likes[post.id] ? "text-red-600 fill-red-600 animate-bounce" : "text-white"}
                />
                <MessageSquare size={30} />
                <Share2 size={30} className="ml-auto" />
              </div>
              
              <div className="space-y-2 mb-4 max-h-20 overflow-y-auto">
                {(comments[post.id] || []).map((c, i) => (
                  <p key={i} className="text-[11px] text-zinc-400 bg-zinc-900/50 p-2 rounded-lg">
                    <span className="text-yellow-500 font-bold uppercase mr-2">Empire:</span> {c}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 bg-zinc-900 rounded-2xl p-2 border border-zinc-800">
                <input 
                  className="flex-1 bg-transparent px-4 text-xs outline-none"
                  placeholder="Écrire un message à l'Empire..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button onClick={() => {
                  if(commentInput) {
                    setComments(p => ({...p, [post.id]: [...(p[post.id] || []), commentInput]}));
                    setCommentInput("");
                  }
                }} className="bg-yellow-500 text-black p-2 rounded-xl"><Send size={18} /></button>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* BARRE DE NAVIGATION RÉVOLUTIONNAIRE */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Globe className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-16 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)] active:scale-90 transition-all">
          <Plus size={28} className="text-black" />
        </div>
        <MessageCircle className={activeTab === "chat" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("chat")} />
        <div className="w-10 h-10 rounded-full border-2 border-yellow-500 p-0.5 overflow-hidden shadow-lg">
          <img src="/icon-512.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}