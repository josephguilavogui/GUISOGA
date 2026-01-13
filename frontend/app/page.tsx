"use client";
import { useState } from "react";
import { 
  Home, Tv, MessageCircle, Users, Heart, PlusSquare, 
  Search, Share2, ChevronLeft, Send, ShieldCheck, Globe 
} from "lucide-react";

export default function GuisogaSuperApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [subs, setSubs] = useState(1250);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fonction pour l'abonnement
  const handleSubscribe = () => {
    if (!isSubscribed) {
      setSubs(subs + 1);
      setIsSubscribed(true);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 selection:bg-yellow-500/30">
      
      {/* BARRE SUPÉRIEURE DYNAMIQUE AVEC BOUTON RETOUR */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button 
              onClick={() => setActiveTab("home")}
              className="p-1 hover:bg-zinc-800 rounded-full transition-all"
              title="Retour à l'accueil"
            >
              <ChevronLeft className="text-yellow-500" size={28} />
            </button>
          )}
          <h1 
            className="text-2xl font-black text-yellow-500 tracking-tighter cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            GUISOGA
          </h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <PlusSquare title="Créer un contenu" className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <div 
            className="relative cursor-pointer group" 
            onClick={() => setActiveTab("chat")}
            title="Messagerie Publique"
          >
            <MessageCircle className={activeTab === "chat" ? "text-yellow-500" : "text-gray-400 group-hover:text-white"} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] px-1.2 rounded-full font-bold border border-black">9+</span>
          </div>
        </div>
      </nav>

      {/* ZONE DE CONTENU DYNAMIQUE */}
      <div className="transition-all duration-300">
        
        {/* --- ONGLET ACCUEIL --- */}
        {activeTab === "home" && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Message de bienvenue Joseph Guilavogui */}
            <div className="bg-zinc-900/40 m-4 p-4 rounded-2xl border-l-2 border-yellow-500">
              <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Joseph Guilavogui</p>
              <p className="text-sm text-gray-300 italic font-medium">"L'excellence est notre seule norme."</p>
            </div>

            {/* Bouton S'abonner unique */}
            <div className="px-4 mb-8 text-center">
              <button 
                title="S'abonner à l'empire"
                onClick={handleSubscribe}
                className={`w-full font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs ${
                  isSubscribed ? "bg-zinc-800 text-gray-500 border border-zinc-700" : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                {isSubscribed ? "ABONNÉ ✓" : "S'ABONNER"}
              </button>
              <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-tighter">
                {subs.toLocaleString()} Membres actifs mondialement
              </p>
            </div>

            {/* Fil d'actualité style Facebook */}
            {[1, 2].map((post) => (
              <div key={post} className="border-b border-zinc-900 pb-4 mb-6">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-full border border-yellow-500 p-0.5">
                    <img src="/icon-192.png" alt="JG" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tighter">GUISOGA Officiel</p>
                    <p className="text-[9px] text-yellow-600 font-bold uppercase">Analyse Certifiée</p>
                  </div>
                </div>
                <div className="aspect-video bg-zinc-900 w-full flex items-center justify-center border-y border-white/5">
                   <div className="text-center opacity-20">
                     <Globe size={40} className="mx-auto mb-2" />
                     <p className="font-black italic text-xl">CONTENU EXCLUSIF</p>
                   </div>
                </div>
                <div className="flex gap-8 p-4 px-6">
                  <Heart title="J'aime" size={24} className="cursor-pointer hover:text-red-500 transition-colors" />
                  <MessageCircle title="Commenter" size={24} className="cursor-pointer hover:text-yellow-500" />
                  <Share2 title="Partager" size={24} className="ml-auto cursor-pointer hover:text-blue-400" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- ONGLET MESSAGERIE --- */}
        {activeTab === "chat" && (
          <section className="p-4 flex flex-col h-[75vh] animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-500/10 p-2 rounded-xl">
                <MessageCircle className="text-yellow-500" size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-yellow-500">Messagerie Mondiale</h2>
            </div>
            <div className="flex-1 bg-zinc-900/20 rounded-3xl p-6 border border-white/5 overflow-y-auto mb-4 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-[10px] text-yellow-500 font-black mb-1 uppercase tracking-widest">Joseph Guilavogui</p>
                  <p className="text-xs text-gray-300">Bienvenue. Ici, nous échangeons librement pour construire l'avenir.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Écrire un message à la communauté..." 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-yellow-500 transition-all pr-14"
              />
              <button className="absolute right-3 top-2.5 p-2 bg-yellow-500 rounded-xl text-black" title="Envoyer">
                <Send size={18} strokeWidth={3} />
              </button>
            </div>
          </section>
        )}

        {/* --- ONGLET VIDÉO / LIVE --- */}
        {activeTab === "video" && (
           <section className="h-[75vh] flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-300">
             <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
               <Tv size={40} className="text-yellow-500" />
             </div>
             <h2 className="text-2xl font-black tracking-tighter mb-2 uppercase">Flux Direct Gratuit</h2>
             <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
               Accédez à toutes les vidéos et lives sans aucune redirection externe.
             </p>
           </section>
        )}

        {/* --- ONGLET RENCONTRES --- */}
        {activeTab === "dating" && (
           <section className="p-4 animate-in slide-in-from-left duration-300">
             <div className="flex items-center justify-between mb-8 px-2">
               <h2 className="text-2xl font-black text-yellow-500 tracking-tighter uppercase">Membres</h2>
               <Search title="Filtrer les membres" className="text-gray-500" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2rem] border border-white/5 relative overflow-hidden group cursor-pointer hover:border-yellow-500/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 p-4 w-full">
                      <p className="font-black text-[10px] text-white uppercase">Membre Global {i}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">En ligne</span>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           </section>
        )}
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE FIXE (Style Mobile App) */}
      <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-50">
        <Home 
          title="Accueil"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "home" ? "text-yellow-500 scale-125" : "text-gray-600 hover:text-gray-300"}`} 
          onClick={() => setActiveTab("home")} 
        />
        <Tv 
          title="Vidéos / Lives"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "video" ? "text-yellow-500 scale-125" : "text-gray-600 hover:text-gray-300"}`} 
          onClick={() => setActiveTab("video")} 
        />
        <Users 
          title="Rencontres Mondiales"
          className={`cursor-pointer transition-all duration-300 ${activeTab === "dating" ? "text-yellow-500 scale-125" : "text-gray-600 hover:text-gray-300"}`} 
          onClick={() => setActiveTab("dating")} 
        />
        <div 
          title="Mon Profil Élite"
          onClick={() => setActiveTab("home")}
          className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${activeTab === "home" ? "border-yellow-500" : "border-gray-700"}`}
        >
          <img src="/icon-512.png" alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
      </nav>
    </main>
  );
}