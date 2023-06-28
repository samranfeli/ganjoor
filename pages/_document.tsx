import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <title>گنجور</title>
                    <meta name="description" content="مجموعه اشعار شعرای پارسی زبان" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="/material-design-iconic-font/css/material-design-iconic-font.min.css" />
                </Head>
                <body dir="rtl">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;