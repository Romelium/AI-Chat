import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { DonateContainer } from "../components/DonateContainer";
import { Chat } from "../components/Chat";
import ShareButtons from "../components/ShareButtons";

const url = "https://ai-chat.vercel.app/";
const title = "AI Chat - Open Source | Powered by GPT-j with 6 billion neurons";
const description =
  "Chat with an AI that's powered by GPT-j. Talk with it, set parameters, ask questions, and twist words";
const facebook_app_id = "4962116933806461";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
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

        <h3>Share</h3>
        <ShareButtons
          url={url}
          title={title}
          hashtag={"#AIChat"}
          description={description}
          facebook_app_id={facebook_app_id}
        />
      </main>

      <footer className={styles.footer}>
        <h3>Please Donate💖</h3>
        <DonateContainer />
      </footer>
    </div>
  );
};

export default Home;
