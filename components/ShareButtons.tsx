import React from "react";
import styles from "../styles/Home.module.css";
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

export default function ShareButtons({
  url,
  title,
  hashtag,
  description,
  facebook_app_id,
}: {
  url: string;
  title: string;
  hashtag?: string;
  description: string;
  facebook_app_id?: string;
}) {
  const titleDescription = `${title}.\n${description}`;
  return (
    <div className={styles.share}>
      <FacebookShareButton url={url} quote={titleDescription} hashtag={hashtag}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      {facebook_app_id ? (
        <FacebookMessengerShareButton url={url} appId={facebook_app_id}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      ) : null}
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
      <LivejournalShareButton url={url} title={title} description={description}>
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
  );
}
