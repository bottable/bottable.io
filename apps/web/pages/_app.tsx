import client from '../apollo-client';

import React from 'react';
import { AppProps } from 'next/app';
import { UIProvider } from 'fiber-ui';
import { ApolloProvider } from '@apollo/client';
import './styles.css';

require('typeface-work-sans');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
