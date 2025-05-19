import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('https://www.pudim.com.br/');
    const html = await response.text();
    res.status(200).send(html);
  } catch (err) {
    console.error('Erro ao buscar pudim:', err);
    res.status(500).json({ error: 'Erro ao buscar conteúdo de pudim.' });
  }
}