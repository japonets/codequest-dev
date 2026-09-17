import type { CSSProperties } from 'react';
import styles from './TrilhaCard.module.css';
import type { Trilha } from './trilhasData';

type TrilhaCardStyle = CSSProperties & {
  '--trilha-cor': string;
};

const TrilhaCard = ({ numero, titulo, descricao, cta, cor }: Trilha) => {
  const cardStyle: TrilhaCardStyle = {
    '--trilha-cor': cor,
  };

  return (
    <article className={styles.card} style={cardStyle}>
      <span className={styles.number}>{numero}</span>

      <div className={styles.visual} aria-hidden="true">
        <span className={styles.circle} />
      </div>

      <h3 className={styles.title}>{titulo}</h3>
      <p className={styles.description}>{descricao}</p>
      {/*
      ATENÇÃO: Eu usei button assumindo que teremos um real backend depois, 
      mas talvez seria melhor só usar como link. 
      Vejam depois.
      */} 
      <button className={styles.cta} type="button">
        <span>{cta}</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </button>
    </article>
  );
};

export default TrilhaCard;
