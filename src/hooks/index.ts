import { useEffect, useState, useContext } from 'react';

import { FirestoreContext, AuthContext } from '../contexts/index';

export const useFirestore = () => useContext(FirestoreContext);

export const useAuth = () => useContext(AuthContext);

export const useScrollY = () => {
  const [scrollPosition, setScrollPosition] = useState({ scrollY: 0 });

  useEffect(() => {
    const updatePosition = () => {
      window.requestAnimationFrame(() => {
        setScrollPosition({ scrollY: window.scrollY });
      });
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
