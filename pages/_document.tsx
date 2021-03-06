import Document, { Html, Main, NextScript, Head } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface IProps {
    styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<IProps> {
    static async getInitialProps(ctx: any): Promise<any> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } catch (error) {
            console.error(error);
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>{this.props.styleTags}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
