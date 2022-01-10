import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { GPTj_Responder } from '../components/GPTj_Responder'
import { Messager } from '../components/Messager'
import styles from '../styles/Home.module.css'
import { interpolate } from '../utils/interpolate'
import { onChangeSet } from '../utils/onChangeSet'

function Chat() {
  const [your_name, setYour_name] = useState('you');
  const [AI_name, setAI_name] = useState('gpt-j');
  const [pre_context, setPre_context] = useState("This is a chat between a ${your_name} and ${ai_name}. ${ai_name} is very nice and empathetic");
  const [temperature, setTemperature] = useState(1);
  const [top_p, setTop_p] = useState(1);
  const [text_to_speech, setText_to_speech] = useState(true);
  const gptj_Responder = new GPTj_Responder();
  gptj_Responder.preContext = interpolate(pre_context, { your_name: your_name, ai_name: AI_name }) + '\n\n'
  gptj_Responder.your_name = your_name
  gptj_Responder.GPTj_name = AI_name
  gptj_Responder.temperature = temperature
  gptj_Responder.top_p = top_p
  return (
    <div className={styles.game}>
      <Messager contenteditable={true} responder={gptj_Responder} text_to_speech={text_to_speech}></Messager>

      <label>Your Name
        <input className={styles.name} type="text" list="names" value={your_name} onChange={onChangeSet(setYour_name)} />
        <br />
      </label>
      <label>AI Name
        <input className={styles.name} type="text" list="names" value={AI_name} onChange={onChangeSet(setAI_name)} />
        <br />
      </label>
      <datalist id="names">
        <option>you</option>
        <option>he</option>
        <option>she</option>
        <option>god</option>
        <option>gpt-j</option>
        <option>gpt-3</option>
        <option>obama</option>
        <option>trump</option>
        <option>the devil</option>
        <option>the president</option>
        <option>the scientist</option>
        <option>the physicist</option>
        <option>the mathematician</option>
      </datalist>
      <label htmlFor="GPTj_name">Description
        <textarea className={styles["context-description"]} value={pre_context} onChange={onChangeSet(setPre_context)} />
        <br />
      </label>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Extra Settings</button>
        <div className={styles["dropdown-content"]}>
          <label>temperature
            <input type="number" max={1} min={0} step={0.01} value={temperature} onChange={onChangeSet(setTemperature)} />
            <br />
          </label>
          <label>top_p
            <input type="number" max={1} min={0} step={0.01} value={top_p} onChange={onChangeSet(setTop_p)} />
            <br />
          </label>
          <label>text to speech
            <input type="checkbox" checked={text_to_speech} onChange={e => setText_to_speech(e.currentTarget.checked)} />
            <br />
          </label>
        </div>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat</title>
        <meta name="description" content="Chat with an AI-powered by GPT-j. Talk with it, set parameters, ask questions, and twist words" />
        <link rel="icon" href="/ai-chat.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Chat
        </h1>

        <p className={styles.description}>
          Chat with an AI-powered by{' '} <a href="https://github.com/kingoflolz/mesh-transformer-jax.git">GPT-j</a>. Talk with it, set parameters, ask questions, and twist words
        </p>

        <Chat></Chat>

        <div className={styles.grid}>
          <a href="https://github.com/Romelianism/AI-Chat.git" target="_blank" className={styles.card} rel="noreferrer">
            <h2>Source Code &rarr;</h2>
            <p>Give feed back and ideas of how to make this better.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
