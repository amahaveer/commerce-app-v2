import Cookies from 'js-cookie';

export const refreshToken = async (response: any) => {
    try {
        if (response.error.error === "Unauthorized: Invalid token") {
            const url = "http://localhost:4000/generate-okta-token";
            const res = await fetch(url);
            const data = await res.json();
            console.log("refreshToken====>", data)
            Cookies.set("hello token for sdk", "testing", {
                expires: 7, 
                path: '/',
            });
        }
    } catch (error) {
        
    }
}
