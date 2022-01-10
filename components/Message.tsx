import styles from '../styles/Home.module.css';
import React from 'react';


export function Message({ children, right }: { children: string; right: boolean; }) {
  return <div className={styles.message + ' ' + (right === true ? styles.right : '')}>{children}</div>;
}
