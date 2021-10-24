export const dateBeforeToday = (value) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const inputDate = new Date(value).setHours(0, 0, 0, 0);

  return inputDate < today;
};
