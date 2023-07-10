import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import '../styles/globals.scss';
import {store} from '../store';


import Layout from '../components/Shared/Layout';

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <Layout>
                <Head>
                    <title>گنجور | مجموعه اشعار شعرای پارسی زبان</title>
                    <meta name="description" content="مجموعه اشعار شعرای پارسی زبان" />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp;
