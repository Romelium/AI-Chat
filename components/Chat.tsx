import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { interpolate } from "../utils/interpolate";
import { GPTj_Responder } from "./GPTj_Responder";
import { Messager } from "./Messager";
import { onChangeSet } from "../utils/onChangeSet";
import { NameDescription } from "./NameDescription";

export function Chat() {
  const [your_name, setYour_name] = useState("you");
  const [AI_name, setAI_name] = useState("gpt-j");
  const [pre_context, setPre_context] = useState(
    "This is a chat between a ${your_name} and ${AI_name}.\n${your_name} are a person.\n${AI_name} is very nice and funny."
  );
  const [temperature, setTemperature] = useState(1);
  const [top_p, setTop_p] = useState(1);
  const [text_to_speech, setText_to_speech] = useState(true);
  const [filter_bad_words, setFilter_bad_words] = useState(true);
  const gptj_Responder = new GPTj_Responder();
  gptj_Responder.preContext =
    interpolate(pre_context, { your_name: your_name, ai_name: AI_name }) +
    "\n\n";
  gptj_Responder.your_name = your_name;
  gptj_Responder.GPTj_name = AI_name;
  gptj_Responder.temperature = temperature;
  gptj_Responder.top_p = top_p;
  gptj_Responder.filter_bad_words = filter_bad_words;
  return (
    <div className={styles.game}>
      <Messager
        contenteditable={true}
        responder={gptj_Responder}
        text_to_speech={text_to_speech}
      />
      <NameDescription
        your_name={your_name}
        setYour_name={setYour_name}
        AI_name={AI_name}
        setAI_name={setAI_name}
        pre_context={pre_context}
        setPre_context={setPre_context}
        nameDescriptions={
          [
            {name: 'you', description: 'are a person'},
            {name: 'he', description: 'is a good person and hard worker'},
            {name: 'she', description: 'is a good person and hard worker'},
            {name: 'god', description: 'is supreme being, creator, and principal object of faith'},
            {name: 'gpt-j', description: 'is very nice and funny'},
            {name: 'obama', description: 'is an American politician, lawyer, and author who served as the 44th president of the United States'},
            {name: 'trump', description: 'is an American politician, media personality, and businessman who served as the 45th president of the United States'},
            {name: 'the devil', description: 'is the personification of evil as it is conceived in various cultures and religious traditions'},
            {name: 'the president', description: 'is a very prominent figure in the country and nice to the people that support it'},
            {name: 'the scientist', description: 'is a person who conducts scientific research to advance knowledge in an area of interest'},
            {name: 'the physicist', description: 'is a scientist who specializes in the field of physics, which encompasses the interactions of matter and energy at all length and time scales in the physical universe'},
            {name: 'the mathematician', description: 'This is a chat between a ${your_name} and ${ai_name}. ${ai_name} is someone who uses an extensive knowledge of mathematics in their work, typically to solve mathematical problems'},
          ]
        }
      />
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Extra Settings</button>
        <div className={styles["dropdown-content"]}>
          <label>
            temperature
            <input
              type="number"
              max={1}
              min={0}
              step={0.01}
              value={temperature}
              onChange={onChangeSet(setTemperature)}
            />
            <br />
          </label>
          <label>
            top_p
            <input
              type="number"
              max={1}
              min={0}
              step={0.01}
              value={top_p}
              onChange={onChangeSet(setTop_p)}
            />
            <br />
          </label>
          <label>
            text to speech
            <input
              type="checkbox"
              checked={text_to_speech}
              onChange={(e) => setText_to_speech(e.currentTarget.checked)}
            />
            <br />
          </label>
          <label>
            filter bad words
            <input
              type="checkbox"
              checked={filter_bad_words}
              onChange={(e) => setFilter_bad_words(e.currentTarget.checked)}
            />
            <br />
          </label>
        </div>
      </div>
    </div>
  );
}
