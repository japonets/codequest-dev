import styles from './Systems.module.css';
import { systemsData } from './SystemsData';
import { SystemCard } from './SystemCard';

export function Systems() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>O QUE VOCÊ VAI CONSTRUIR</h2>
        <p className={styles.subtitle}>Pequenos sistemas que se conectam até formar um jogo completo.</p>
      </div>
      <div className={styles.grid}>
        {systemsData.map((system) => (
          <SystemCard key={system.id} data={system} />
        ))}
      </div>
    </section>
  );
}