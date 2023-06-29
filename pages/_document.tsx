import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body dir="rtl" className="md:text-lg">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;