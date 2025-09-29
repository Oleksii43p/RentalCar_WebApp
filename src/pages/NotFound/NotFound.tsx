import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Link to="/" role="button" className={styles.button}>
        Back
      </Link>
    </div>
  );
};

export default NotFound;
