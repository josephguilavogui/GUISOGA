"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  Users, ChevronLeft, Volume2, VolumeX, MessageSquare, ShieldCheck, 
  Globe, Star, CheckCircle, Play
} from "lucide-react";

export default function GuisogaFix() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentInput, setCommentInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Liste de vidéos variées (Films, Musique, Humour)
  const feed = [
    { id: "SKfHpHnr5WY", user: "Guisoga Cinéma", title: "Film Action Complet 2026", likes: "125K" },
    { id: "gcpq4wDm9gM", user: "Afro Beats", title: "Mix Dancehall 2026", likes: "45K" },
    { id: "RCgjYlZ34jw", user: "Naza Officiel", title: "Nouveau Clip", likes: "210K" },
    { id: "dqt14eKqtac", user: "Empire Humour", title: "Les meilleurs gags", likes: "8K" }
  ];

  // Fonction pour débloquer l'audio et la vidéo sur tout le site
  const enableExperience = () => {
    setIsMuted(false);
    setHasInteracted(true);
  };

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* OVERLAY DE DÉMARRAGE (Pour débloquer les vidéos et le son) */}
      {!hasInteracted && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_50px_rgba(234,179,8,0.4)]">
            <Play fill="black" size={40} className="ml-1" />
          </div>
          <h2 className="text-2xl font-black mb-2 italic uppercase">Bienvenue sur Guisoga</h2>
          <p className="text-zinc-400 text-sm mb-8 uppercase tracking-widest">Cliquez pour activer les vidéos et le son</p>
          <button 
            onClick={enableExperience}
            className="bg-white text-black font-black px-12 py-4 rounded-full uppercase text-xs tracking-[0.2em] hover:bg-yellow-500 transition-all"
          >
            Entrer dans l'Empire
          </button>
        </div>
      )}

      {/* HEADER NATIVE */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-2 bg-zinc-900 rounded-full text-yellow-500">
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-black text-yellow-500 tracking-tighter italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              {isMuted ? <VolumeX size={20} className="text-red-500" /> : <Volume2 size={20} className="text-green-500" />}
           </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto bg-black scroll-smooth">
        
        {/* --- ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="pb-24">
            {feed.map((post) => (
              <div key={post.id} className="mb-6 bg-zinc-950/50 border-b border-zinc-900">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-yellow-500 text-black font-black flex items-center justify-center text-[10px]">G</div>
                    <span className="text-xs font-black uppercase tracking-widest">{post.user} <CheckCircle size={10} className="inline text-blue-500 ml-1" fill="currentColor"/></span>
                  </div>
                  <button className="text-[10px] font-black border border-zinc-700 px-3 py-1 rounded-full uppercase">Suivre</button>
                </div>

                {/* LECTEUR VIDÉO SÉCURISÉ */}
                <div className="aspect-video w-full bg-zinc-900 relative group">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${post.id}?autoplay=${hasInteracted ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                  {/* Overlay invisible pour capturer les interactions si besoin */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none" />
                </div>

                {/* INTERACTIONS */}
                <div className="p-4">
                  <div className="flex gap-6 mb-4">
                    <Heart 
                      size={28} 
                      onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))} 
                      className={likes[post.id] ? "text-red-600 fill-red-600" : "text-white"}
                    />
                    <MessageSquare size={28} onClick={() => setActiveTab(`comment-${post.id}`)} />
                    <Share2 size={28} className="ml-auto" />
                  </div>
                  <p className="text-xs font-black uppercase mb-1">{post.likes} J'aime</p>
                  <p className="text-xs opacity-80"><span className="font-bold mr-2">{post.user}</span>{post.title}</p>
                  
                  {/* COMMENTAIRES NATIVES */}
                  <div className="mt-4 flex gap-2">
                    <input 
                      className="flex-1 bg-zinc-900 text-[11px] px-4 py-2 rounded-xl border border-zinc-800 outline-none focus:border-yellow-500"
                      placeholder="Ajouter un commentaire..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={() => {
                      if(commentInput) {
                        setComments(p => ({...p, [post.id]: [...(p[post.id] || []), commentInput]}));
                        setCommentInput("");
                      }
                    }}><Send size={18} className="text-yellow-500" /></button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {(comments[post.id] || []).map((c, i) => (
                      <p key={i} className="text-[10px] bg-zinc-900 p-2 rounded-lg"><span className="text-yellow-500 font-bold">Moi:</span> {c}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- TIKTOK TV (Défilement Vertical) --- */}
        {activeTab === "video" && (
          <div className="h-[calc(100vh-140px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
            {feed.map((vid, idx) => (
              <section key={idx} className="h-full w-full snap-start relative">
                <iframe 
                  className="w-full h-full object-cover" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${vid.id}`} 
                  allow="autoplay"
                />
                <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-20">
                  <div className="bg-black/40 p-3 rounded-full backdrop-blur-md border border-white/10"><Heart size={30} /></div>
                  <div className="bg-black/40 p-3 rounded-full backdrop-blur-md border border-white/10"><MessageCircle size={30} /></div>
                  <div className="bg-black/40 p-3 rounded-full backdrop-blur-md border border-white/10"><Share2 size={30} /></div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* NAVIGATION BASSE */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("video")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 active:scale-95 transition-all">
          <Plus size={24} className="text-black" />
        </div>
        <Globe className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        <div className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden" onClick={() => setActiveTab("home")}>
          <img src="/icon-512.png" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}