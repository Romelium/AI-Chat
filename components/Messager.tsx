import React from 'react';
import { Sender } from "./Sender";
import { Messages } from "./Messages";
import { Responder, EchoResponder } from "./Responder";
import ContentEditable from 'react-contenteditable'

interface MessagerProps {
  responder: Responder;
  text_to_speech: boolean;
  contenteditable: boolean;
  onAddMessage: (messages: string[]) => void;
}
export class Messager extends React.Component<MessagerProps, { messages: string[]; }> {
  constructor(props: MessagerProps) {
    super(props);
    this.state = {
      messages: Array<string>(),
    };
  }
  static defaultProps: MessagerProps = {
    responder: new EchoResponder(),
    text_to_speech: false,
    contenteditable: false,
    onAddMessage: () => { }
  };

  async addMessage(message: string) {
    let messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages: messages });
    try {
      const res = await this.props.responder.Response(messages);
      messages.push(res); //add string to the messages

      this.props.onAddMessage(messages);
      this.setState({ messages: messages });

      if (this.props.text_to_speech) {
        const msg = new SpeechSynthesisUtterance(res);
        window.speechSynthesis.speak(msg);
      }
    }
    catch {
      messages.pop();
      this.setState({ messages: messages });
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <Messages contenteditable={this.props.contenteditable} right={false} messages={this.state.messages} onChange={((i: number, e: React.FormEvent<HTMLDivElement>) => {
          const messages = this.state.messages.slice();
          messages[i] = e.currentTarget.innerText;
          this.setState({ messages: messages });
        }).bind(this)}></Messages>
        <Sender onSubmit={this.addMessage.bind(this)}></Sender>
      </>
    );
  }
}
