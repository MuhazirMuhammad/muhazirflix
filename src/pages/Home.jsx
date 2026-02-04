import HeroSlider from "../components/HeroSlider";
import ContentGrid from "../components/ContentGrid";
import { fetchTrending, fetchCategory } from "../api/api";

export default function Home() {
  return (
    <div className="container">
      <HeroSlider />
      <h2>Trending</h2>
      <ContentGrid fetchData={fetchTrending} />
      <h2>Indonesian Movies</h2>
      <ContentGrid fetchData={(page)=>fetchCategory('indonesian-movies', page)} />
      <h2>K-Drama</h2>
      <ContentGrid fetchData={(page)=>fetchCategory('kdrama', page)} />
      <h2>Anime</h2>
      <ContentGrid fetchData={(page)=>fetchCategory('anime', page)} />
    </div>
  );
}

