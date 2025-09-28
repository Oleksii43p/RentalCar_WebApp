import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import appLogo from '../../../assets/Logo.svg';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.mainAppHeader}>
      {/* 1. Блок Логотипу */}
      <Link to="/" className={styles.logoLinkWrapper}>
        <img src={appLogo} alt="Car Rental Logo" className={styles.appLogo} />
      </Link>

      {/* 2. Блок Навігації */}
      <nav className={styles.mainNavigation}>
        {/* Посилання 1: Home */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}
        >
          Home
        </NavLink>
        {/* Посилання 2: Catalog */}
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}
        >
          Catalog
        </NavLink>
        {/* Посилання 3: Favorites */}
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
