import styles from '../styles/Home.module.css';
import React from 'react';
import { Message } from "./Message";

interface MessagesProps {
  right: boolean,
  messages: string[],
  contenteditable: boolean,
  onChange: (index: number, event: React.FormEvent<HTMLDivElement>) => void
}
export class Messages extends React.Component<MessagesProps> {
  constructor(props: MessagesProps) {
    super(props);
  }
  static defaultProps: MessagesProps = {
    messages: Array<string>(),
    right: false,
    contenteditable: false,
    onChange: () => { },
  };
  render(): React.ReactNode {
    let right = this.props.right;
    let messagesElement = Array<JSX.Element>(this.props.messages.length);
    for (let i = 0; i < this.props.messages.length; i++) {
      messagesElement[i] = <Message right={right = !right} contenteditable={this.props.contenteditable} onChange={(e) => { this.props.onChange(i, e) }} key={i}>{this.props.messages[i]}</Message>;
    }
    return (
      <div className={styles.messages}>
        {messagesElement}
      </div>
    );
  }
}
