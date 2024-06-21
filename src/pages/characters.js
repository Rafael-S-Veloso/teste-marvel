/* eslint-disable @next/next/no-img-element */
// src/pages/search.js
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/characters.module.css";
import Modal from "../components/Modal";

const API_URL = "http://gateway.marvel.com/v1/public/characters";
const API_KEY = "dfdfc06935a1fe33837da6934f7b5373";
const HASH = "f5a214e5c63b897dfe0ebc1a1185c936";
const TS = "1";

function Search() {
  const router = useRouter();
  const { query } = router.query;
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    if (query) {
      fetchCharacterData(query);
    }
  }, [query]);

  const fetchCharacterData = async (characterName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?nameStartsWith=${characterName}&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
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

  const openModal = (character) => {
    console.log(character, "character");
    setSelectedCharacter(character);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCharacter(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <h1 className={styles.title}>MySuperHero</h1>
      </Link>
      <div className={styles.characterGrid}>
        {characterData.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <div className={styles.boxImg}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className={styles.characterImage}
                onClick={() => openModal(character)}
              />
            </div>
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          characterId={selectedCharacter}
        />
      )}
    </div>
  );
}

export default Search;
