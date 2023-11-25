export default function formatDate(date : Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}