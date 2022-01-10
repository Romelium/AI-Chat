import styles from '../styles/Home.module.css';
import React from 'react';
import { Message } from "./Message";

interface MessagesProps {
  right: boolean; messages: string[];
}
export class Messages extends React.Component<MessagesProps, { messages: string[]; }> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {
      messages: props.messages
    };
  }
  static defaultProps: MessagesProps = {
    messages: Array<string>(),
    right: false,
  };
  AddMessage(message: string) {
    let messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages: messages });
  }
  render(): React.ReactNode {
    let right = this.props.right;
    let messagesElement = Array<JSX.Element>(this.props.messages.length);
    for (let i in this.props.messages) {
      messagesElement[i] = <Message right={right = !right} key={i}>{this.props.messages[i]}</Message>;
    }
    return (
      <div className={styles.messages}>
        {messagesElement}
      </div>
    );
  }
}
