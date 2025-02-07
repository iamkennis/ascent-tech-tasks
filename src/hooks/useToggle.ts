import { useState } from 'react';

export const useToggle = (initialState = true) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const toggle = () => setIsVisible(!isVisible);
  return { isVisible, toggle };
};