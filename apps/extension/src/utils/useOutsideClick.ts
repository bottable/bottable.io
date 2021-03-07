import { useOuterApp } from './useOuterApp';

import { RefObject, useCallback, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement>, func: () => void) {
  const callback = useCallback(func, [func]);
  const { innerDocument, outerDocument } = useOuterApp();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    innerDocument.addEventListener('mousedown', handleClickOutside);
    outerDocument.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      innerDocument.removeEventListener('mousedown', handleClickOutside);
      outerDocument.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, innerDocument, outerDocument]);
}
