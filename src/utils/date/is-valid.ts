import parseISO from 'date-fns/parseISO';

export const isValidISODate = (dateString: string) => {
  return parseISO(dateString).toString() !== 'Invalid Date';
};
