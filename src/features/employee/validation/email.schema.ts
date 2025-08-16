import { emptyToNull } from "./emptyToNull.schema";

export const emailSchema = emptyToNull
  .refine((val) => {
    if (val == null) return true; // allow empty
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }, "Invalid email format")
  .refine((val) => {
    if (val == null) return true;
    return val.length <= 250;
  }, "Email must be at most 250 characters long");