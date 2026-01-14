"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Heart, Search, Share2, Send, Plus, 
  ChevronLeft, Volume2, VolumeX, MessageSquare, Globe, User, CheckCircle
} from "lucide-react";

export default function GuisogaMaster() {
  const [activeTab, setActiveTab] = useState("home"); // home, video, chat, match
  const [isMuted, setIsMuted] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Liste des vidéos (Films, Musique, Fun)
  const content = [
    { id: "SKfHpHnr5WY", user: "Guisoga Cinema", title: "Action Movie 2026", likes: "10K" },
    { id: "gcpq4wDm9gM", user: "Afro Beats", title: "New Hit Music", likes: "25K" },
    { id: "RCgjYlZ34jw", user: "Joseph Pro", title: "Empire Vision", likes: "1M" }
  ];

  return (
    <main className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" />

      {/* --- BARRE DU HAUT (Toujours visible) --- */}
      <nav className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900 shadow-xl">
        <div className="flex items-center gap-3">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-2 bg-zinc-900 rounded-full text-yellow-500">
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUISOGA</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
            {isMuted ? <VolumeX size={20} className="text-red-500" /> : <Volume2 size={20} className="text-green-500" />}
          </button>
          <Search size={24} className="text-zinc-400" />
        </div>
      </nav>

      {/* --- ZONE DE CONTENU PRINCIPAL --- */}
      <div className="flex-1 overflow-y-auto">
        
        {/* SECTION 1: ACCUEIL (Style Facebook/Instagram) */}
        {activeTab === "home" && (
          <section className="pb-24 animate-in fade-in">
            {/* Message de Bienvenue Joseph */}
            <div className="p-6 bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
              <h2 className="text-sm text-zinc-400 uppercase tracking-[0.2em]">Bienvenue dans ton Empire</h2>
              <h1 className="text-xl font-black text-white mt-1">JOSEPH GUILAVOGUI</h1>
            </div>

            {feedSection(content, isMuted, likes, setLikes, comments, commentInput, setCommentInput, setComments, setActiveTab)}
          </section>
        )}

        {/* SECTION 2: RÉEL / TIKTOK (Vidéos verticales uniquement) */}
        {activeTab === "video" && (
          <section className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
            {content.map((vid) => (
              <div key={vid.id} className="h-full w-full snap-start relative bg-black">
                <iframe 
                  className="w-full h-full pointer-events-none" 
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${vid.id}`}
                />
                <div className="absolute inset-0 bg-transparent" />
                <div className="absolute right-4 bottom-32 flex flex-col gap-8 z-30">
                  <Heart size={35} className={likes[vid.id] ? "text-red-500 fill-red-500" : "text-white"} onClick={() => setLikes(p => ({...p, [vid.id]: !p[vid.id]}))} />
                  <MessageCircle size={35} onClick={() => setActiveTab("chat")} />
                  <Share2 size={35} />
                </div>
                <div className="absolute left-4 bottom-20 z-30">
                  <p className="font-black text-sm uppercase">@{vid.user} ✓</p>
                  <p className="text-xs opacity-80">{vid.title}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SECTION 3: MESSAGES (Messagerie Privée) */}
        {activeTab === "chat" && (
          <section className="h-full flex flex-col p-4 bg-zinc-950 animate-in slide-in-from-right">
            <h2 className="text-lg font-black uppercase mb-6 border-b border-zinc-800 pb-2 text-yellow-500">Messages Privés</h2>
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 italic">
               <MessageCircle size={48} className="mb-4 opacity-20" />
               <p>Aucun nouveau message pour le moment.</p>
            </div>
            <div className="flex gap-2 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
               <input placeholder="Écrire à un membre..." className="flex-1 bg-transparent outline-none text-sm" />
               <button className="bg-yellow-500 text-black p-2 rounded-xl"><Send size={18} /></button>
            </div>
          </section>
        )}

        {/* SECTION 4: RENCONTRES (Elite Match) */}
        {activeTab === "match" && (
          <section className="p-4 h-full animate-in zoom-in">
            <h2 className="text-lg font-black uppercase mb-6 text-yellow-500">Elite Match</h2>
            <div className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 h-96 relative shadow-2xl">
               <img src="https://i.pravatar.cc/500?u=match" className="w-full h-full object-cover opacity-60" />
               <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-2xl font-black mb-4">Prêt pour des rencontres ?</h3>
                  <button className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-xs">Trouver des partenaires</button>
               </div>
            </div>
          </section>
        )}
      </div>

      {/* --- BARRE DE NAVIGATION DU BAS (Indispensable) --- */}
      <nav className="bg-black border-t border-zinc-900 px-8 py-5 flex justify-between items-center z-[100]">
        <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"}>
          <Home size={26} />
        </button>
        <button onClick={() => setActiveTab("video")} className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"}>
          <Tv size={26} />
        </button>
        <div onClick={() => fileInputRef.current?.click()} className="w-14 h-10 bg-white rounded-xl flex items-center justify-center border-b-4 border-yellow-500 active:scale-90 transition-all cursor-pointer">
          <Plus size={28} className="text-black" />
        </div>
        <button onClick={() => setActiveTab("match")} className={activeTab === "match" ? "text-yellow-500 scale-125" : "text-zinc-600"}>
          <Globe size={26} />
        </button>
        <button onClick={() => setActiveTab("chat")} className={activeTab === "chat" ? "text-yellow-500 scale-125" : "text-zinc-600"}>
          <MessageCircle size={26} />
        </button>
      </nav>
    </main>
  );
}

// Composant pour le flux de publications (évite les répétitions de code)
function feedSection(content: any[], isMuted: boolean, likes: any, setLikes: any, comments: any, commentInput: string, setCommentInput: any, setComments: any, setActiveTab: any) {
  return content.map((post) => (
    <div key={post.id} className="mb-8 border-b border-zinc-900 pb-4">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-xs">G</div>
        <span className="text-xs font-black uppercase tracking-widest">{post.user} <CheckCircle size={10} className="inline text-blue-500" fill="currentColor" /></span>
        <button className="ml-auto bg-zinc-800 text-[9px] px-3 py-1 rounded-full uppercase font-black">S'abonner</button>
      </div>

      <div className="aspect-video w-full bg-zinc-900 relative">
        <iframe className="w-full h-full pointer-events-none" src={`https://www.youtube.com/embed/${post.id}?mute=${isMuted ? 1 : 0}&controls=0`} />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      <div className="p-4">
        <div className="flex gap-8 mb-4">
          <Heart size={28} onClick={() => setLikes((p: any) => ({...p, [post.id]: !p[post.id]}))} className={likes[post.id] ? "text-red-600 fill-red-600" : "text-white"} />
          <MessageSquare size={28} onClick={() => setActiveTab("chat")} />
          <Share2 size={28} className="ml-auto" />
        </div>
        
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs outline-none"
            placeholder="Écrire un commentaire..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={() => {
            if(commentInput) {
              setComments((p: any) => ({...p, [post.id]: [...(p[post.id] || []), commentInput]}));
              setCommentInput("");
            }
          }} className="text-yellow-500 font-bold uppercase text-[10px]">Envoyer</button>
        </div>
        
        <div className="mt-3">
          {(comments[post.id] || []).map((c: string, i: number) => (
            <p key={i} className="text-[10px] text-zinc-400 mt-1 bg-zinc-900/40 p-2 rounded">
              <span className="text-yellow-500 font-bold uppercase mr-1">Joseph:</span> {c}
            </p>
          ))}
        </div>
      </div>
    </div>
  ));
}