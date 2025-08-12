import z from "zod";

export const emailSchema = z.string()
                            .trim() 
                            .max(250, 'Email must be at most 250 characters long')
                            .email('Invalid email format')
                            .nullable()
                            .optional();