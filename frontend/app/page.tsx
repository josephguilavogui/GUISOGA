"use client";
import { useState, useEffect, useRef } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2, LogOut, Send, ArrowLeft, Music, Bookmark } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // home, chat, video
  const [isLoginView, setIsLoginView] = useState(true);
  
  // États Authentification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  // États Vidéos (TikTok Style)
  const videoData = [
    { id: 1, user: "GUISOGA", desc: "Bienvenue dans l'élite. L'excellence est un choix.", music: "Empire Anthem", likes: "12K", color: "bg-zinc-800" },
    { id: 2, user: "Joseph Guilavogui", desc: "L'analyse parfaite pour gagner gros ce soir. 📈", music: "Prognostic Gold", likes: "45K", color: "bg-zinc-900" },
  ];
  
  // États Messagerie
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue dans la messagerie de l'Empire.", sender: "Système", time: "09:00" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const sessionActive = localStorage.getItem("guisoga_session_active");
    if (sessionActive === "true") {
      const savedUser = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
      setFirstName(savedUser.firstName || "Membre");
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
    if (isLoginView) {
      if (savedUser.email === email && savedUser.password === password) {
        localStorage.setItem("guisoga_session_active", "true");
        setFirstName(savedUser.firstName);
        setIsLoggedIn(true);
      } else { alert("Accès refusé."); }
    } else {
      localStorage.setItem("empire_user_data", JSON.stringify({ email, password, firstName }));
      setIsLoginView(true);
      alert("Compte créé !");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4">GUISOGA</h1>
            <h2 className="text-2xl font-bold text-white uppercase">L'EMPIRE DE JOSEPH GUILAVOGUI</h2>
          </div>
          <div className="lg:w-[420px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-2xl">
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLoginView && <input required type="text" placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl outline-none" />}
                <input required type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none" />
                <input required type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl uppercase">ENTRER</button>
                <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="w-full text-zinc-500 text-sm mt-2">{isLoginView ? "Créer un compte" : "Déjà membre ?"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* BARRE HAUTE (Cachée sur l'onglet Vidéo pour immersion) */}
      {activeTab !== "video" && (
        <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center z-50">
          <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
          <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black uppercase">{firstName[0]}</div>
        </nav>
      )}

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "home" && (
          <div className="p-4 max-w-2xl mx-auto space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-[35px] border border-zinc-800">
              <h2 className="text-2xl font-black italic">EMPIRE FEED</h2>
              <p className="text-zinc-500 text-sm italic">"Seuls les audacieux construisent l'histoire."</p>
            </div>
            <div className="bg-zinc-900/30 rounded-[35px] border border-zinc-800 h-64 flex items-center justify-center text-zinc-600">Actualités de l'Empire...</div>
          </div>
        )}

        {activeTab === "video" && (
          <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory bg-black">
            {videoData.map((v) => (
              <div key={v.id} className={`h-full w-full snap-start relative flex flex-col justify-end ${v.color}`}>
                {/* Infos Vidéo à gauche */}
                <div className="absolute bottom-24 left-4 z-10 space-y-2">
                  <p className="font-bold text-lg">@{v.user} <Star size={14} className="inline text-[#D4AF37] fill-[#D4AF37]" /></p>
                  <p className="text-sm max-w-[80%]">{v.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Music size={12} /> <span>{v.music}</span>
                  </div>
                </div>
                {/* Boutons à droite */}
                <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-6 items-center">
                   <div className="flex flex-col items-center"><div className="p-3 bg-zinc-800/50 rounded-full text-white"><Heart size={28} /></div><span className="text-[10px] mt-1 font-bold">{v.likes}</span></div>
                   <div className="flex flex-col items-center"><div className="p-3 bg-zinc-800/50 rounded-full text-white"><MessageCircle size={28} /></div><span className="text-[10px] mt-1 font-bold">852</span></div>
                   <div className="flex flex-col items-center"><div className="p-3 bg-zinc-800/50 rounded-full text-white"><Bookmark size={28} /></div></div>
                   <div className="flex flex-col items-center"><div className="p-3 bg-zinc-800/50 rounded-full text-white"><Share2 size={28} /></div></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "chat" && (
          <div className="h-full flex flex-col max-w-2xl mx-auto border-x border-zinc-900">
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map(m => (
                 <div key={m.id} className={`flex flex-col ${m.sender === firstName ? "items-end" : "items-start"}`}>
                   <div className={`p-4 rounded-3xl ${m.sender === firstName ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-white"}`}>{m.text}</div>
                 </div>
               ))}
             </div>
             <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex gap-2">
               <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder="Message..." className="flex-1 bg-zinc-900 p-4 rounded-2xl outline-none" />
               <button className="bg-[#D4AF37] p-4 rounded-2xl text-black"><Send size={20} /></button>
             </div>
          </div>
        )}
      </main>

      {/* BARRE DE NAVIGATION BASSE */}
      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around items-center z-50">
        <Home className={activeTab === "home" ? "text-[#D4AF37]" : "text-zinc-700"} size={28} onClick={() => setActiveTab("home")} />
        <Video className={activeTab === "video" ? "text-[#D4AF37]" : "text-zinc-700"} size={28} onClick={() => setActiveTab("video")} />
        <div className="bg-[#D4AF37] text-black rounded-2xl p-1 px-3 flex items-center shadow-lg shadow-[#D4AF37]/30"><Plus size={24} strokeWidth={3} /></div>
        <MessageCircle className={activeTab === "chat" ? "text-[#D4AF37]" : "text-zinc-700"} size={28} onClick={() => setActiveTab("chat")} />
        <Menu className="text-zinc-700" size={28} onClick={() => {localStorage.removeItem("guisoga_session_active"); window.location.reload();}} />
      </nav>
    </div>
  );
}