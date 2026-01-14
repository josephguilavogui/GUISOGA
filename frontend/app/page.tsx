"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, Search, 
  Share2, ChevronLeft, Send, X, Play, ShieldCheck, Plus, Camera 
} from "lucide-react";

export default function GuisogaEmpireElite() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, text: "Bienvenue dans l'élite.", isMe: false }]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vidéos Zee Magic et Flux Premium
  const channels = [
    { id: "p68mMDBQRyA", name: "ZEE MAGIC", desc: "Séries Bollywood" },
    { id: "4YzrzUc8TAA", name: "ZEE MAGIC 2", desc: "Guddan & Plus" },
    { id: "jfKfPfyJRdk", name: "LOFI MUSIC", desc: "Détente 24/7" }
  ];
  const [currentVid, setCurrentVid] = useState(channels[0].id);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputValue, isMe: true }]);
      setInputValue("");
    }
  };

  // Fonction pour déclencher l'ajout de story
  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden">
      {/* Input caché pour les stories */}
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={() => alert("Story chargée avec succès !")} />

      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black/95 border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1"><ChevronLeft className="text-yellow-500" size={28} /></button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 italic">GUISOGA</h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-gray-400" />
          <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} onClick={() => setActiveTab("chat")} />
        </div>
      </nav>

      <div className="w-full">
        {/* --- ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in">
            {/* STORIES INTERACTIVES */}
            <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide border-b border-zinc-900">
              <div className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer" onClick={triggerFileSelect}>
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center bg-zinc-900">
                  <Camera size={24} className="text-zinc-500" />
                </div>
                <span className="text-[8px] text-gray-500 font-bold">AJOUTER</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
                  <div className="w-16 h-16 rounded-full border-2 border-yellow-500 p-1">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="text-[8px] text-gray-400 font-medium">MEMBRE {i}</span>
                </div>
              ))}
            </div>

            {/* ABONNEMENT */}
            <div className="bg-zinc-900/60 m-4 p-6 rounded-[2.5rem] border border-yellow-500/20 text-center">
              <ShieldCheck className="text-yellow-500 mx-auto mb-4" size={28} />
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full font-black py-4 rounded-2xl uppercase text-xs tracking-[0.2em] transition-all ${
                  isSubscribed ? "bg-zinc-800 text-gray-500" : "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
            </div>

            {/* POSTS */}
            <div className="p-4 border-b border-zinc-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">G</div>
                <p className="font-black text-xs uppercase">Zee Magic News</p>
              </div>
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative cursor-pointer" onClick={() => setActiveTab("video")}>
                <iframe className="w-full h-full pointer-events-none" src={`https://www.youtube.com/embed/${channels[0].id}?controls=0&mute=1`} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play className="text-white" size={40} /></div>
              </div>
            </div>
          </section>
        )}

        {/* --- TV (ZEE MAGIC & CO) --- */}
        {activeTab === "video" && (
          <section className="animate-in zoom-in">
            <div className="relative aspect-video w-full bg-black">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${currentVid}?autoplay=1`} allowFullScreen></iframe>
            </div>
            <div className="p-4 grid grid-cols-1 gap-2">
              {channels.map((ch) => (
                <div key={ch.id} onClick={() => setCurrentVid(ch.id)} className={`p-4 rounded-2xl flex items-center gap-4 ${currentVid === ch.id ? "bg-yellow-500 text-black font-bold" : "bg-zinc-900"}`}>
                  <Play size={18} fill={currentVid === ch.id ? "black" : "none"} />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase">{ch.name}</p>
                    <p className="text-[8px] opacity-60 italic">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- CHAT --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[78vh] p-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-[1.8rem] max-w-[85%] ${m.isMe ? "bg-yellow-500 text-black font-bold" : "bg-zinc-900 text-white"}`}>
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
      </div>

      {/* NAVIGATION BASSE */}
      <nav className="fixed bottom-0 w-full bg-black/95 border-t border-zinc-900 px-10 py-5 flex justify-between items-center z-[200]">
        <Home className={activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("home")} />
        <Tv className={activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("video")} />
        <Users className={activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-700"} onClick={() => setActiveTab("dating")} />
        <div className="w-9 h-9 rounded-full border-2 border-zinc-800 overflow-hidden"><img src="/icon-512.png" className="w-full h-full object-cover" /></div>
      </nav>
    </main>
  );
}