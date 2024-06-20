import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      router.push(`/characters?query=${inputValue}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <p>MySuperHero</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
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
