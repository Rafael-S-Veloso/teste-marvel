/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/info.module.css";
import Link from "next/link";

const Info = () => {
  const router = useRouter();
  const { id } = router.query;
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://gateway.marvel.com:443/v1/public/characters/";
  const API_KEY = "dfdfc06935a1fe33837da6934f7b5373";
  const HASH = "f5a214e5c63b897dfe0ebc1a1185c936";
  const TS = "1";

  const fetchCharacterData = async (characterName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}${id}?ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setCharacterData(data.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCharacterData(id);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link href={`/`} passHref>
        <h1 className={styles.title}>MySuperHero</h1>
      </Link>
      <div className={styles.header}>
        <img
          src={`${characterData[0]?.thumbnail?.path}.${characterData[0]?.thumbnail?.extension}`}
          alt={characterData[0]?.name}
          className={styles.image}
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{characterData[0]?.name}</h1>
          <p className={styles.description}>
            {characterData[0]?.description || "Description not available."}
          </p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <h2>Comics</h2>
          {characterData[0]?.comics?.items?.length > 0 ? (
            characterData[0]?.comics?.items?.map((comic) => {
              {
                console.log(comic, "<==");
              }
              return <p key={comic.resourceURI}>{comic.name}</p>;
            })
          ) : (
            <p>No comics available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Events</h2>
          {characterData[0]?.events?.items?.length > 0 ? (
            characterData[0]?.events?.items?.map((event) => (
              <p key={event.resourceURI}>{event.name}</p>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Series</h2>
          {characterData[0]?.series?.items?.length > 0 ? (
            characterData[0]?.series?.items?.map((serie) => (
              <p key={serie.resourceURI}>{serie.name}</p>
            ))
          ) : (
            <p>No series available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Stories</h2>
          {characterData[0]?.stories?.items?.length > 0 ? (
            characterData[0]?.stories?.items?.map((story) => (
              <p key={story.resourceURI}>{story.name}</p>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
