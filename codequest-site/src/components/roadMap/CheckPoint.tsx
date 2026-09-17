import styles from './CheckPoint.module.css';
import type { CheckPoint as CheckPointData } from './CheckPointsData';

type CheckPointProps = CheckPointData & {
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const CheckPoint = ({
  numero,
  titulo,
  descricao,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: CheckPointProps) => {
  return (
    <article
      aria-current={isHighlighted ? 'step' : undefined}
      className={`${styles.card} ${isHighlighted ? styles.highlighted : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.circle} aria-hidden="true">
        <span className={styles.number}>{numero}</span>
      </div>

      <h3 className={styles.title}>{titulo}</h3>
      <p className={styles.description}>{descricao}</p>
    </article>
  );
};

export default CheckPoint;
