import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'

function Message({ children, right }: { children: string, right: boolean }) {
  return <div className={styles.message + ' ' + (right === true ? styles.right : '')}>{children}</div>
}

function Messages({ right, messages }: { right: boolean, messages: string[] }) {
  let messagesElement = Array<JSX.Element>()
  for (let i in messages) {
    messagesElement.push(<Message right={right = !right} key={i}>{messages[i]}</Message>);
  }
  return (
    <div className={styles.messages}>
      {messagesElement}
    </div>
  )
}
function Sender({ onSubmit }: { onSubmit: (message: string) => void; }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSubmit(message)
    console.log("Sent: " + message)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  )
}

class Messager extends React.Component<{}, { messages: string[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      messages: Array<string>(),
    }
  }

  async AddMessage(message: string) {
    let messages = this.state.messages.slice();
    messages.push(message); //add string to the messages

    //basic demo of random words
    const data = await fetch('https://random-word-api.herokuapp.com/word?number=10')
      .then(res => res.json() as Promise<Array<string>>)
    console.log(data)
    messages.push(data.join(' '))

    this.setState({
      messages: messages
    })
  }

  render(): React.ReactNode {
    return (
      <div>
        <Messages right={false} messages={this.state.messages}></Messages>
        <Sender onSubmit={this.AddMessage.bind(this)}></Sender>
      </div>
    )
  }
}

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

        <Messager></Messager>

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
