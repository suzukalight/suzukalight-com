import format from 'date-fns/format';

export const formatYYYYMM = (date: Date) => format(date, 'yyyy.MM');
export const formatJpYYYYMM = (date: Date) => format(date, 'yyyy年MM月');
export const formatJpYYYYM = (date: Date) => format(date, 'yyyy年M月');
