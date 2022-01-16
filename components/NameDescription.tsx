import React, { useCallback, useEffect, useState } from "react";
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
  const findescription = (find_name: string) => {return nameDescriptions.find(({name}) => name===find_name)}
  const createDescription = (your_name_description: string, AI_name_description: string) =>{
    return `This is a chat between a \${your_name} and \${AI_name}.\n\${your_name} ${your_name_description}.\n\${AI_name} ${AI_name_description}.`
  }
  return (
    <>
      <label>
        Your Name
        <input
          className={styles.name}
          type="text"
          list="names"
          value={your_name}
          onChange={(e) => {
            onChangeSet(setYour_name)(e);
            const your_name_description = findescription(e.currentTarget.value)?.description
            const AI_name_description = findescription(AI_name)?.description
            if(your_name_description !== undefined && AI_name_description !== undefined ){
              setPre_context(createDescription(your_name_description, AI_name_description))
            }
          }}
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
            const your_name_description = findescription(your_name)?.description
            const AI_name_description = findescription(e.currentTarget.value)?.description
            if(your_name_description !== undefined && AI_name_description !== undefined ){
              setPre_context(createDescription(your_name_description, AI_name_description))
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
