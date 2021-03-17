import {
  OuterAppContext,
  useSelector,
  getChromeValues,
  setChromeValue,
} from './utils';
import * as config from './config';
import { GlobalStyle } from './shared';

import App from './views/Content/App';
import { ExtensionToggle } from './components/ExtensionToggle';

import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import styled, { StyleSheetManager } from 'styled-components';
import { motion } from 'framer-motion';
import { UIProvider } from 'fiber-ui';

const CustomHead = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <base target="_parent" />
      <link
        type="text/css"
        rel="stylesheet"
        href={chrome.runtime.getURL('/static/css/content.css')}
      />
      <style>
        {`
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}

					html, body, .frame-content { 
						width: 100%;
						height: 100%;
					}

					body {
						padding: 0 !important;
					}

					.frame-content {
						overflow-x: hidden;
						overflow-y: hidden;
					}
				`}
      </style>
    </>
  );
};

type MainProps = {
  toggle: () => void;
};

const BottableWrapper = styled(motion.div)`
  display: flex;
  position: fixed;
  z-index: 1000000;
  top: 0;
  left: -${config.EXTENSION_WIDTH};
  flex-direction: column;
  width: ${config.EXTENSION_WIDTH};
  height: 100%;
  overflow: hidden;
  background-color: #f1f1f1;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  place-items: center;
`;

const StyledFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
`;

const app = document.createElement('div');
app.id = config.EXTENSION_ROOT_ID;

const Main: FC<MainProps> = ({ toggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const { isSelectorOn, toggleSelector, setSelectorListener } = useSelector(
    config.EXTENSION_ROOT_ID
  );

  useEffect(() => {
    const syncChrome = async () => {
      const { isPinned: isPinnedKey } = config.CHROME.keys;

      const storage = await getChromeValues([isPinnedKey]);
      const { [isPinnedKey]: pinned } = storage;

      const boolPinned = Boolean(pinned);
      setIsPinned(boolPinned);
      setIsOpen(boolPinned);
    };

    syncChrome();
  }, []);

  useEffect(() => {
    setChromeValue({ [config.CHROME.keys.isPinned]: isPinned });

    if (isPinned && app.style.display !== 'none') {
      document.body.style.marginLeft = config.EXTENSION_WIDTH;
    } else if (app.style.display !== 'none') {
      document.body.style.marginLeft = '0px';
    }
  }, [isPinned]);

  return (
    <StyleSheetManager target={document.head}>
      <BottableWrapper
        animate={{
          left: isOpen ? 0 : `-${config.EXTENSION_WIDTH}`,
        }}
        transition={{ type: 'tween', duration: 0.2 }}
        onMouseLeave={() => {
          if (!isPinned) setIsOpen(false);
        }}
      >
        <ExtensionToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <StyledFrame
          className="bottable-frame"
          head={<CustomHead />}
          mountTarget="body"
        >
          <FrameContextConsumer>
            {({ document: frameDocument }) => {
              const { head } = frameDocument;

              return (
                <OuterAppContext.Provider
                  value={{
                    toggle,
                    toggleSelector,
                    isSelectorOn,
                    setSelectorListener,
                    isPinned,
                    setIsPinned,
                    innerDocument: frameDocument,
                    outerDocument: document,
                  }}
                >
                  <StyleSheetManager target={head}>
                    <UIProvider>
                      <GlobalStyle />
                      <App />
                    </UIProvider>
                  </StyleSheetManager>
                </OuterAppContext.Provider>
              );
            }}
          </FrameContextConsumer>
        </StyledFrame>
      </BottableWrapper>
    </StyleSheetManager>
  );
};

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block';
  } else {
    app.style.display = 'none';
  }
}

document.body.appendChild(app);
document.body.style.transition = 'margin .2s ease';
ReactDOM.render(<Main toggle={toggle} />, app);

app.style.display = 'none';

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'clicked_browser_action') {
    toggle();
  }
});
