import React from 'react';
import { AppProps } from 'next/app';
import { UIProvider } from 'fiber-ui';
import './styles.css';

require('typeface-work-sans');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  );
}

export default CustomApp;
