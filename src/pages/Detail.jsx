import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetail } from "../api/api";

export default function Detail() {
  const { detailPath } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDetail(detailPath).then(res => setData(res.items[0]));
  }, [detailPath]);

  if(!data) return <p>Loading...</p>;

  return (
    <div className="container" style={{ marginTop:'2rem' }}>
      <div style={{ display:'flex', flexDirection:'column', gap:'1rem', alignItems:'center' }}>
        <img src={data.poster} alt={data.title} style={{ maxWidth:'300px', borderRadius:'1rem' }} />
        <h1>{data.title}</h1>
        <p>Rating: {data.rating}</p>
        <p>{data.genre} • {data.year}</p>
        <p>{data.description}</p>
        {data.type === 'tv' && data.seasons && (
          <div>
            <h2>Seasons</h2>
            {data.seasons.map(season => (
              <div key={season.id}>
                <h3>{season.name}</h3>
                <ul>
                  {season.episodes.map(ep => (
                    <li key={ep.id}>{ep.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <video src={data.playerUrl} controls style={{ width:'100%', maxWidth:'800px', marginTop:'1rem' }} />
      </div>
    </div>
  );
}

