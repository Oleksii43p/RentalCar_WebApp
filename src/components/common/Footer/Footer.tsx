import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <p>Developer: Oleksii Mushtaiev 👾</p>
        <p>
          Contact me:
          <a href="mailto:student@notehub.app">thascarfaze@gmail.com</a>
        </p>
      </div>
      <div className={styles.content}>
        <p>© {new Date().getFullYear()} RentalCar. All rights reserved.</p>
      </div>
    </footer>
  );
}
