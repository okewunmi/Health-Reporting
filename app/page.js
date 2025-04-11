
import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.Logo_box}>
        <Link href="/">
        <Image
          className={styles.logo}
          src="/logo2.png"
          alt="Next.js logo"
          width={280}
          height={280}
          priority
        />
        </Link>
      
      </div>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/medical.svg"
          alt="Next.js logo"
          width={350}
          height={300}
          priority
        />

        <div className={styles.box}>
          <h3 className={styles.head}>The Cadet Health Reporting System (CHRS)</h3>
          <div className={styles.note}>
            <p className={styles.p}>As a cadet, your health and well-beign are our top priority.</p>
            <p> Please sign in or sign up to access the system and start reporting your health status today</p>
          </div>

          <div className={styles.btns}>
            <Link className={styles.btns_1} href='/signIn'>Sign In</Link>
            <Link className={styles.btns_2} href='/signUp'>Sign Up</Link>
          </div>
        </div>
      </main>



    </div>
  );
}
