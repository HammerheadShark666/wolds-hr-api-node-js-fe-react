import z from "zod";
import { VALIDATION } from "../../../helpers/constants";
 
export const dateOfBirthSchema = z.preprocess((val) => {
  if (typeof val !== "string" || val.trim() === "") return null;
  const date = new Date(val);
  return isNaN(date.getTime()) ? val : date;
}, z
  .date({ invalid_type_error: "Invalid date" })
  .refine((date) => date >= VALIDATION.MIN_DATE_OF_BIRTH, { message: "Date of birth cannot be before 1950-01-01" })
  .refine((date) => date <= VALIDATION.MAX_DATE_OF_BIRTH, { message: "Date  of birth must be before Jan 1, 2007" })
  .nullable()  
);