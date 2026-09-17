import { useEffect, useState } from 'react';
import styles from './RoadMap.module.css';
import { checkPoints } from './CheckPointsData';
import CheckPoint from './CheckPoint';

const ROTATION_INTERVAL = 5000;

const RoadMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null || checkPoints.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % checkPoints.length
      );
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [hoveredIndex]);

  const handleMouseLeave = (index: number) => {
    setActiveIndex(index);
    setHoveredIndex(null);
  };

  return (
    <section id="jornada" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>SUA JORNADA PELO SISTEMA GODOT</h2>
          <p className={styles.subtitle}>
            Uma rota clara, com checkpoints visíveis e liberdade para avançar no seu ritmo.
          </p>
        </header>

        <div className={styles.roadmap}>
          {checkPoints.map((checkPoint, index) => (
            <CheckPoint
              key={checkPoint.numero}
              {...checkPoint}
              isHighlighted={
                hoveredIndex !== null
                  ? hoveredIndex === index
                  : activeIndex === index
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
