"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Play, ShieldCheck, Plus 
} from "lucide-react";

export default function GuisogaEmpireElite() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue dans l'élite.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  const channels = [
    { id: "jfKfPfyJRdk", name: "Flux Direct 1", desc: "Live 24/7" },
    { id: "5_X_GZp8aLw", name: "Flux Direct 2", desc: "Premium" }
  ];
  const [currentVid, setCurrentVid] = useState(channels[0].id);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), sender: "Moi", text: inputValue, isMe: true }]);
      setInputValue("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black/95 border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 hover:bg-zinc-800 rounded-full transition-all">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter italic cursor-pointer" onClick={() => setActiveTab("home")}>
            GUISOGA
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Search className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right duration-500">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-2 border-2 border-black cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
             <p className="text-[10px] font-black uppercase">Nouveau message</p>
             <X size={14} onClick={(e) => { e.stopPropagation(); setShowBubble(false); }} />
          </div>
        </div>
      )}

      {/* CONTENU */}
      <div className="w-full">
        
        {/* --- ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in">
            
            {/* BARRE DES STORIES */}
            <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide border-b border-zinc-900 bg-zinc-950/50">
              <div className="flex flex-col items-center gap-1 min-w-[70px]">
                <div className="w-16 h-16 rounded-full border-2 border-zinc-700 flex items-center justify-center relative bg-zinc-900">
                  <Plus size={24} className="text-zinc-500" />
                  <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1 border-2 border-black">
                    <Plus size={10} className="text-black font-bold" />
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">Votre story</span>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
                  <div className="w-16 h-16 rounded-full border-2 border-yellow-500 p-1">
                    <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Membre {i}</span>
                </div>
              ))}
            </div>

            {/* SECTION ABONNEMENT SIMPLIFIÉE */}
            <div className="bg-zinc-900/60 m-4 p-6 rounded-[2.5rem] border border-yellow-500/20 text-center">
              <ShieldCheck className="text-yellow-500 mx-auto mb-4" size={28} />
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full font-black py-4 rounded-2xl uppercase text-xs tracking-[0.2em] transition-all active:scale-95 ${
                  isSubscribed ? "bg-zinc-800 text-gray-500 border border-zinc-700" : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
            </div>

            {/* FIL D'ACTUALITÉ */}
            {[1, 2].map((i) => (
              <div key={i} className="mb-8 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full border border-yellow-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">JG</div>
                  </div>
                  <p className="font-black text-xs uppercase tracking-tighter">GUISOGA Officiel</p>
                </div>
                <div className="aspect-video bg-zinc-900 flex items-center justify-center cursor-pointer group" onClick={() => setActiveTab("video")}>
                  <Play size={40} className="text-yellow-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart size={22} className="cursor-pointer hover:text-red-500" />
                  <MessageCircle size={22} className="cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 size={22} className="ml-auto" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- TV (VIDÉOS) --- */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in">
            <div className="relative aspect-video w-full bg-black">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${currentVid}?autoplay=1&mute=0&controls=1`} allowFullScreen></iframe>
            </div>
            <div className="p-4 space-y-3">
              {channels.map((ch) => (
                <div key={ch.id} onClick={() => setCurrentVid(ch.id)} className={`p-4 rounded-2xl flex items-center gap-4 ${currentVid === ch.id ? "bg-yellow-500 text-black" : "bg-zinc-900 text-white"}`}>
                  <Play size={18} fill={currentVid === ch.id ? "black" : "none"} />
                  <p className="font-black text-xs uppercase">{ch.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- MESSAGERIE --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[78vh] p-4 animate-in slide-in-from-right">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-[1.8rem] max-w-[85%] ${m.isMe ? "bg-yellow-500 text-black rounded-tr-none font-bold" : "bg-zinc-900 text-white rounded-tl-none border border-white/5"}`}>
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-[2rem]">
              <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Message..." className="flex-1 bg-transparent px-5 outline-none text-sm" />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-4 rounded-[1.5rem] text-black"><Send size={20} /></button>
            </div>
          </section>
        )}

        {/* --- RENCONTRES --- */}
        {activeTab === "dating" && (
          <section className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-left">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2.5rem] relative overflow-hidden group border border-white/5 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="font-black text-[10px] uppercase">Membre Global {i}</p>
                  <span className="text-[8px] text-green-500 font-bold uppercase block mt-1">● En Ligne</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE */}
      <nav className="fixed bottom-0 w-full bg-black/95 border-t border-zinc-900 px-10 py-5 flex justify-between items-center z-[200]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("video")} />
        <Users className={activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("dating")} />
        <div onClick={() => setActiveTab("home")} className={`w-9 h-9 rounded-full border-2 ${activeTab === "home" ? "border-yellow-500" : "border-zinc-800"}`}>
           <img src="/icon-512.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}