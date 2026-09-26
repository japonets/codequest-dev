import styles from './Hero.module.css';

import fundamentalsPlanet from '../../assets/hero/fundamentals-planet.svg';
import godotPlanet from '../../assets/hero/godot-planet.svg';
import orbitInner from '../../assets/hero/orbit-inner.svg';
import orbitMiddle from '../../assets/hero/orbit-middle.svg';
import orbitOuter from '../../assets/hero/orbit-outer.svg';
import projectsPlanet from '../../assets/hero/projects-planet.svg';
import systemsPlanet from '../../assets/hero/systems-planet.svg';

const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>UMA AVENTURA PARA APRENDER GODOT</p>

          <h1 id="hero-title" className={styles.title}>
            APRENDA GODOT
            <br />
            CRIANDO JOGOS
          </h1>

          <p className={styles.description}>
            Explore sistemas, complete missões e transforme
            <br />
            ideias em jogos — do primeiro nó ao projeto final.
          </p>

          <div className={styles.actions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href="#jornada">
              INICIAR JORNADA <span aria-hidden="true">→</span>
            </a>
            <a className={`${styles.button} ${styles.secondaryButton}`} href="#trilhas">
              VER AS TRILHAS
            </a>
          </div>
        </div>

        <div
          className={styles.planetarySystem}
          role="img"
          aria-label="Sistema planetário representando a jornada de aprendizado em Godot"
        >
          <img className={styles.orbitOuter} src={orbitOuter} alt="" />
          <img className={styles.orbitMiddle} src={orbitMiddle} alt="" />
          <img className={styles.orbitInner} src={orbitInner} alt="" />

          <img className={styles.godotPlanet} src={godotPlanet} alt="" />
          <span className={styles.godotInitial} aria-hidden="true">G</span>

          <img className={styles.fundamentalsPlanet} src={fundamentalsPlanet} alt="" />
          <img className={styles.systemsPlanet} src={systemsPlanet} alt="" />
          <img className={styles.projectsPlanet} src={projectsPlanet} alt="" />
        </div>

        <p className={styles.scrollHint}>ROLE PARA EXPLORAR</p>
      </div>
    </section>
  );
};

export default Hero;
