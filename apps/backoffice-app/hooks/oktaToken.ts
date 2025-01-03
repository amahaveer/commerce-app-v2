import CookieService from 'service/cookie';

const useOktaToken = () => {
  async function getOktaToken() {
    const oktaToken = CookieService.getOktaToken();
    const oktaExpiry: any = CookieService.getOktaExpiry();

    if (!oktaToken || Date.now() > oktaExpiry) {
      await refreshOktaToken();
    }
    return oktaToken;
  }

  async function refreshOktaToken() {
    const response = await fetch('http://localhost:4000/generate-okta-token', {
      method: 'POST'
    });
    const data = await response.json();
    const oktaToken = data.token;
    const tokenExpiryTime = Date.now() + 3600 * 1000;

    // Save token and expiry time in sessionStorage
    sessionStorage.setItem('oktaToken', oktaToken);
    sessionStorage.setItem('tokenExpiryTime', tokenExpiryTime.toString());
  }

  return { getOktaToken, refreshOktaToken };
};

export default useOktaToken;
