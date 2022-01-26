// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'
import { URLSearchParams } from 'url'
import { stringifyWithFloats } from "../../utils/stringifyWithFloats";

async function query(data: any) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
        headers: { Authorization: `Bearer ${process.env.hf_token}` },
        method: "POST",
        body: stringifyWithFloats({ temperature: 'float', top_p: 'float' })(data),
    }
  );
  const result = await response.json();
  return result;
}

type Data = {
  text: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ text: 'Method Not Allowed' })
    return
  }
  let {context, token_max_length, temperature, top_p, stop_sequence} = req.body as {
    context: string,
    token_max_length: number|String,
    temperature: number|String,
    top_p: number|String,
    stop_sequence: string,
  }

  //limits
  token_max_length = Math.min(250, Number(token_max_length))
  const maxCharLength = 512
  if(context.length > maxCharLength){
    context = context.slice(context.length-maxCharLength)
  }

  const params = {
    max_new_tokens: token_max_length,
    do_sample: true,
    temperature: Number(temperature),
    top_p: Number(top_p),
    return_full_text: false,
  }
  
  let response

  try {
    response = await query({inputs: context, parameters: params})
    return res.status(200).send({ text: response[0].generated_text.split(stop_sequence)[0] })
  }
  catch(error) {
    console.log(response, error)
    res.status(500).send({ text: `Errors:\n\n${response.error.join('\n\n')}` ?? "Sorry, the website is experiencing a server error right now.\nplease try again later." })
  }
}
