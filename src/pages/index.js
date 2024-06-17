import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    router.push(`/search?query=${inputValue}`);
  };

  return (
    <div className={styles.container}>
      <p>MySuperHero</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default Home;
