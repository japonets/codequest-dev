import React from 'react';
import styles from './Navbar.module.css'


const NavBar: React.FC = () => {

    
  return (
    <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
            <img src="src/assets/logo.svg" alt="Logo" className={styles.logo} />
            <span className={styles.title}>CODEQUEST</span>
        </div>

        <div className={styles.navLinks}>
            <a href="#trilhas" className={styles.navLink}>Trilhas</a>
            <a href="#jornada" className={styles.navLink}>Jornada</a>
            <a href="#modulos" className={styles.navLink}>Módulos</a>
            <button className={styles.navButton}>Começar agora</button>
        </div>
    </nav>
  );
};

export default NavBar;