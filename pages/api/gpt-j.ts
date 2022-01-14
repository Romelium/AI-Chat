// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'
import { URLSearchParams } from 'url'

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
    token_max_length: number,
    temperature: number,
    top_p: number,
    stop_sequence: string,
  }

  //limits
  token_max_length = Math.min(512, token_max_length)
  const maxCharLength = 5000 - token_max_length*3
  if(context.length > maxCharLength){
    context = context.slice(context.length-maxCharLength)
  }

  const payload = {
    context: context,
    token_max_length: token_max_length.toString(),
    temperature: temperature.toString(),
    top_p: top_p.toString(),
    stop_sequence: stop_sequence,
  }
  const url = new URL('http://api.vicgalle.net:5000/generate')
  url.search = new URLSearchParams(payload).toString();

  fetch(url.toString(), { method: "POST"})
    .then(res => {
      return res.json() as Promise<{
        compute_time: number,
        model: string,
        prompt: string,
        stop_sequence: string,
        temperature: 1,
        text: string,
        token_max_length: number,
        top_p: number,
      }>
    })
    .then(data => {
      res.status(200).send({ text: data.text })
    })
}
