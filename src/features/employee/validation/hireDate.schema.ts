import z from "zod";
import { VALIDATION } from "../../../helpers/constants";

export const hireDateSchema = z.preprocess((val) => {
  if (typeof val !== "string" || val.trim() === "") return null;
  const date = new Date(val);
  return isNaN(date.getTime()) ? val : date;
}, z
  .date({ invalid_type_error: "Invalid date" })
  .refine((date) => date >= VALIDATION.HIRE_DATE_MIN_DATE, { message: "Date cannot be before 2020-01-01" })
  .refine((date) => date <= VALIDATION.TODAY, { message: "Date cannot be in the future" })
  .nullable()  
); 