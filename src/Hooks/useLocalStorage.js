import React, { useEffect, useState } from 'react';

const UseLocalStorage = (key, initialState) => {
  let localStorageState;

  try {
    localStorageState = JSON.parse(window.localStorage.getItem(key));
    if (!localStorageState) localStorageState = initialState;
  } catch (err) {
    localStorageState = initialState;
  }

  const [state, setState] = useState(localStorageState);

  const resetState = () => {
    setState(initialState);
    window.localStorage.removeItem(key);
  };

  return [state, setState, resetState];
};

export default UseLocalStorage;
