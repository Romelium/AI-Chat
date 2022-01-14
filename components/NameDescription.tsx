import React from "react";
import styles from "../styles/Home.module.css";
import { onChangeSet } from "../utils/onChangeSet";

interface nameDescription {
  name: string;
  description: string;
}

export function NameDescription({
  your_name,
  setYour_name,
  AI_name,
  setAI_name,
  pre_context,
  setPre_context,
  nameDescriptions,
}: {
  your_name: string;
  setYour_name: React.Dispatch<React.SetStateAction<string>>;
  AI_name: string;
  setAI_name: React.Dispatch<React.SetStateAction<string>>;
  pre_context: string;
  setPre_context: React.Dispatch<React.SetStateAction<string>>;
  nameDescriptions: nameDescription[];
}) {
  return (
    <>
      <label>
        Your Name
        <input
          className={styles.name}
          type="text"
          list="names"
          value={your_name}
          onChange={onChangeSet(setYour_name)}
        />
        <br />
      </label>
      <label>
        AI Name
        <input
          className={styles.name}
          type="text"
          list="names"
          value={AI_name}
          onChange={(e) => {
            onChangeSet(setAI_name)(e);
            const nameDescription = nameDescriptions.find(({name}) => name===e.currentTarget.value)
            if(nameDescription !== undefined){
              setPre_context(nameDescription.description)
            }
          }}
        />
        <br />
      </label>
      <datalist id="names">
        {nameDescriptions.map(function ({ name }, i) {
          return <option value={name} key={i} />;
        })}
      </datalist>
      <label htmlFor="GPTj_name">
        Description
        <textarea
          className={styles["context-description"]}
          value={pre_context}
          onChange={onChangeSet(setPre_context)}
        />
        <br />
      </label>
    </>
  );
}
