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
        <h1 className={styles.title}>
          <strong>AI Chat is currently broken due to connection errors</strong>
        </h1>
        <h2> You can use AI Chat to </h2>
        <ul>
          <li>
            <h3>Talk to God about your dog</h3>
          </li>
          <li>
            <h3>Ask Donald Trump why he is bald</h3>
          </li>
          <li>
            <h3>Talk back against your parents</h3>
          </li>
          <li>
            <h3>Blackmail the devil that he is gay</h3>
          </li>
        </ul>
        <h2>At the foreseeable future it would be still down</h2>
        <h2>
          but it could be fixed by the time that your seeing this so try to chat
          to check if it works
        </h2>

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
