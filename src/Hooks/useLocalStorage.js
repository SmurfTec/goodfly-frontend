import React, { useEffect, useState } from 'react';

const UseLocalStorage = (key) => {
  let initialState;
  try {
    initialState = JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    initialState = null;
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  const resetState = () => {
    setState(null);
    window.localStorage.removeItem(key);
  };

  return [state, setState, resetState];
};

export default UseLocalStorage;
