import styles from '../styles/Home.module.css';
import React, { useState } from 'react';


export function Sender({ onSubmit }: { onSubmit: (message: string) => void; }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(message);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
