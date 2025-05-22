import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@/utils/auth';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/GlobalStyles';
import PudimPage from '@/components/Pudim';
import { Navbar } from '@/components/Navbar';



export default function Pudim() {
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
    <Container> 
    <Navbar/>  
    <PudimPage/>
    <Footer/>
 c    </Container>
  );
}
