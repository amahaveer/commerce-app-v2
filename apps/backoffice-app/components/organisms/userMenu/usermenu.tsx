'use client';
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from 'context/application.context';
import CookieService from 'service/cookie';

function UserMenu() {

  const { userData } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    localStorage.clear();
    CookieService.clearCookies();
    router.replace("/login")
  }
  const getFirstLetter = (firstName: string, lastName: string) => {
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <div className="user-initials bg-blue-200 rounded-full w-10 h-10 flex justify-center items-center mr-4">
          {userData
            ? getFirstLetter(userData?.firstName, userData?.lastName)
            : 'GG'}
        </div>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            width: 400,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="flex items-center space-x-3 p-4">
          <div className="user-initials bg-blue-200 rounded-full w-10 h-10 flex justify-center items-center mr-4">
            {userData
              ? getFirstLetter(userData?.firstName, userData?.lastName)
              : 'GG'}
          </div>
          <div>
            <Typography className="font-medium text-gray-900">
              {userData?.firstName && userData?.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : 'guest'}
            </Typography>
            <Typography className="text-sm text-gray-500">
              {userData?.email ?? 'guest@example.com'}
            </Typography>
          </div>
        </div>
        <Divider />
        <MenuItem>
          <Link href={'/account/profile'}>
            <Typography variant="body1">My Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={'/account/organizations'}>
            <Typography variant="body1">Manage organizations & teams</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={'/account/projects'}>
            <Typography variant="body1">Manage projects</Typography>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography variant="body1">Privacy Policy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Support</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          {userData ? (
            <span onClick={onLogout}>Logout</span>
          ) : (
            <Link href="/login">Log In</Link>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
export default UserMenu
