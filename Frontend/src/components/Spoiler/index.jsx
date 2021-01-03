import React from 'react'
import styles from './styles.module.css';

export function Spoiler({ content, visible }) {
  return (
    <div>
      <p className={`${styles.spoiler__content} ${visible ? styles.visible : ""}`}>{content}</p>
    </div>
  )
}