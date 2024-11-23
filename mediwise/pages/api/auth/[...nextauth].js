import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/config/mongodb'; 
import bcrypt from 'bcryptjs';
import User from "@/models/user";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectMongoDB(); 

        const user = await User.findOne({ email: credentials.email });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return { id: user._id, email: user.email }; 
        } else {
          throw new Error('Invalid email or password');
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Register',  
  },
  session: {
    jwt: true, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      return session;
    }
  },


});


export default handler;
