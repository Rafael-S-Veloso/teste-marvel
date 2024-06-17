import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Search.module.css";

const API_URL = "http://gateway.marvel.com/v1/public/characters";
const API_KEY = "06ead66137452ef75685fcdc895a6c0b";
const HASH = "2774d42849c52a2ec23f9b2298e41e7a";
const TS = "1";

function Search() {
  const router = useRouter();
  const { query } = router.query;
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchCharacterData(query);
    }
  }, [query]);

  const fetchCharacterData = async (characterName) => {
    try {
      const response = await fetch(
        `${API_URL}?nameStartsWith=${characterName}&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
      );
      const data = await response.json();
      setCharacterData(data.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      {characterData && characterData.length > 0 ? (
        characterData.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className={styles.characterImage}
            />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
          </div>
        ))
      ) : (
        <p>No characters found</p>
      )}
    </div>
  );
}

export default Search;
