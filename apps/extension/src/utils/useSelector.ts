import '../assets/libs/selectorgadget_combined.css';
import SelectorGadget, {
  jQuerySG,
} from '../assets/libs/selectorgadget_combined';

import { useCallback, useRef, useState } from 'react';

type SelectionCallback = (ele: HTMLElement, path: string) => void;

export type UseSelectorCallbacks = {
  remove?: SelectionCallback;
  reject?: SelectionCallback;
  select?: SelectionCallback;
};

const useSelector = (rootId: string) => {
  // TODO: What should i initialize this as?
  const selector = useRef(new SelectorGadget(rootId));
  const [isOn, setIsOn] = useState(false);
  const callback = useRef<UseSelectorCallbacks>({});

  const selectionCallback = useCallback(
    (type: string, payload: HTMLElement, prediction: string) => {
      const { reject, remove, select } = callback.current;

      switch (type) {
        case 'removed':
          if (remove) remove(payload, prediction);
          break;
        case 'rejected':
          if (reject) reject(payload, prediction);
          break;
        case 'selected':
          if (select) select(payload, prediction);
          break;
        default:
          break;
      }
    },
    [callback]
  );

  const enableSelector = useCallback(() => {
    selector.current = new SelectorGadget(rootId, selectionCallback);

    const { current } = selector;
    current.makeInterface();
    current.clearEverything();
    current.setMode('interactive');
    current.sg_div[0].style = 'right: -9999px !important';
  }, [selector, rootId, selectionCallback]);

  const disableSelector = useCallback(() => {
    const { current } = selector;

    current.unbindAndRemoveInterface();
    current.clearEverything();
    current.unhighlightIframes();

    jQuerySG(document).add('*').unbind('.sg');
  }, [selector]);

  const toggleSelector = useCallback(() => {
    if (isOn) {
      setIsOn(false);
      disableSelector();
    } else {
      setIsOn(true);
      enableSelector();
    }
  }, [isOn, setIsOn, enableSelector, disableSelector]);

  const setSelectorListener = useCallback(
    (cb: UseSelectorCallbacks) => {
      callback.current = cb;
    },
    [callback]
  );

  return { isSelectorOn: isOn, toggleSelector, setSelectorListener };
};

export { useSelector };
