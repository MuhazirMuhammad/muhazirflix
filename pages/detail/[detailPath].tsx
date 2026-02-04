import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchDetail } from "../../api/api";
import { NextSeo } from "next-seo";

export default function Detail() {
  const router = useRouter();
  const { detailPath } = router.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (detailPath) {
      fetchDetail(detailPath as string).then(res => setData(res.items[0]));
    }
  }, [detailPath]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
      <NextSeo
        title={`${data.title} - MuhazirFlix`}
        description={`${data.title} (${data.year}) - ${data.genre}. Rating: ${data.rating}`}
        openGraph={{
          title: data.title,
          description: data.description,
          images: [{ url: data.poster }]
        }}
      />
      <div className="flex flex-col items-center gap-4">
        <img src={data.poster} alt={data.title} className="max-w-sm rounded-xl" />
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p>Rating: {data.rating}</p>
        <p>{data.genre} • {data.year}</p>
        <p>{data.description}</p>
        {data.type === 'tv' && data.seasons && (
          <div className="w-full max-w-xl mt-4">
            {data.seasons.map(season => (
              <div key={season.id}>
                <h2 className="text-xl font-semibold">{season.name}</h2>
                <ul className="list-disc pl-5">
                  {season.episodes.map(ep => <li key={ep.id}>{ep.title}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        <video src={data.playerUrl} controls className="w-full max-w-3xl mt-4 rounded-lg" />
      </div>
    </div>
  );
}

