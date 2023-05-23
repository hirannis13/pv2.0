export default function convertSelectedDay(selectedDay) {
  const [month, day, year] = selectedDay.split("/");
  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate;
}
