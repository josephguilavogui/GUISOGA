"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Play, ShieldCheck
} from "lucide-react";

export default function GuisogaEmpireFinal() {
  const [activeTab, setActiveTab] = useState("home");
  // On fixe le nombre d'abonnés pour qu'il ne bouge plus inutilement
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue. Tout est opérationnel.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Vidéos Directes (YouTube Live)
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
    <main className="min-h-screen bg-black text-white font-sans pb-24">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black/90 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Search className="text-gray-400" />
          <div className="relative cursor-pointer" onClick={() => setActiveTab("chat")}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-2 border-2 border-black" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
             <p className="text-[10px] font-black uppercase">Message de Joseph</p>
             <X size={14} />
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      <div className="w-full">
        
        {/* ACCUEIL (Style Facebook/TikTok) */}
        {activeTab === "home" && (
          <section className="animate-in fade-in">
            <div className="bg-zinc-900/50 m-4 p-6 rounded-[2rem] border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-yellow-500" size={16} />
                <p className="text-yellow-500 font-black text-[10px] uppercase">JOSEPH GUILAVOGUI</p>
              </div>
              <h2 className="text-xl font-black mb-4 uppercase italic">Système d'analyse privé</h2>
              
              {/* BOUTON S'ABONNER FIXE (Comme vous l'aviez demandé) */}
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full font-black py-4 rounded-2xl uppercase text-xs tracking-widest transition-all ${
                  isSubscribed ? "bg-zinc-800 text-gray-500" : "bg-yellow-500 text-black"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
            </div>

            {/* FIL D'ACTUALITÉ */}
            {[1, 2].map((i) => (
              <div key={i} className="mb-8 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">G</div>
                  <p className="font-black text-xs uppercase tracking-tighter">GUISOGA Officiel</p>
                </div>
                <div className="aspect-video bg-zinc-900 flex items-center justify-center cursor-pointer" onClick={() => setActiveTab("video")}>
                  <Play size={40} className="text-yellow-500 opacity-50" />
                </div>
                <div className="flex gap-8 p-4">
                  <Heart size={22} />
                  <MessageCircle size={22} onClick={() => setActiveTab("chat")} />
                  <Share2 size={22} className="ml-auto" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SECTION TV (Flux Vidéo Direct) */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in">
            <div className="relative aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVid}?autoplay=1&mute=0&controls=1`} 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 space-y-2">
              {channels.map((ch) => (
                <div key={ch.id} onClick={() => setCurrentVid(ch.id)} className={`p-4 rounded-2xl flex items-center gap-4 ${currentVid === ch.id ? "bg-yellow-500 text-black" : "bg-zinc-900"}`}>
                  <Play size={18} fill={currentVid === ch.id ? "black" : "none"} />
                  <p className="font-black text-xs uppercase">{ch.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MESSAGERIE */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[75vh] p-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-2xl max-w-[80%] ${m.isMe ? "bg-yellow-500 text-black" : "bg-zinc-900 text-white"}`}>
                    <p className="text-sm font-bold">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl">
              <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Message..." className="flex-1 bg-transparent px-4 outline-none" />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-3 rounded-xl text-black"><Send size={18} /></button>
            </div>
          </section>
        )}

        {/* RENCONTRES (Correction de l'erreur Hydration) */}
        {activeTab === "dating" && (
          <section className="p-4 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2rem] relative overflow-hidden border border-white/5">
                <div className="absolute bottom-4 left-4">
                  <p className="font-black text-[10px] uppercase">Membre {i}</p>
                  {/* Correction de l'erreur : Pas de <div> dans un <p> */}
                  <span className="text-[8px] text-green-500 font-bold uppercase block">● En Ligne</span>
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
        <div onClick={() => setActiveTab("home")} className="w-8 h-8 rounded-full border border-yellow-500 overflow-hidden">
           <img src="/icon-512.png" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </nav>
    </main>
  );
}