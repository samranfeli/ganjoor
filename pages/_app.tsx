import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';


import Layout from '../components/Shared/Layout';

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Layout>
            <Head>
                <title>گنجور | مجموعه اشعار شعرای پارسی زبان</title>
                <meta name="description" content="مجموعه اشعار شعرای پارسی زبان" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp;
