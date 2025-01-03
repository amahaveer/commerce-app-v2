
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import CookieService from 'service/cookie';
// import { CookieService } from '@/lib/cookieService';


interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();

  // useEffect(() => {
  //   const token = CookieService.getCookie('__q_state_KCvexG5JgVh2E54r');

  //   if (!token) {
  //     router.push('/login');
  //   }
  // }, [router]);

  return <>{children}</>;
};
