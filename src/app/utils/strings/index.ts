export const padZero = (num: number): string => {
  return num <= 9 ? `0${num}` : `${num}`;
};