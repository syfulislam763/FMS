import { Text } from "react-native";
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


export const highlightKeywords = (text) => {
  const redKeywords = ['income', 'incomes', 'debts', 'debt', 'expense', 'expenses', 'loss', 'inflation', 'decreased', ];
  const greenKeywords = ['savings goal', 'savings goals', 'saving goal', 'savings', 'budget', 'budgets', 'saving goals'];

  const allKeywords = [
    ...greenKeywords.map(k => ({ word: k, color: '#22C55E' })),
    ...redKeywords.map(k => ({ word: k, color: '#EF4444' }))
  ].sort((a, b) => b.word.length - a.word.length);

  const pattern = new RegExp(
    `(${allKeywords.map(k => k.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );

  const parts = text.split(pattern);

  return (
    <Text>
      {parts.map((part, index) => {
        if (!part) return null;

        const keyword = allKeywords.find(
          k => k.word.toLowerCase() === part.toLowerCase()
        );

        if (keyword) {
          return (
            <Text key={index} style={{ color: keyword.color, fontWeight: '600' }}>
              {part}
            </Text>
          );
        }

        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};