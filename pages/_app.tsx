import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/configureStore";
import axios from "axios";
import { END } from "@redux-saga/core";
import Head from "next/head";
import { authAction } from "../features/Auth/slice";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="코후비 블로그"
                    key="코후비 블로그"
                />
                <meta property="og:description" content="코후비 블로그" />
                <meta
                    property="og:image"
                    content="http://localhost:3000/logo@2x.png"
                />

                {/* <link rel="canonical" href="https://kohubi.xyz" /> */}
                <link
                    rel="shortcut icon"
                    href="http://localhost:3000/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     async (context: any) => {
//         return { context };
//         // const cookie = context.req ? context.req.headers.cookie : "";
//         // axios.defaults.headers!.Authorization = "";
//         // axios.defaults.withCredentials = true;
//         // if (context.req && cookie) {
//         //     axios.defaults.headers!.Authorization = cookie;
//         // }
//         // context.store.dispatch(authAction.getMeRequest);
//         // context.store.dispatch(END);
//         // await context.store.sagaTask.toPromise();
//     }
// );
export default wrapper.withRedux(MyApp);
