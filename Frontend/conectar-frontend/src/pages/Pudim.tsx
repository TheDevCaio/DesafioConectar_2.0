import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@/utils/auth';


export default function PudimPage() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Bem-vindo ao Mundo do Pudim</h1>
      <img
        src="https://www.receiteria.com.br/wp-content/uploads/pudim-de-leite-condensado.jpg"
        alt="Pudim delicioso"
        style={{ maxWidth: '500px', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
      />
      <p style={{ marginTop: '1rem' }}>
        Essa página é protegida e só pode ser acessada após o login. Aproveite esse pudim visual!
      </p>
    </div>
  );
}
