/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { UseSelectorCallbacks } from './useSelector';

import { createContext, useContext } from 'react';

type OuterAppContextType = {
  toggle: () => void;
  toggleSelector: () => void;
  isSelectorOn: boolean;
  setSelectorListener: (callbacks: UseSelectorCallbacks) => void;
  isPinned: boolean;
  setIsPinned: (pinned: boolean) => void;
  innerDocument: Document;
  outerDocument: Document;
};

export const OuterAppContext = createContext<OuterAppContextType>({
  toggle: () => {},
  toggleSelector: () => {},
  isSelectorOn: false,
  setSelectorListener: () => {},
  isPinned: false,
  setIsPinned: () => {},
  innerDocument: document,
  outerDocument: document,
});

export const useOuterApp = () => {
  const context = useContext(OuterAppContext);
  if (context === undefined)
    throw new Error(
      'useOuterApp must be used within a OuterAppContext.Provider'
    );

  return context;
};
