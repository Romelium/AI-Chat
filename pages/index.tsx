import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { DonateButton } from "../components/DonateButton";
import { Chat } from "../components/Chat";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Open source website. Chat with an AI that's powered by GPT-j. Talk with it, set parameters, ask questions, and twist words"
        />
        <meta
          name="keywords"
          content="Chat, AI, GPT-j, Talk, set parameters, ask questions, twist words, change words"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Romelianism" />
        <link rel="icon" href="/ai-chat.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>AI Chat</h1>
        <h2> Open source website </h2>

        <p className={styles.description}>
          Chat with an AI that&apos;s powered by{" "}
          <a href="https://github.com/kingoflolz/mesh-transformer-jax.git">
            GPT-j
          </a>
          . Talk with it, set parameters, ask questions, and twist words
        </p>

        <Chat />

        <div className={styles.grid}>
          <a
            href="https://github.com/Romelianism/AI-Chat.git"
            target="_blank"
            className={styles.card}
            rel="noreferrer"
          >
            <h2>Source Code &rarr;</h2>
            <p>Give feed back and ideas of how to make this better.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <DonateButton />
      </footer>
    </div>
  );
};

export default Home;
