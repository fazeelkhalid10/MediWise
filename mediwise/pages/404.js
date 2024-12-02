import Link from "next/link";
import styles from "../styles/404.module.css";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className={styles.buttons}>
          <Link href="/" className={styles.button}>
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
