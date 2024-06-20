/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Modal from "./Modal";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "http://gateway.marvel.com/v1/public/characters?nameStartsWith=iron&ts=1&apikey=06ead66137452ef75685fcdc895a6c0b&hash=2774d42849c52a2ec23f9b2298e41e7a"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (err) {
        console.error("Failed to fetch characters", err);
      }
    };

    fetchCharacters();
  }, []);

  const openModal = (characterId) => {
    setSelectedCharacterId(characterId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacterId(null);
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div>
        {characters.map((character) => (
          <div
            key={character.id}
            onClick={() => openModal(character.id)}
            style={{
              cursor: "pointer",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              style={{ width: "100px", height: "100px" }}
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      {isModalOpen && selectedCharacterId !== null && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          characterId={selectedCharacterId}
        />
      )}
    </div>
  );
};

export default CharacterList;
