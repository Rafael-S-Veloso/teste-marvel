/* eslint-disable @next/next/no-img-element */

import styles from '../styles/modal.module.css';

const Modal = ({ isOpen, onClose, character }) => {
  if (!isOpen || !character) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className={styles.modalImage}
        />
        <h2>{character.name}</h2>
        <p>{character.description ? character.description : 'Description not available.'}</p>
      </div>
    </div>
  );
};

export default Modal;
