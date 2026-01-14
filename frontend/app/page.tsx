"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, CheckCircle, X
} from "lucide-react";

export default function GuisogaEliteConnect() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [showWelcome, setShowWelcome] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const feed = [
    { id: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Film Action 2026", likes: "10K" },
    { id: "gcpq4wDm9gM", user: "Afro Beats", title: "Hit Music", likes: "25K" },
    { id: "RCgjYlZ34jw", user: "Joseph Pro", title: "Vision 2026", likes: "1M" }
  ];

  const matches = [
    { id: 1, name: "Sarah", age: 24, country: "France", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Moussa", age: 28, country: "Guinée", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Elena", age: 22, country: "Espagne", img: "https://i.pravatar.cc/150?u=3" }
  ];

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* --- MESSAGE DE BIENVENUE DISCRET --- */}
      {showWelcome && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex justify-between items-center animate-in slide-in-from-top">
          <p className="text-[10px] font-black uppercase tracking-tighter">
            Bienvenue sur l'Empire de <span className="underline">Joseph Guilavogui</span>
          </p>
          <X size={16} onClick={() => setShowWelcome(false)} className="cursor-pointer" />
        </div>
      )}

      {/* --- HEADER --- */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900">
        <h1 className="text-xl font-black text-yellow-500 italic">GUISOGA</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg">
            {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-green-500" />}
          </button>
          <Search size={22} className="text-zinc-400" />
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        
        {/* ACCUEIL : VIDEOS ET LIKES */}
        {activeTab === "home" && (
          <section className="pb-24">
            {feed.map((post) => (
              <div key={post.id} className="mb-6 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-[10px]">G</div>
                  <span className="text-xs font-bold uppercase">{post.user}</span>
                </div>

                <div className="aspect-video w-full bg-zinc-900">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${post.id}?autoplay=0&mute=${isMuted ? 1 : 0}&controls=1`}
                    allowFullScreen
                  />
                </div>

                <div className="p-4">
                  <div className="flex gap-6 mb-4">
                    <Heart 
                      size={28} 
                      onClick={() => setLikes(p => ({...p, [post.id]: !p[post.id]}))} 
                      className={likes[post.id] ? "text-red-600 fill-red-600" : "text-white"} 
                    />
                    <MessageSquare size={28} onClick={() => setActiveTab("chat")} />
                    <Share2 size={28} className="ml-auto" />
                  </div>
                  
                  {/* COMMENTAIRES */}
                  <div className="flex gap-2 mb-4">
                    <input 
                      className="flex-1 bg-zinc-900 rounded-lg px-3 py-2 text-xs outline-none border border-zinc-800 focus:border-yellow-500"
                      placeholder="Votre avis..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={() => {
                      if(commentInput) {
                        setComments(p => ({...p, [post.id]: [...(p[post.id] || []), commentInput]}));
                        setCommentInput("");
                      }
                    }} className="text-yellow-500 font-bold text-xs uppercase">Post</button>
                  </div>
                  <div className="space-y-1">
                    {(comments[post.id] || []).map((c, i) => (
                      <p key={i} className="text-[10px] text-zinc-400 bg-zinc-900/50 p-2 rounded"><b>Moi:</b> {c}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* MATCHS : RENCONTRES ET MESSAGES FACILES */}
        {activeTab === "match" && (
          <section className="p-4 pb-24 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom">
            {matches.map((m) => (
              <div key={m.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-lg">
                <img src={m.img} className="w-full h-40 object-cover" />
                <div className="p-3 text-center">
                  <h3 className="font-black text-sm">{m.name}, {m.age}</h3>
                  <p className="text-[10px] text-zinc-500 mb-3">{m.country}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-zinc-800 p-2 rounded-xl text-red-500"><Heart size={16} fill="currentColor" /></button>
                    <button 
                      onClick={() => setActiveTab("chat")}
                      className="flex-1 bg-yellow-500 text-black p-2 rounded-xl"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* CHAT : MESSAGERIE */}
        {activeTab === "chat" && (
          <section className="h-full flex flex-col p-4 bg-black">
            <h2 className="text-sm font-black uppercase text-yellow-500 mb-4">Messagerie Empire</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
               <div className="bg-zinc-900 p-3 rounded-2xl max-w-[80%] text-xs">
                 Bonjour ! Comment vas-tu ? Prêt à échanger ?
               </div>
            </div>
            <div className="flex gap-2 mt-4 bg-zinc-900 p-2 rounded-2xl">
               <input placeholder="Ecrire..." className="flex-1 bg-transparent px-2 text-sm outline-none" />
               <button className="bg-yellow-500 text-black p-2 rounded-xl"><Send size={18} /></button>
            </div>
          </section>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION --- */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center">
        <Home className={activeTab === "home" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("home")} />
        <div onClick={() => fileInputRef.current?.click()} className="w-12 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 cursor-pointer">
          <Plus size={24} className="text-black" />
        </div>
        <Globe className={activeTab === "match" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("match")} />
        <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-zinc-600"} onClick={() => setActiveTab("chat")} />
      </nav>
    </main>
  );
}