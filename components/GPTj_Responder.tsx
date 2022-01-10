export class GPTj_Responder {
  constructor(public context = '', public token_max_length = 100, public temperature = 1, public top_p = 0.9, public stop_sequence = '"', public your_name = 'you', public GPTj_name = 'GPTj') { }
  Response(message: string) {
    this.context += `${this.your_name} says "${message}"\n\n${this.GPTj_name} says "`;
    const payload = {
      context: this.context,
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
      const { text } = data;
      this.context += text;
      this.context += (text.slice(-1) === this.stop_sequence ? '' : this.stop_sequence); // add if no stop_sequence in the end
      this.context += '\n\n';
      return text.slice(0, -1); // remove the stop_sequence character
    });
  }
}
