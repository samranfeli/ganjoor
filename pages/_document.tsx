import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/faviconGanjoor.ico" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" />
                    <meta name="author" content="Samran Feli Moghadam" />
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