import React, { useEffect } from 'react';

const useOutSideClose = (ref, changeBehavior, enabled = true) => {
  useEffect(() => {
    const clickOutSide = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        changeBehavior(false);
      }
    };

    if (enabled) {
      document.addEventListener('mousedown', clickOutSide);
    }

    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [ref, enabled]);
};

export default useOutSideClose;
