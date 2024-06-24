import styles from "../styles/NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nenhum personagem encontrado</h1>
      <img
        src="/default.png"
        alt="No character found"
        className={styles.image}
      />
    </div>
  );
}

export default NotFound;
