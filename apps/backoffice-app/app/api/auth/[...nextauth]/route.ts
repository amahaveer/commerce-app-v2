// src/app/api/auth/[...nextauth]/route.ts

import { httpClient } from "app/api/httpClient";
import { BASE_URL } from "app/api/path";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from 'next/server';

const LOGIN_URL = `${BASE_URL}/auth/login`;

// export const authOptions: any = {
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 try {
//                     const response = await httpClient.post(LOGIN_URL, {
//                         body: {
//                             username: credentials.username,
//                             password: credentials.password,
//                         },
//                     });

//                     const user = response.data.user; 
//                     const accessToken = response.data.accessToken; 

//                     // If no error and we have user data, return it
//                     if (user && accessToken) {
//                         // Set the token in an HTTP-only cookie
//                         const res = NextResponse.json({ message: 'Logged in successfully' });
//                         res.cookies.set('accessToken', accessToken, {
//                             httpOnly: true,
//                             secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//                             sameSite: 'strict',
//                             path: '/',
//                         });
//                         return { ...user, accessToken }; // Return user object with access token
//                     }
//                 } catch (error) {
//                     console.error('Login failed:', error);
//                     throw new Error('Invalid credentials');
//                 }
//                 return null; // If authorization fails
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }: any) {
//             if (user) {
//                 token.accessToken = user.accessToken; // Store access token in JWT
//             }
//             return token;
//         },
//         async session({ session, token }: any) {
//             session.accessToken = token.accessToken; // Include access token in session
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };