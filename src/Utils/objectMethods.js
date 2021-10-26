export const removeKeyIncludingString = (obj, string) => {
  Object.keys(obj).forEach((key) => {
    if (key.includes(string)) {
      delete obj[key];
    }
  });
};

export const removeExtraFields = (obj, ...fields) => {
  Object.keys(obj).forEach((key) => {
    if (!!fields?.find((el) => el === key)) {
      delete obj[key];
    }
  });
};

export const removeEmptyNullFields = (obj, ...fields) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '' || obj[key] == null) {
      delete obj[key];
    }
  });
};

export const changedValueToNestedKey = (obj, nestedKey, ...fields) => {
  Object.keys(obj).forEach((key) => {
    if (!!fields?.find((el) => el === key)) {
      obj[key] = obj[key][nestedKey];
    }
  });
};
