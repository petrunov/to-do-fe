import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.logo}>Simple ToDo</h1>
      </div>
    </main>
  );
}
