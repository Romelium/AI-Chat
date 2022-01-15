import Script from "next/script";
import React from "react";
import styles from "../styles/Home.module.css";

export function DonateContainer() {
  return (
    <div className={styles['donate-container']}>
      <div id="donate-button"></div>
      <Script
        src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        charSet="UTF-8" strategy="beforeInteractive" />
      <Script id="donate-button-script">
        {`
          PayPal.Donation.Button({
          env:'production',
          hosted_button_id:'LHV6GH2ZY5BSW',
          image: {
          src:'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
          alt:'Donate with PayPal button',
          title:'PayPal - The safer, easier way to pay online!',
          }
          }).render('#donate-button');
        `}
      </Script>
    </div>
  );
}
