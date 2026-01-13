"use client";
import { useState, useEffect } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, X, Maximize2
} from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Joseph Guilavogui", text: "Bienvenue dans l'élite. L'avenir se construit ici.", isMe: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  // Simulation de réception de message (Bulle Messenger)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastMessage("Nouveau direct disponible sur GUISOGA TV !");
      setShowBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { id: Date.now(), sender: "Moi", text: inputValue, isMe: true };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button onClick={() => setActiveTab("home")} className="p-1 hover:bg-zinc-800 rounded-full transition-all">
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter cursor-pointer" onClick={() => setActiveTab("home")}>
            GUISOGA
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Search title="Recherche" className="text-gray-400 cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => {setActiveTab("chat"); setShowBubble(false)}}>
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400"} />
            {showBubble && <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full animate-ping"></span>}
          </div>
        </div>
      </nav>

      {/* BULLE MESSENGER FLOTTANTE */}
      {showBubble && (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right duration-500">
          <div className="bg-yellow-500 text-black p-3 rounded-2xl rounded-tr-none shadow-2xl flex items-center gap-3 max-w-[250px]">
            <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center">
              <img src="/icon-192.png" alt="JG" className="w-6 h-6 rounded-full" />
            </div>
            <div onClick={() => {setActiveTab("chat"); setShowBubble(false)}} className="cursor-pointer">
              <p className="text-[10px] font-black uppercase">Message Elite</p>
              <p className="text-[11px] leading-tight font-medium truncate">{lastMessage}</p>
            </div>
            <X size={14} className="cursor-pointer" onClick={() => setShowBubble(false)} />
          </div>
        </div>
      )}

      {/* CONTENU DYNAMIQUE */}
      <div className="w-full">
        
        {/* --- ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-yellow-500/20 to-transparent m-4 p-6 rounded-3xl border border-yellow-500/20">
              <h2 className="text-xl font-black mb-1">JOSEPH GUILAVOGUI</h2>
              <p className="text-gray-400 text-sm italic">"L'excellence n'est pas un acte, c'est une habitude."</p>
            </div>
            {/* Contenu flux */}
            {[1].map((post) => (
              <div key={post} className="p-4 border-b border-zinc-900">
                <div className="aspect-square bg-zinc-900 rounded-3xl mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                   <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80" className="w-full h-full object-cover opacity-50" />
                   <p className="absolute font-black text-2xl italic tracking-tighter text-yellow-500">EMPIRE GUISOGA</p>
                </div>
                <div className="flex gap-6">
                  <Heart className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="hover:text-yellow-500 cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- MESSAGERIE INTERACTIVE --- */}
        {activeTab === "chat" && (
          <section className="flex flex-col h-[80vh] p-4 animate-in slide-in-from-right">
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl ${m.isMe ? "bg-yellow-500 text-black rounded-tr-none" : "bg-zinc-900 text-white rounded-tl-none"}`}>
                    {!m.isMe && <p className="text-[9px] font-black uppercase mb-1 text-yellow-500">{m.sender}</p>}
                    <p className="text-sm font-medium">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center bg-zinc-900 p-2 rounded-2xl border border-white/5">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Votre message..." 
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
              />
              <button onClick={handleSendMessage} className="bg-yellow-500 p-3 rounded-xl text-black">
                <Send size={18} strokeWidth={3} />
              </button>
            </div>
          </section>
        )}

        {/* --- TV MODE (STYLE TV GARDEN) --- */}
        {activeTab === "video" && (
          <section className="h-[85vh] w-full bg-zinc-950 flex flex-col animate-in zoom-in">
            <div className="relative aspect-video w-full bg-black shadow-2xl">
              {/* Intégration Flux Vidéo Reel */}
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0&controls=1" 
                title="GUISOGA LIVE TV"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div> EN DIRECT
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-black text-yellow-500 tracking-tighter uppercase">Guisoga TV Garden</h2>
              <p className="text-gray-400 text-sm mt-2">Accès premium gratuit. Regardez les meilleurs flux mondiaux sans redirection.</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg mb-2"></div>
                  <p className="text-[10px] font-bold uppercase">Canal Sport</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5">
                  <div className="w-8 h-8 bg-zinc-700 rounded-lg mb-2"></div>
                  <p className="text-[10px] font-bold uppercase">Canal Info</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- RENCONTRES --- */}
        {activeTab === "dating" && (
          <section className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-left">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="font-black text-xs">Utilisateur #{i}</p>
                  <span className="text-[8px] text-green-500 font-bold uppercase">Connecté</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* NAVIGATION BASSE */}
      <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-50">
        <Home className={`cursor-pointer ${activeTab === "home" ? "text-yellow-500 scale-125" : "text-zinc-600"}`} onClick={() => setActiveTab("home")} />
        <Tv className={`cursor-pointer ${activeTab === "video" ? "text-yellow-500 scale-125" : "text-zinc-600"}`} onClick={() => setActiveTab("video")} />
        <Users className={`cursor-pointer ${activeTab === "dating" ? "text-yellow-500 scale-125" : "text-zinc-600"}`} onClick={() => setActiveTab("dating")} />
        <div onClick={() => setActiveTab("home")} className={`w-8 h-8 rounded-full border-2 ${activeTab === "home" ? "border-yellow-500" : "border-zinc-700"}`}>
          <img src="/icon-512.png" className="w-full h-full rounded-full" />
        </div>
      </nav>
    </main>
  );
}