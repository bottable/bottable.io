import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import { UIProvider } from 'fiber-ui';
import './styles.css';

require('typeface-work-sans');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <NxLogo width="75" height="50" />
          <h1>Welcome to web!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </UIProvider>
  );
}

export default CustomApp;
