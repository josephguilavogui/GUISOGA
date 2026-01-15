"use client";
import { useState, useEffect, useRef } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2, LogOut, Send, ArrowLeft } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // home or chat
  const [isLoginView, setIsLoginView] = useState(true);
  
  // États Authentification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  
  // États Messagerie
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue dans la messagerie sécurisée de l'Empire.", sender: "Système", time: "09:00" },
    { id: 2, text: "Ici, tout reste privé entre nous.", sender: "Joseph Guilavogui", time: "09:01" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionActive = localStorage.getItem("guisoga_session_active");
    if (sessionActive === "true") {
      const savedUser = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
      setFirstName(savedUser.firstName || "Membre");
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, activeTab]);

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

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = { id: Date.now(), text: newMessage, sender: firstName, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, msg]);
    setNewMessage("");
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
                {!isLoginView && (
                  <input required type="text" placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:border-[#D4AF37] outline-none" />
                )}
                <input required type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none" />
                <input required type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl focus:border-[#D4AF37] outline-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl hover:brightness-110 uppercase">{isLoginView ? "ENTRER" : "CRÉER"}</button>
                <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="w-full text-zinc-500 text-sm mt-4 hover:text-[#D4AF37] transition-colors">{isLoginView ? "Créer un compte" : "Déjà membre ?"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* BARRE HAUTE */}
      <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {activeTab === "chat" && <ArrowLeft onClick={() => setActiveTab("home")} className="cursor-pointer text-[#D4AF37] mr-2" />}
          <h1 className="text-2xl font-black text-[#D4AF37] italic">GUISOGA</h1>
        </div>
        <div className="flex items-center gap-4">
          <Search size={22} className="text-zinc-600" />
          <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black uppercase">{firstName[0]}</div>
        </div>
      </nav>

      {/* CONTENU DYNAMIQUE */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "home" ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-2xl mx-auto w-full">
            <div className="bg-zinc-900/50 p-6 rounded-[35px] border border-zinc-800">
              <h2 className="text-2xl font-black italic uppercase">SALUT, {firstName} !</h2>
              <p className="text-zinc-500 text-sm">Prêt pour les analyses de l'Empire ?</p>
            </div>
            {/* Feed Factice */}
            <div className="bg-zinc-900/30 rounded-[35px] border border-zinc-800 p-4">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">JG</div>
                  <p className="font-black text-sm uppercase">Joseph Guilavogui <Star size={12} className="inline text-[#D4AF37] fill-[#D4AF37]" /></p>
               </div>
               <div className="h-48 bg-zinc-800/50 rounded-2xl mb-4 flex items-center justify-center text-zinc-600 italic">Publication de l'Empire en attente...</div>
               <div className="flex justify-around border-t border-zinc-800 pt-4">
                 <Heart size={22} className="text-zinc-700" /> <MessageCircle size={22} className="text-zinc-700" /> <Share2 size={22} className="text-zinc-700" />
               </div>
            </div>
          </div>
        ) : (
          /* SECTION MESSAGERIE */
          <div className="flex-1 flex flex-col bg-black max-w-2xl mx-auto w-full border-x border-zinc-900">
            <div className="p-4 border-b border-zinc-900 bg-zinc-950/50">
              <p className="text-[#D4AF37] font-bold text-center uppercase tracking-widest text-xs">Messagerie Sécurisée</p>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === firstName ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl ${m.sender === firstName ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-white"}`}>
                    <p className="text-sm font-medium">{m.text}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">{m.time}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-zinc-950 border-t border-zinc-900 flex gap-2">
              <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder="Écrire à l'Empire..." className="flex-1 bg-zinc-900 border-none text-white p-4 rounded-2xl focus:ring-1 focus:ring-[#D4AF37] outline-none" />
              <button className="bg-[#D4AF37] text-black p-4 rounded-2xl hover:brightness-110"><Send size={20} /></button>
            </form>
          </div>
        )}
      </main>

      {/* BARRE DE NAVIGATION BASSE */}
      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around sticky bottom-0">
        <Home className={activeTab === "home" ? "text-[#D4AF37]" : "text-zinc-700"} size={28} onClick={() => setActiveTab("home")} />
        <Video className="text-zinc-700" size={28} />
        <div className="bg-[#D4AF37] text-black rounded-2xl p-1 px-3 flex items-center shadow-lg shadow-[#D4AF37]/30"><Plus size={24} strokeWidth={3} /></div>
        <MessageCircle className={activeTab === "chat" ? "text-[#D4AF37]" : "text-zinc-700"} size={28} onClick={() => setActiveTab("chat")} />
        <Menu className="text-zinc-700" size={28} onClick={() => {localStorage.removeItem("guisoga_session_active"); window.location.reload();}} />
      </nav>
    </div>
  );
}