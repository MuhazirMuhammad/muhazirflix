{
  "name": "muhazirflix",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "framer-motion": "^10.12.16",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})
import axios from "axios";
const API_BASE = "https://zeldvorik.ru/apiv3/api.php";

export const fetchData = async (params) => {
  const res = await axios.get(API_BASE, { params });
  return res.data;
};
:root {
  --bg: #0f0f0f;
  --card: #1c1c1c;
  --text: #ffffff;
  --muted: #b3b3b3;
  --accent: #e50914;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, sans-serif;
  margin: 0;
}

a { text-decoration: none; color: inherit; }

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
}

@media(min-width:768px){.grid{grid-template-columns:repeat(3,1fr);}}
@media(min-width:1024px){.grid{grid-template-columns:repeat(4,1fr);}}
import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  const [items,setItems] = useState([]);
  const [index,setIndex] = useState(0);

  useEffect(()=>{
    fetchData({action:"trending",page:1}).then(res=>setItems(res.items.slice(0,5)));
  },[]);

  useEffect(()=>{
    if(!items.length) return;
    const timer = setInterval(()=>setIndex(i=>(i+1)%items.length),5000);
    return ()=>clearInterval(timer);
  },[items]);

  if(!items.length) return null;
  const current = items[index];

  return (
    <div style={{height:"70vh",position:"relative"}}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.8}}
          style={{
            height:"100%",
            backgroundImage:`url(${current.poster})`,
            backgroundSize:"cover",
            backgroundPosition:"center"
          }}
        >
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.2))"}}/>
          <div style={{position:"absolute",bottom:"20%",left:"5%"}}>
            <h1>{current.title}</h1>
            <p>⭐ {current.rating} • {current.year}</p>
            <Link to={`/detail/${encodeURIComponent(current.detailPath)}`} style={{background:"#e50914",padding:"10px 18px",borderRadius:6,display:"inline-block",marginTop:10}}>▶ Play</Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
import HeroSlider from "../components/HeroSlider";
import { useEffect,useState } from "react";
import { fetchData } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [items,setItems] = useState([]);

  useEffect(()=>{
    fetchData({action:"trending",page:1}).then(res=>setItems(res.items));
  },[]);

  return (
    <>
      <HeroSlider />
      <div style={{padding:16}}>
        <h2>Trending</h2>
        <div className="grid">
          {items.map(item=>(
            <Link key={item.id} to={`/detail/${encodeURIComponent(item.detailPath)}`}>
              <img src={item.poster} style={{width:"100%",borderRadius:8}}/>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchData } from "../api/api";

export default function Detail() {
  const {detailPath} = useParams();
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetchData({action:"detail",detailPath:decodeURIComponent(detailPath)}).then(setData);
  },[detailPath]);

  if(!data) return <p>Loading...</p>;

  return (
    <div style={{padding:16}}>
      <h1>{data.title}</h1>
      <iframe src={data.playerUrl} width="100%" height="500" allowFullScreen/>
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:detailPath" element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

