const datePickerCheck = (date) => {
  const selectedDate = new Date(date).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  if (selectedDate < currentDate) {
    return true;
  }
  return false;
};

export default datePickerCheck;
