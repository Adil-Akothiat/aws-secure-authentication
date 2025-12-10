export const truncateString = (str: string, maxLength: number = 30) => {
  return str?.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};
