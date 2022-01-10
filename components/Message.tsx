import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'


export function Message({ children, right, contenteditable = false, onChange = () => { } }: { children: string, right: boolean, contenteditable: boolean, onChange: (event: ContentEditableEvent) => void }) {
  const [html, setHtml] = useState(children);
  const handleChange = (evt: ContentEditableEvent) => {
    setHtml(evt.target.value);
    onChange(evt)
  };
  return <ContentEditable
    html={children}
    disabled={!contenteditable}
    onChange={handleChange}
    className={styles.message + ' ' + (right === true ? styles.right : '')
    }></ContentEditable>;
}