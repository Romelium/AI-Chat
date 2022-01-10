import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'

function Message({ children, right }: { children: string, right: boolean }) {
  return <div className={styles.message + ' ' + (right === true ? styles.right : '')}>{children}</div>
}
interface MessagesProps {
  right: boolean, messages: string[]
}
class Messages extends React.Component<MessagesProps, { messages: string[] }>  {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {
      messages: props.messages
    };
  }
  static defaultProps: MessagesProps = {
    messages: Array<string>(),
    right: false,
  }
  AddMessage(message: string) {
    let messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages: messages })
  }
  render(): React.ReactNode {
    let right = this.props.right
    let messagesElement = Array<JSX.Element>(this.props.messages.length)
    for (let i in this.props.messages) {
      messagesElement[i] = <Message right={right = !right} key={i}>{this.props.messages[i]}</Message>;
    }
    return (
      <div className={styles.messages}>
        {messagesElement}
      </div>
    )
  }
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

abstract class Responder {
  abstract Response(message: string): Promise<string>
}
class EchoResponder {
  Response(message: string) {
    return (async (message: string) => { return 'Echo: ' + message })(message)
  }
}
class GPTj_Responder {
  constructor(public context = '', public token_max_length = 100, public temperature = 1, public top_p = 0.9, public stop_sequence = '"', public your_name = 'you', public GPTj_name = 'GPTj') { }
  Response(message: string) {
    this.context += `${this.your_name} says "${message}"\n\n${this.GPTj_name} says "`
    const payload = {
      context: this.context,
      token_max_length: this.token_max_length,
      temperature: this.temperature,
      top_p: this.top_p,
      stop_sequence: this.stop_sequence,
    };
    return fetch('/api/gpt-j', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => {
      return res.json() as Promise<{ text: string }>
    }).then(data => {
      return data.text.slice(0, -1); // remove the stop_sequence character
    })
  }
}


interface MessagerProps {
  responder: Responder,
  text_to_speech: boolean,
  onAddMessage: (messages: string[]) => void
}
class Messager extends React.Component<MessagerProps, { messages: string[] }> {
  constructor(props: MessagerProps) {
    super(props);
    this.state = {
      messages: Array<string>(),
    }
  }
  static defaultProps: MessagerProps = {
    responder: new EchoResponder(),
    text_to_speech: false,
    onAddMessage: () => { }
  }

  async addMessage(message: string) {
    let messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages: messages })
    try {
      const res = await this.props.responder.Response(message)
      messages.push(res); //add string to the messages

      this.props.onAddMessage(messages)
      this.setState({ messages: messages })

      if (this.props.text_to_speech) {
        const msg = new SpeechSynthesisUtterance(res);
        window.speechSynthesis.speak(msg);
      }
    }
    catch {
      messages.pop();
      this.setState({ messages: messages })
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <Messages right={false} messages={this.state.messages}></Messages>
        <Sender onSubmit={this.addMessage.bind(this)}></Sender>
      </>
    )
  }
}

function onChangeSet(setState: React.Dispatch<React.SetStateAction<any>>) {
  return (e: React.ChangeEvent<any>) => {
    setState(e.currentTarget.value);
  }
}
function interpolate(string: string, params: any): string {
  const names = Object.keys(params);
  const vals = Object.values(params);
  try {
    return new Function(...names, `return \`${string}\`;`)(...vals)
  } catch {
    return string
  }
}

function Game() {
  const [your_name, setYour_name] = useState('you');
  const [AI_name, setAI_name] = useState('gpt-j');
  const [pre_context, setPre_context] = useState("This is a chat between a ${your_name} and ${ai_name}. ${ai_name} is very nice and empathetic");
  const [context, setContext] = useState('');
  const [temperature, setTemperature] = useState(0.75);
  const [top_p, setTop_p] = useState(1);
  const [text_to_speech, setText_to_speech] = useState(true);
  const gptj_Responder = new GPTj_Responder();
  gptj_Responder.context = (context == '' ? interpolate(pre_context, { your_name: your_name, ai_name: AI_name }) + '\n\n' : '') + context
  gptj_Responder.your_name = your_name
  gptj_Responder.GPTj_name = AI_name
  gptj_Responder.temperature = temperature
  gptj_Responder.top_p = top_p
  console.log(text_to_speech)
  return (
    <div className={styles.game}>
      <Messager responder={gptj_Responder} text_to_speech={text_to_speech} onAddMessage={() => setContext(gptj_Responder.context)}></Messager>

      <label>Your Name
        <input className={styles.name} type="text" value={your_name} onChange={onChangeSet(setYour_name)} />
        <br />
      </label>
      <label>AI Name
        <input className={styles.name} type="text" value={AI_name} onChange={onChangeSet(setAI_name)} />
        <br />
      </label>
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

        <Game></Game>

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
