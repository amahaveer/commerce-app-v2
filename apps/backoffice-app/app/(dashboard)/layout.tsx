import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import SideBar from '@/components/organisms/SideBar';
import Language from '../../components/molecules/language/language';
import ProjectSwitcher from '@/components/projectSwitcher/projectSwitcher';
import { languages } from 'utils/languages';
import Box from '@mui/material/Box';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <Providers>
      <Box className="flex w-full h-[100vh] bg-white">
        <Box className="w-auto">
          <SideBar.Desktop />
        </Box>
        <Box className="flex flex-col min-w-0 flex-grow">
          <Box className="w-auto">
            <header className="shadow-navbar sticky top-0 z-30 min-h-14 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              {/* <MobileNav /> */}
              <div className="ml-8">
                <ProjectSwitcher/>
              </div>
              <div className="ml-2">
                <Language options={languages} placeholder={'en-US'} />
              </div>

              <div className="ml-auto">
                <User />
              </div>
            </header>
          </Box>
          <Box className="w-auto">{children}</Box>
        </Box>
      </Box>
    </Providers>
  );
}


