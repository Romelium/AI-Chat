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
  console.log(req.body)
  const body = req.body as {
    context: string,
    token_max_length: number,
    temperature: number,
    top_p: number,
    stop_sequence: string,
  }
  const payload = {
    context: body.context,
    token_max_length: body.token_max_length.toString(),
    temperature: body.temperature.toString(),
    top_p: body.top_p.toString(),
    stop_sequence: body.stop_sequence,
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
