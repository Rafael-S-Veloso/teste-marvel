/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import styles from '../styles/modal.module.css';

const Modal = ({ isOpen, onClose, characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && characterId) {
      const fetchCharacter = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&apikey=06ead66137452ef75685fcdc895a6c0b&hash=2774d42849c52a2ec23f9b2298e41e7a`);
          if (!response.ok) {
            throw new Error('Failed to fetch character data.');
          }
          const data = await response.json();
          setCharacter(data.data.results[0]);
        } catch (err) {
          setError('Failed to fetch character data.');
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [isOpen, characterId]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : character ? (
          <>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className={styles.modalImage}
            />
            <h2>{character.name}</h2>
            <p>{character.description || 'Description not available.'}</p>
          </>
        ) : (
          <p>No character data available.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
