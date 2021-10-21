import { GlobalClassesContext } from 'Contexts/GlobalClasses';
import React, { useContext, useState } from 'react';

const useGlobalClasses = () => {
  const { globalClasses } = useContext(GlobalClassesContext);

  return globalClasses;
};

export default useGlobalClasses;
