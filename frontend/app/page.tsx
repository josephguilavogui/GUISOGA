"use client";
import { useState, useEffect } from "react";
import { 
  Home, Users, Video, Store, Bell, Menu, Search, 
  MessageCircle, Plus, Heart, Share2, MoreHorizontal,
  ThumbsUp, MessageSquare, Image as ImageIcon, LogIn
} from "lucide-react";

export default function FacebookEmpire() {
  const [isLogged, setIsLogged] = useState(false);
  const [tab, setTab] = useState("home");

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <h1 className="text-[#1877f2] text-5xl font-black mb-8">facebook</h1>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
          <input type="text" placeholder="Adresse e-mail ou numéro de tél." className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1877f2]" />
          <input type="password" placeholder="Mot de passe" className="w-full p-4 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1877f2]" />
          <button onClick={() => setIsLogged(true)} className="w-full bg-[#1877f2] text-white font-bold py-3 rounded-md text-xl hover:bg-[#166fe5] transition-all">Se connecter</button>
          <div className="text-center my-4"><a href="#" className="text-[#1877f2] text-sm hover:underline">Mot de passe oublié ?</a></div>
          <hr className="my-6" />
          <div className="flex justify-center">
            <button className="bg-[#42b72a] text-white font-bold py-3 px-6 rounded-md hover:bg-[#36a420] transition-all">Créer nouveau compte</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-black pb-20">
      {/* HEADER FIXE */}
      <nav className="bg-white border-b border-gray-300 px-4 py-2 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-[#1877f2] text-3xl font-black tracking-tighter">facebook</h1>
        <div className="flex gap-2">
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer"><Search size={20} /></div>
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer"><MessageCircle size={20} /></div>
        </div>
      </nav>

      {/* NAVIGATION TABS (COMME L'APP) */}
      <div className="bg-white border-b border-gray-300 flex justify-around py-1 sticky top-[52px] z-40">
        <Tab icon={<Home size={28} />} active={tab === "home"} onClick={() => setTab("home")} />
        <Tab icon={<Users size={28} />} active={tab === "friends"} onClick={() => setTab("friends")} />
        <Tab icon={<Video size={28} />} active={tab === "watch"} onClick={() => setTab("watch")} />
        <Tab icon={<Store size={28} />} active={tab === "market"} onClick={() => setTab("market")} />
        <Tab icon={<Bell size={28} />} active={tab === "notif"} onClick={() => setTab("notif")} />
        <Tab icon={<Menu size={28} />} active={tab === "menu"} onClick={() => setTab("menu")} />
      </div>

      {/* MUR (FEED) */}
      <div className="max-w-2xl mx-auto mt-4 space-y-4">
        {/* PUBLICATION BOX */}
        <div className="bg-white p-4 shadow-sm border border-gray-200 rounded-lg">
          <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <button className="flex-1 bg-gray-100 text-left px-4 py-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">Que voulez-vous dire ?</button>
          </div>
          <hr className="mb-2" />
          <div className="flex justify-around">
            <div className="flex items-center gap-2 text-gray-600 font-semibold p-2 hover:bg-gray-100 rounded-lg cursor-pointer"><ImageIcon className="text-green-500" /> Photo</div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold p-2 hover:bg-gray-100 rounded-lg cursor-pointer"><Video className="text-red-500" /> Live</div>
          </div>
        </div>

        {/* STORIES */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="min-w-[110px] h-48 bg-gray-200 rounded-xl relative overflow-hidden border border-gray-300">
            <div className="h-2/3 bg-gray-300" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1877f2] p-1 rounded-full border-4 border-white"><Plus color="white" /></div>
            <div className="absolute bottom-1 text-[10px] w-full text-center font-bold">Créer story</div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[110px] h-48 bg-gray-400 rounded-xl relative overflow-hidden shadow-md">
              <img src={`https://picsum.photos/200/400?random=${i}`} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-4 border-[#1877f2] overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} /></div>
            </div>
          ))}
        </div>

        {/* POSTS (FLUX INFINI) */}
        {[1, 2, 3, 4, 5].map(i => (
          <FBPost key={i} id={i} />
        ))}
      </div>
    </div>
  );
}

function Tab({ icon, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex-1 flex justify-center py-2 cursor-pointer border-b-4 transition-all ${active ? "border-[#1877f2] text-[#1877f2]" : "border-transparent text-gray-500"}`}>
      {icon}
    </div>
  );
}

function FBPost({ id }: { id: number }) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src={`https://i.pravatar.cc/100?u=${id+10}`} />
          </div>
          <div>
            <p className="font-bold hover:underline cursor-pointer">Joseph Guilavogui</p>
            <p className="text-xs text-gray-500 font-medium">Il y a {id} h • 🌍</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500 cursor-pointer" />
      </div>
      <p className="px-4 pb-4 text-sm">Ceci est une publication de l'Empire. Bienvenue sur la plateforme ! 🚀</p>
      <div className="aspect-video bg-gray-100">
        <img src={`https://picsum.photos/600/400?random=${id+20}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex justify-between text-gray-500 text-sm border-b border-gray-100 mx-2">
        <div className="flex items-center gap-1"><div className="bg-[#1877f2] p-1 rounded-full"><ThumbsUp size={10} color="white" fill="white" /></div> 124</div>
        <div>{id * 5} commentaires • {id * 2} partages</div>
      </div>
      <div className="flex p-1">
        <PostBtn icon={<ThumbsUp size={20} />} label="J'aime" />
        <PostBtn icon={<MessageSquare size={20} />} label="Commenter" />
        <PostBtn icon={<Share2 size={20} />} label="Partager" />
      </div>
    </div>
  );
}

function PostBtn({ icon, label }: any) {
  return (
    <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors text-gray-600 font-semibold text-sm">
      {icon} {label}
    </div>
  );
}