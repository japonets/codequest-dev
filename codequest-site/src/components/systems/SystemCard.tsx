import styles from './SystemCard.module.css';
import type { SystemModule } from './SystemsData';

interface SystemCardProps {
  data: SystemModule;
}

export function SystemCard({ data }: SystemCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.icon} ${styles[data.theme]}`}>{data.icon}</div>
        <div className={`${styles.tag} ${styles[data.theme + 'Bg']}`}>
          {data.difficulty}
        </div>
      </div>
      <h3 className={styles.title}>{data.title}</h3>
      <p className={styles.description}>{data.description}</p>
    </div>
  );
}