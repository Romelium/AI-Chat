import Filter from 'bad-words'
import { interpolate } from "../utils/interpolate";

export class GPTj_Responder {
  context: string
  constructor(public preContext = '', public token_max_length = 100, public temperature = 1, public top_p = 0.9, public stop_sequence = '"', public filter_bad_words = true, public your_name = 'you', public GPTj_name = 'GPTj') { this.context = '' }
  Response(messages: string[]) {
    this.context = this.preContext
    console.log({context: this.context, preContext: this.preContext})
    for (let i = 0; i < messages.length - 2; i += 2) {
      const message = messages[i];
      const response = messages[i + 1];
      this.context += `${this.your_name} say "${message}"\n\n${this.GPTj_name} say "${response}"\n\n`;
    }
    this.context += `${this.your_name} say "${messages[messages.length - 1]}"\n\n${this.GPTj_name} say "`;
    const payload = {
      context: interpolate(this.context, { your_name: this.your_name, AI_name: this.GPTj_name }),
      token_max_length: this.token_max_length,
      temperature: this.temperature,
      top_p: this.top_p,
      stop_sequence: this.stop_sequence,
    };
    console.log('send: ', payload);
    return fetch('/api/gpt-j', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => {
      return res.json() as Promise<{ text: string; }>;
    }).then(data => {
      console.log('receive: ', data);
      let { text } = data;
      if(this.filter_bad_words){
        text = new Filter().clean(text)
      }
      return text.slice(text.length - 1) === '"' ? text.slice(0, -1) : text; // remove the stop_sequence character
    });
  }
}
