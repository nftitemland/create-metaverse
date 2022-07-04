const pseudoWeek = 7;

export const getFirstDayOfWeek = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const diff = date.getDate() - day;

  const firstDayOfWeekOffset = new Date(date.setDate(diff));

  const firstDayOfWeekBeginning = new Date(
    firstDayOfWeekOffset.getFullYear(),
    firstDayOfWeekOffset.getMonth(),
    firstDayOfWeekOffset.getDate()
  );

  return firstDayOfWeekBeginning;
};

export const pageNumberToTime = ({ firstDayOfWeek, pageNumber }) => {
  const firstDayOfWeekMod = new Date(
    firstDayOfWeek.getFullYear(),
    firstDayOfWeek.getMonth(),
    firstDayOfWeek.getDate() + pageNumber * pseudoWeek
  );

  const firstDayOfNextWeekMod = new Date(
    firstDayOfWeek.getFullYear(),
    firstDayOfWeek.getMonth(),
    firstDayOfWeek.getDate() + pageNumber * pseudoWeek + pseudoWeek
  );

  const startTime = firstDayOfWeekMod.getTime();
  const endTime = firstDayOfNextWeekMod.getTime();

  return {
    startTime,
    endTime,
  };
};
