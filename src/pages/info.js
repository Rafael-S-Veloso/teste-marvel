/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/info.module.css";
import Link from "next/link";

const Info = () => {
  const router = useRouter();
  const { id, name, description, thumbnail, comics, events, series, stories } =
    router.query;
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    if (router.query) {
      setCharacterData({
        id,
        name,
        description,
        thumbnail,
        comics: JSON.parse(comics || "[]"),
        events: JSON.parse(events || "[]"),
        series: JSON.parse(series || "[]"),
        stories: JSON.parse(stories || "[]"),
      });
    }
  }, [router.query]);

  if (!characterData) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <h1 className={styles.title}>MySuperHero</h1>
      </Link>
      <div className={styles.header}>
        <img
          src={characterData.thumbnail}
          alt={characterData.name}
          className={styles.image}
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{characterData.name}</h1>
          <p className={styles.description}>
            {characterData.description || "Description not available."}
          </p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <h2>Comics</h2>
          {characterData.comics.length > 0 ? (
            characterData.comics.map((comic) => (
              <p key={comic.resourceURI}>{comic.name}</p>
            ))
          ) : (
            <p>No comics available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Events</h2>
          {characterData.events.length > 0 ? (
            characterData.events.map((event) => (
              <p key={event.resourceURI}>{event.name}</p>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Series</h2>
          {characterData.series.length > 0 ? (
            characterData.series.map((serie) => (
              <p key={serie.resourceURI}>{serie.name}</p>
            ))
          ) : (
            <p>No series available.</p>
          )}
        </div>
        <div className={styles.section}>
          <h2>Stories</h2>
          {characterData.stories.length > 0 ? (
            characterData.stories.map((story) => (
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
