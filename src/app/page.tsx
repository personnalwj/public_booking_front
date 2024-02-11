import styles from "./page.module.css";
import LoginBtn from '../components/login-btn';

export default function Home() {
  return (
    <main className={styles.main}>
        <LoginBtn />
    </main>
  );
}
