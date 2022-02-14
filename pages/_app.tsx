import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/configureStore";
import Head from "next/head";
import "suneditor/dist/css/suneditor.min.css";
import { axiosConfigSetting } from "../util/api";

axiosConfigSetting();

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

export default wrapper.withRedux(MyApp);
