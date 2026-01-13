"use client";
import { useState } from "react";
import { Home, Tv, MessageCircle, Users, Heart, PlusSquare, Search, Share2, Send } from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [subs, setSubs] = useState(1250);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fonction pour gérer l'abonnement
  const handleSubscribe = () => {
    if (!isSubscribed) {
      setSubs(subs + 1);
      setIsSubscribed(true);
      alert("Merci de votre confiance. Vous suivez désormais l'empire de JOSEPH GUILAVOGUI.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-20">
      
      {/* BARRE SUPÉRIEURE */}
      <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-black text-yellow-500 tracking-tighter">GUISOGA</h1>
        <div className="flex gap-4">
          <PlusSquare title="Créer un post" className="text-gray-300 cursor-pointer hover:text-white" />
          <Search title="Rechercher" className="text-gray-300 cursor-pointer hover:text-white" />
          {/* L'icône message change maintenant l'onglet vers une simulation de chat */}
          <MessageCircle 
            title="Messagerie" 
            className={`cursor-pointer transition-colors ${activeTab === "chat" ? "text-yellow-500" : "text-gray-300 hover:text-white"}`}
            onClick={() => setActiveTab("chat")}
          />
        </div>
      </nav>

      <div className="p-0">
        {activeTab === "home" && (
          <section className="animate-in fade-in duration-500">
            
            {/* MESSAGE DE BIENVENUE RÉDUIT */}
            <div className="bg-zinc-900/50 m-4 p-4 rounded-2xl border-l-4 border-yellow-500">
              <p className="text-[11px] font-bold text-yellow-500 uppercase tracking-widest mb-1">Joseph Guilavogui</p>
              <p className="text-[12px] text-gray-400 italic">"Voyez plus loin avec l'élite."</p>
            </div>

            {/* SECTION ABONNEMENT */}
            <div className="px-4 mb-6">
              <button 
                title="S'abonner à l'empire"
                onClick={handleSubscribe}
                className={`w-full font-black py-3 rounded-xl transition-all active:scale-95 shadow-lg uppercase tracking-widest text-xs ${
                  isSubscribed ? "bg-zinc-800 text-gray-500" : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-2">
                {subs.toLocaleString()} membres certifiés
              </p>
            </div>

            {/* FIL D'ACTUALITÉ */}
            {[1, 2].map((post) => (
              <div key={post} className="border-b border-zinc-900 pb-4 mb-4">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full border border-yellow-500 overflow-hidden">
                    <img src="/icon-192.png" alt="JG" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-xs uppercase">GUISOGA Officiel</p>
                </div>
                <div className="aspect-video bg-zinc-900 w-full flex items-center justify-center">
                   <p className="text-zinc-800 font-black italic">FLUX RÉEL</p>
                </div>
                <div className="flex gap-6 p-4">
                  <Heart title="J'aime" size={20} className="cursor-pointer hover:text-red-500 transition-colors" />
                  <MessageCircle title="Commenter" size={20} className="cursor-pointer" />
                  <Share2 title="Partager" size={20} className="ml-auto cursor-pointer" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* NOUVEL ONGLET : MESSAGERIE ACCESSIBLE */}
        {activeTab === "chat" && (
          <section className="p-4 flex flex-col h-[70vh] animate-in slide-in-from-right duration-300">
            <h2 className="text-yellow-500 font-black mb-4 flex items-center gap-2">
              <MessageCircle size={20} /> MESSAGERIE PUBLIQUE
            </h2>
            <div className="flex-1 bg-zinc-900/30 rounded-2xl p-4 border border-white/5 overflow-y-auto mb-4 text-sm text-gray-400">
              <div className="mb-4">
                <p className="text-yellow-500 font-bold text-[10px]">SYSTÈME :</p>
                <p>Bienvenue dans la messagerie mondiale. Échangez gratuitement avec tous les membres.</p>
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Écrire un message..." 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-yellow-500"
              />
              <Send title="Envoyer" className="absolute right-4 top-3 text-yellow-500 cursor-pointer" size={20} />
            </div>
          </section>
        )}

        {activeTab === "video" && (
           <section className="h-[70vh] flex flex-col items-center justify-center p-10 text-center">
             <Tv size={50} className="text-yellow-500 mb-4" />
             <p className="text-sm font-bold">LIVES & VIDÉOS GRATUITES</p>
           </section>
        )}

        {activeTab === "dating" && (
           <section className="p-6">
             <h2 className="text-xl font-black text-yellow-500 mb-6">RENCONTRES MONDIALES</h2>
             <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-black">
                      <p className="font-bold text-[10px]">Membre Vérifié {i}</p>
                    </div>
                 </div>
               ))}
             </div>
           </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION */}
      <nav className="fixed bottom-0 w-full bg-black/95 border-t border-zinc-800 px-8 py-4 flex justify-between items-center z-50">
        <Home 
          title="Accueil"
          className={`cursor-pointer transition-all ${activeTab === "home" ? "text-yellow-500 scale-110" : "text-gray-500"}`} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          title="Vidéos / Live"
          className={`cursor-pointer transition-all ${activeTab === "video" ? "text-yellow-500 scale-110" : "text-gray-500"}`} 
          onClick={() => setActiveTab("video")} 
        />
        <Users 
          title="Rencontres"
          className={`cursor-pointer transition-all ${activeTab === "dating" ? "text-yellow-500 scale-110" : "text-gray-500"}`} 
          onClick={() => setActiveTab("dating")} 
        />
        <div title="Mon Profil" className="w-7 h-7 rounded-full border border-yellow-500 overflow-hidden cursor-pointer">
          <img src="/icon-512.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </nav>
    </main>
  );
}