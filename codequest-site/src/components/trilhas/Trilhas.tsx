import TrilhaCard from './TrilhaCard';
import { trilhas } from './trilhasData';
import styles from './Trilhas.module.css';

const Trilhas = () => {
  return (
    <section id="trilhas" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>ESCOLHA SUA TRILHA</h2>
          <p className={styles.subtitle}>
            Comece pelo seu objetivo. Cada trilha combina explicações curtas,
            desafios práticos e um projeto jogável.
          </p>
        </header>

        <div className={styles.cards}>
          {trilhas.map((trilha) => (
            <TrilhaCard key={trilha.numero} {...trilha} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trilhas;
