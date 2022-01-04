import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Chat</title>
        <meta name="description" content="Chat with an AI-powered by GPT-j. Talk with it, set parameters, and ask questions" />
        <link rel="icon" href="/ai-chat.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Chat
        </h1>

        <p className={styles.description}>
        Chat with an AI-powered by{' '} <a href="https://github.com/kingoflolz/mesh-transformer-jax.git">GPT-j</a>. Talk with it, set parameters, and ask questions.
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/Romelianism/AI-Chat.git" className={styles.card}>
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
