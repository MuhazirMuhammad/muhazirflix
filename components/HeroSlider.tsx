import { useEffect, useState } from "react";
import { fetchTrending } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HeroSlider() {
  const [trending, setTrending] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTrending().then(res => setTrending(res.items.slice(0, 5)));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % trending.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trending]);

  if (!trending.length) return <p>Loading...</p>;

  const prevSlide = () => setCurrent(prev => (prev - 1 + trending.length) % trending.length);
  const nextSlide = () => setCurrent(prev => (prev + 1) % trending.length);

  return (
    <div className="hero-slider relative h-[450px] overflow-hidden rounded-xl mb-8">
      <AnimatePresence>
        {trending.map((item, index) =>
          index === current && (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-8 text-white"
              style={{ backgroundImage: `url(${item.poster})`, textShadow: '2px 2px 10px #000' }}
            >
              <h2 className="text-3xl font-bold">{item.title}</h2>
              <p>{item.genre} • {item.year} • Rating: {item.rating}</p>
            </motion.div>
          )
        )}
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white">
        <FaChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {trending.map((_, idx) => (
          <span key={idx} onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${current===idx ? 'bg-red-600' : 'bg-white/50'}`}></span>
        ))}
      </div>
    </div>
  );
}

