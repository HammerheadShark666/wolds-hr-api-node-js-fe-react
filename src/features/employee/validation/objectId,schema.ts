import { emptyToNull } from "./emptyToNull.schema";

export const objectIdSchema = emptyToNull.refine((val) => {
  if (val == null) return true;
  return /^[a-fA-F0-9]{24}$/.test(val);
}, "Invalid department Id");
