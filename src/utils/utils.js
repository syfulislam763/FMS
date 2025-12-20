export const convertToISO = (dateStr) => {
  const months = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  };

  const [monthName, dayWithComma, year] = dateStr.split(" ");

  const month = months[monthName.trim()];
  const day = parseInt(dayWithComma.replace(",", "").trim(), 10);

  if (month === undefined || isNaN(day) || isNaN(year)) {
    throw new Error("Invalid date format");
  }

  const date = new Date(Date.UTC(year, month, day));
  return date.toISOString(); 
}

export const toISOStringFromDateTime = (dateStr, timeStr) => {
  const cleanDate = dateStr.replace(",", "");
  const [monthName, day, year] = cleanDate.split(" ");

  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const months = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11
  };

  const date = new Date(
    Number(year),
    months[monthName],
    Number(day),
    hours,
    minutes,
    0,
    0
  );

  return date.toISOString();
}
