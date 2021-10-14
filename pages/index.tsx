import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bellshade</title>
        <meta name="description" content="Contoh md to html" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home Bellshade</h1>

        <div className={styles.grid}>
          <Link href="/html">
            <a className={styles.card}>
              <h2>HTML &rarr;</h2>
              <p>Halaman Materi HTML</p>
            </a>
          </Link>
          <Link href="/css">
            <a className={styles.card}>
              <h2>CSS &rarr;</h2>
              <p>Halaman Materi CSS</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
