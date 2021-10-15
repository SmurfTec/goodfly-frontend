import React, { useState } from 'react';

const UseInput = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleToggle = (e) => {
    setState((st) => ({
      ...st,
      [e.target.name]: !st[e.target.name],
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, resetState, handleChange, handleToggle];
};

export default UseInput;
