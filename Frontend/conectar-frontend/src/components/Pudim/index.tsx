import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { useRouter } from 'next/router';

export default function PudimPage() {
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPudim = async () => {
      try {
        const res = await fetch('https://www.pudim.com.br/');
        const text = await res.text();
        setHtml(text);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar o site do pudim', err);
        setHtml('<p>Erro ao carregar o conteúdo.</p>');
        setLoading(false);
      }
    };

    fetchPudim();
  }, [router]);

  if (loading) return <p>Carregando conteúdo do pudim...</p>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ padding: 24 }}
    />
  );
}