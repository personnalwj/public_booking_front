
import NextAuth, { AuthOptions } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';



const options: AuthOptions = {
    providers: [
     Keycloak(
      {
        issuer: `${process.env.ISSUER}/realms/local_jw`,
        clientId: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
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
      }
    }
};

const nextAuthHandler = (req: any, res: any) => {

  return NextAuth(req, res, options);
}

export default nextAuthHandler;
