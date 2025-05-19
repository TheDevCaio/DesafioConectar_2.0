import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { PudimSection, PudimCard } from './style';

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
        const res = await fetch('/api/pudim');
        const text = await res.text();
        setHtml(text);
      } catch (err) {
        console.error('Erro ao buscar o site do pudim', err);
        setHtml('<p>Erro ao carregar o conteúdo.</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchPudim();
  }, [router]);

  if (loading) return <p>Carregando conteúdo do pudim...</p>;

  return (
    <PudimSection>
      <PudimCard>
        <img src="/images/pudim1.jpg" alt="Pudim de leite" />
        <h3>Pudim de Leite</h3>
        <p>Clássico, cremoso e irresistível.</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </PudimCard>
    </PudimSection>
  );
}