"use client";
import { useState, useEffect, useMemo } from "react";
import { Home, Video, Plus, MessageCircle, Menu, Search, Star, Heart, Share2, LogOut, Send, ArrowLeft, Music, Bookmark, TrendingUp } from "lucide-react";

export default function GuisogaEmpire() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); 
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Données Brutes (Simulées comme provenant d'une base de données)
  const rawPosts = [
    { id: 1, type: "text", user: "Joseph Guilavogui", content: "L'analyse du Real Madrid vs City est prête. Confidentialité totale.", prestige: 95, category: "prognostic", date: new Date() },
    { id: 2, type: "video", user: "GUISOGA", content: "Bienvenue dans l'élite.", prestige: 100, category: "official", date: new Date(Date.now() - 100000) },
    { id: 3, type: "text", user: "Membre001", content: "J'ai gagné gros grâce aux conseils d'hier !", prestige: 50, category: "community", date: new Date(Date.now() - 500000) },
  ];

  // 🧠 L'ALGORITHME GUISOGA : Tri par Prestige et Récence
  const sortedEmpireFeed = useMemo(() => {
    return [...rawPosts].sort((a, b) => {
      // Priorité 1: Les posts officiels ou de Joseph (Prestige > 90)
      if (b.prestige !== a.prestige) return b.prestige - a.prestige;
      // Priorité 2: Le plus récent
      return b.date.getTime() - a.date.getTime();
    });
  }, [rawPosts]);

  // --- États et Logique (Authentification / Chat identiques aux phases précédentes) ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [messages, setMessages] = useState([{ id: 1, text: "Messagerie cryptée active.", sender: "Système", time: "00:00" }]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("guisoga_session_active");
    if (session === "true") {
      const user = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
      setFirstName(user.firstName || "Elite");
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("empire_user_data") || "{}");
    if (isLoginView) {
      if (saved.email === email && saved.password === password) {
        localStorage.setItem("guisoga_session_active", "true");
        setFirstName(saved.firstName); setIsLoggedIn(true);
      } else alert("Refusé.");
    } else {
      localStorage.setItem("empire_user_data", JSON.stringify({ email, password, firstName }));
      setIsLoginView(true); alert("Empire créé !");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <img src="/logo.png" alt="GUISOGA" className="w-40 h-40 mx-auto lg:mx-0 mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <h1 className="text-7xl lg:text-8xl font-black text-[#D4AF37] italic tracking-tighter mb-4 uppercase">GUISOGA</h1>
            <p className="text-[#D4AF37]/60 text-lg uppercase tracking-[0.3em] font-light">L'intelligence au service de l'élite.</p>
          </div>
          <div className="lg:w-[420px] w-full">
            <div className="bg-[#111] p-8 rounded-[40px] border border-[#D4AF37]/20 shadow-2xl">
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLoginView && <input required type="text" placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl outline-none" />}
                <input required type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none" />
                <input required type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-black border border-zinc-800 text-white p-5 rounded-2xl outline-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] text-black font-black py-4 rounded-2xl text-xl uppercase">ENTRER</button>
                <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="w-full text-zinc-500 text-sm mt-2">{isLoginView ? "Rejoindre l'Empire" : "Connexion"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* NAV HAUTE */}
      <nav className="p-4 bg-zinc-950 border-b border-[#D4AF37]/20 flex justify-between items-center z-50">
        <h1 className="text-2xl font-black text-[#D4AF37] italic uppercase tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4 items-center">
            <TrendingUp size={20} className="text-[#D4AF37]" />
            <div className="w-9 h-9 bg-gradient-to-tr from-[#D4AF37] to-[#AA8A2E] rounded-full flex items-center justify-center text-black font-black uppercase">{firstName[0]}</div>
        </div>
      </nav>

      {/* CONTENU ALGORITHMIQUE */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          
          {/* Section Suggestion Algorithmique */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["Pour vous", "Analyses", "Direct", "Elite"].map((tag, i) => (
              <span key={i} className={`px-4 py-2 rounded-full border text-xs font-bold uppercase whitespace-nowrap ${i === 0 ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-zinc-800 text-zinc-500"}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Affichage des posts triés par le "cerveau" */}
          {sortedEmpireFeed.map((post) => (
            <div key={post.id} className="bg-zinc-900/40 rounded-[35px] border border-zinc-800 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-zinc-800 rounded-full flex items-center justify-center text-[#D4AF37] font-bold border border-[#D4AF37]/20">
                    {post.user[0]}
                  </div>
                  <div>
                    <p className="font-black text-sm flex items-center gap-1 uppercase tracking-tight">
                      {post.user} {post.prestige > 90 && <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" />}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                      {post.category} • {post.prestige}% Prestige
                    </p>
                  </div>
                </div>
                <div className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] px-2 py-1 rounded-md font-bold">TOP CONTENT</div>
              </div>
              <p className="text-zinc-200 leading-relaxed font-medium">{post.content}</p>
              <div className="flex justify-between items-center pt-4 border-t border-zinc-800/50">
                <div className="flex gap-6">
                  <Heart size={22} className="text-zinc-700 hover:text-red-500 cursor-pointer transition-colors" />
                  <MessageCircle size={22} className="text-zinc-700 hover:text-[#D4AF37] cursor-pointer" onClick={() => setActiveTab("chat")} />
                  <Share2 size={22} className="text-zinc-700 hover:text-[#D4AF37] cursor-pointer" />
                </div>
                <Bookmark size={22} className="text-zinc-700" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* NAV BASSE */}
      <nav className="bg-zinc-950 border-t border-[#D4AF37]/10 p-4 flex justify-around items-center backdrop-blur-md">
        <Home className={activeTab === "home" ? "text-[#D4AF37]" : "text-zinc-800"} size={28} onClick={() => setActiveTab("home")} />
        <Video className={activeTab === "video" ? "text-[#D4AF37]" : "text-zinc-800"} size={28} onClick={() => setActiveTab("video")} />
        <div className="bg-gradient-to-b from-[#D4AF37] to-[#AA8A2E] text-black rounded-2xl p-1 px-3 flex items-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-110 transition-transform">
          <Plus size={24} strokeWidth={3} />
        </div>
        <MessageCircle className={activeTab === "chat" ? "text-[#D4AF37]" : "text-zinc-800"} size={28} onClick={() => setActiveTab("chat")} />
        <Menu className="text-zinc-800" size={28} onClick={() => {localStorage.removeItem("guisoga_session_active"); window.location.reload();}} />
      </nav>
    </div>
  );
}