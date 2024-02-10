import { SessionProvider } from "next-auth/react"


export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: {
    Component: React.ComponentType<any>;
    pageProps: any;
}) {
    console.log('render ')
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}