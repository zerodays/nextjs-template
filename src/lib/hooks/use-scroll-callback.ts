import { useEffect } from 'react';

interface UseScrollCallbackProps {
  ref?: React.RefObject<HTMLElement>;
  callback: (offsetTop: number) => void;
}

const useScrollCallback = ({ ref, callback }: UseScrollCallbackProps) => {
  useEffect(() => {
    // Determine the scrollable element
    const scrollableElement = ref?.current || window;

    const handleScroll = () => {
      if (scrollableElement instanceof Window) {
        // Handle scroll for window
        callback(window.scrollY || document.documentElement.scrollTop);
      } else if (scrollableElement instanceof HTMLElement) {
        // Handle scroll for HTMLElement
        callback(scrollableElement.scrollTop);
      }
    };

    scrollableElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, [callback, ref]);
};

export default useScrollCallback;
