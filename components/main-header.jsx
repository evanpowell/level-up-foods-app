import Link from "next/link";

import LogoImg from "@/assets/logo.png";

import styles from "./main-header.module.css";
import Image from "next/image";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src={LogoImg} alt="A plate with food on it" priority />
        LevelUp Food
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
