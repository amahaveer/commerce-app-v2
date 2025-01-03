import Cookies from 'js-cookie';


const UNIFIED_TOKEN = 'unifiedAccessToken';
const OKTA_TOKEN = 'oktaToken';
const OKTA_EXPIRY = 'oktaExpiry'

const CookieService = {

    setUnifiedToken: (value: string) => {
        Cookies.set(UNIFIED_TOKEN, value, {
            expires: 7, 
            path: '/',
        });
    },

    clearCookies: () => {
        Cookies.remove(UNIFIED_TOKEN);
    },

    getUnifiedToken: () =>{
        return Cookies.get(UNIFIED_TOKEN)
    },

    getOktaToken: () => {
        return Cookies.get(OKTA_TOKEN);
    },

    getOktaExpiry: () => {
        return Cookies.get(OKTA_EXPIRY)
    }
}

export default CookieService;