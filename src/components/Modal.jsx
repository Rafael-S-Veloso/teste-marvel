/* eslint-disable @next/next/no-img-element */
import styles from "../styles/modal.module.css";

const Modal = ({ isOpen, onClose, characterId }) => {
  if (!isOpen) return null;
  console.log(characterId, "characterId");
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div>
          <img
            src={`${characterId?.thumbnail?.path}.${characterId?.thumbnail?.extension}`}
            alt={characterId?.name}
            className={styles.modalImage}
          />
          <h2>{characterId?.name}</h2>
          <p>{characterId?.description || "Description not available."}</p>
          <div>
            <h2>COMICS</h2>
            {characterId.comics.items.map((comic) => {
              return <p key={comic.id}>{comic.name}</p>;
            })}
          </div>
          <div>
            <h2>EVENTS</h2>
            {characterId.events.items.map((event) => {
              return <p key={event.id}>{event.name || "Não há eventos"}</p>;
            })}
          </div>
          <div>
            <h2>SERIES</h2>
            {characterId.events.items.map((serie) => {
              return <p key={serie.id}>{serie.name || "Não há series"}</p>;
            })}
          </div>
          <div>
            <h2>STORIES</h2>
            {characterId.events.items.map((historia) => {
              return (
                <p key={historia.id}>{historia.name || "Não há historia"}</p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
