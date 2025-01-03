import { auth, signOut } from '@/lib/auth';
import UserMenu from '../../components/organisms/userMenu/usermenu';

export async function User() {
  
  return <UserMenu  />;
}
