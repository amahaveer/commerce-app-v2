'use client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import {
  loginToCommercetool,
  loginToUnifiedApi,
  loginUser
} from '../api/login.api';
import { useRouter } from 'next/navigation';
import Loader from '@/components/atoms/loader';
import { toast } from 'react-toastify';
import CookieService from 'service/cookie';
import { sdk } from '@/sdk/CommercetoolsSDK';
import useOktaToken from 'hooks/oktaToken';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refreshOktaToken } = useOktaToken();

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const router = useRouter();

  const loginCommerceTool = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const credentials = { email: username, password };
      // await loginToCommercetool(credentials)
      const unifiedResult = await loginToUnifiedApi(credentials);
      CookieService.setUnifiedToken(unifiedResult.accessToken);
      refreshOktaToken();
      router.push('/');
    } catch (error) {
      toast.error('Invalid Credentials');
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const credentials = { email: username, password };

      const response = await loginUser(credentials);
      const token = response.accessToken;
      localStorage.setItem('accessToken', token);
      // const userData = await userDetails();
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      setLoading(false);
      console.error('Login failed', error);
    }
  };
  return (
    <>
      <Box className="min-h-screen flex justify-center items-start md:items-center px-8 w-full flex-col">
        <Box sx={{ mb: 4 }}>
          <img
            src="//www.royalcyber.com/wp-content/uploads/2018/04/Royal-Cyber-Logo.svg"
            alt="royal cyber"
            className="lazyloaded"
            data-ll-status="loaded"
            height={170}
            width={170}
          />
        </Box>
        {loading ? <Loader /> : null}
        <Card
          sx={{
            width: '100%',
            maxWidth: 550,
            p: 2,
            border: 'solid 1px'
          }}
          className="border-borderGrey"
        >
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="left"
            >
              <Box textAlign="left" sx={{ margin: 0 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: 'var(--font-size-24, 1.5rem)',
                    lineHeight: 'var(--line-height-60, 2.125rem)',
                    fontWeight: 'var(--font-weight-600, 600)'
                  }}
                  className="text-customBlue-periwinkle"
                >
                  Sign in to the Back Office Data Center
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    fontSize: 'var(--font-size-16, 1rem)',
                    lineHeight: 'var(--line-height-60, 2.125rem)'
                  }}
                >
                  New to the Back Office Data Center?{' '}
                  <Link href="/login/choose" className="text-loginlinkBlue">
                    Create new Account
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ width: '100%' }}>
                <form onSubmit={loginCommerceTool}>
                  <Box mt={2}>
                    <Typography
                      variant="body1"
                      component="label"
                      htmlFor="email"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      Email<em style={{ color: 'red' }}>*</em>
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      variant="outlined"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          height: '40px'
                        }
                      }}
                      className="bg-customBlue-lavenderMist"
                    />
                  </Box>
                  <Box mt={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body1"
                        component="label"
                        htmlFor="password"
                        sx={{ display: 'block', mb: 1 }}
                      >
                        Password<em style={{ color: 'red' }}>*</em>
                      </Typography>
                      <Button
                        sx={{
                          whiteSpace: 'nowrap',
                          fontSize: '14px',
                          textTransform: 'none',
                          color: '#5050BE'
                        }}
                        onClick={handleClickShowPassword}
                        startIcon={
                          showPassword ? <VisibilityOff /> : <Visibility />
                        }
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        sx={{
                          padding: '0',
                          '.MuiOutlinedInput-root': {
                            height: '40px'
                          }
                        }}
                        className="bg-customBlue-lavenderMist"
                      />
                    </Box>
                  </Box>
                  <Box
                    mt={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link
                      href="/login/forgot"
                      className="text-customBlue-periwinkle"
                      sx={{ mr: 4 }}
                    >
                      Forgot password
                    </Link>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        height: '40px',
                        textTransform: 'none'
                      }}
                      className="bg-customBlue-brightUltramarine"
                    >
                      {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </Box>
                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}
                </form>
                <Box mt={4}>
                  <hr />
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 4,
                      fontSize: 'var(--font-size-16, 1rem)',
                      lineHeight: 'var(--line-height-60, 2.125rem)'
                    }}
                  >
                    You can also sign in with{' '}
                    <Link
                      href="/login/sso?reason=user"
                      className="text-customBlue-periwinkle"
                    >
                      Single Sign-On (SSO)
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            sx={{ width: '100%' }}
            mb={2}
            mt={8}
          >
            2024 © RoyalCyber
          </Typography>
        </Box>
      </Box>
    </>
  );
}
