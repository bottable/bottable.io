import App from './views/Popup/App';

import React from 'react';
import ReactDOM from 'react-dom';
import { UIProvider } from 'fiber-ui';

require('typeface-work-sans');

ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
