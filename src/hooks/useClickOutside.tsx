import type { RefObject} from 'react';
import { useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listner);
    return () => {
      document.removeEventListener('click', listner);
    };
  }, [ref, handler]);
}

export default useClickOutside;
