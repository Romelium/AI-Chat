import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { DonateContainer } from "../components/DonateContainer";
import { Chat } from "../components/Chat";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LineIcon,
  LineShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
  HatenaIcon,
  HatenaShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  PocketIcon,
  PocketShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
} from "next-share";

const url = "https://ai-chat.vercel.app/";
const title = "AI Chat - Open Source | Powered by GPT-j with 6 billion neurons";
const description =
  "Chat with an AI that's powered by GPT-j. Talk with it, set parameters, ask questions, and twist words";
const facebook_app_id = "4962116933806461";
const titleDescription = `${title}.\n${description}`;

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
        <div className={styles.share}>
          <FacebookShareButton
            url={url}
            quote={titleDescription}
            hashtag={"#AIChat"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={url} appId={facebook_app_id}>
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <LineShareButton url={url} title={title}>
            <LineIcon size={32} round />
          </LineShareButton>
          <PinterestShareButton url={url} media={titleDescription}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TumblrShareButton url={url} title={title}>
            <TumblrIcon size={32} round />
          </TumblrShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <ViberShareButton url={url} title={title}>
            <ViberIcon size={32} round />
          </ViberShareButton>
          <WhatsappShareButton url={url} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <MailruShareButton url={url} title={title}>
            <MailruIcon size={32} round />
          </MailruShareButton>
          <LivejournalShareButton
            url={url}
            title={title}
            description={description}
          >
            <LivejournalIcon size={32} round />
          </LivejournalShareButton>
          <WorkplaceShareButton url={url} quote={titleDescription}>
            <WorkplaceIcon size={32} round />
          </WorkplaceShareButton>
          <PocketShareButton url={url} title={title}>
            <PocketIcon size={32} round />
          </PocketShareButton>
          <InstapaperShareButton url={url} title={title}>
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
          <HatenaShareButton url={url} title={title}>
            <HatenaIcon size={32} round />
          </HatenaShareButton>
          <EmailShareButton url={url} subject={title} body={description}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </main>

      <footer className={styles.footer}>
        <h3>Please Donate💖</h3>
        <DonateContainer />
      </footer>
    </div>
  );
};

export default Home;
