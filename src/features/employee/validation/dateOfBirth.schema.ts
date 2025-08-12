import z from "zod";

const dateStringToDate = (val: unknown): Date | null => {
  if (typeof val !== "string" || val.trim() === "") return null;
  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const dateOfBirthSchema = z.preprocess(
  dateStringToDate, z.date()
                      .nullable()
                      .refine((date) => date === null || date >= new Date("1950-01-01"), {
                        message: "Date must be after Jan 1, 1950",
                      })
                      .refine((date) => date === null || date <= new Date("2007-01-01"), {
                        message: "Date must be before Jan 1, 2007",
                      })
);