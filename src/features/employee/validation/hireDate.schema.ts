import z from "zod";

const dateStringToDate = (val: unknown): Date | null => {
  if (typeof val !== "string" || val.trim() === "") return null;
  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const hireDateSchema = z.preprocess(
  dateStringToDate, z.date()
                    .nullable()
                    .refine((date) => date === null || date >= new Date("2020-01-01"), {
                    message: "Date must be after Jan 1, 2020",
                    })
                    .refine((date) => date === null || date <= new Date(), {
                    message: "Date cannot be in the future",
                    }) 
);