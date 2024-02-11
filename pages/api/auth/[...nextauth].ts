
import { NextApiRequest } from 'next';
import NextAuth, { AuthOptions, DefaultSession, Session } from 'next-auth';
import type { OIDCConfig } from "@auth/core/providers";
import Keycloak from 'next-auth/providers/keycloak';
import { User } from '@/types/user.type';

const domain = "http://private-keycloak:8080";


const options: AuthOptions = {
    providers: [
     Keycloak(
      {
        issuer: `${domain}/realms/local_jw`,
        clientId: "public-booking-next-client",
        clientSecret: "kDO26OXMXPV7LCJeSEVxrd5qMAK6HWxP",
        authorization: { params: { scope: "openid email profile roles" } },
      }
     )
    ],
    debug: true,
    callbacks: {
      async jwt({ token, account, profile }) {
        if (account) {
          token.id = account.id
          token.accessToken = account.accessToken
        }
        return token
      },
      async session({ session, token, user }): Promise<Session | DefaultSession> {
        if(session.user)
        {
          session.user = {
            ...session.user,
            id: token.sub
          } as { 
            name?: string | null | undefined; 
            email?: string | null | undefined; 
            image?: string | null | undefined;
            id?: string | null | undefined;
          };
        }
        return session
      }
    }
};

const nextAuthHandler = (req: any, res: any) => {

  return NextAuth(req, res, options);
}

export default nextAuthHandler;
