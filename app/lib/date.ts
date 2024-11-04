export const formatPostDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format the date to dd/mm/yyyy
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
};
