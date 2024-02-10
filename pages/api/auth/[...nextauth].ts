
import { NextApiRequest } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import type { OIDCConfig } from "@auth/core/providers";
import Keycloak from 'next-auth/providers/keycloak';

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
          token.accessToken = account.access_token
        }
        return token
      }
    }
};

const nextAuthHandler = (req: any, res: any) => {

  return NextAuth(req, res, options);
}

export default nextAuthHandler;
