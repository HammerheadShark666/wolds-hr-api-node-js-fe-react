export const PAGE_SIZE = 5; 

export const VALIDATION = {
  TODAY: new Date(),
  HIRE_DATE_MIN_DATE: new Date("2020-01-01"),
  MIN_DATE_OF_BIRTH: new Date("1950-01-01"),
  MAX_DATE_OF_BIRTH: new Date("2007-01-01")
} as const