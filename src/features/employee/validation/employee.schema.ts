import { z } from "zod"; 
import { surnameSchema } from "./surname.schema";
import { firstNameSchema } from "./firstName.schema";
import { dateOfBirthSchema } from "./dateOfBirth.schema";
import { hireDateSchema } from "./hireDate.schema";
import { emailSchema } from "./email.schema";
import { phoneNumberSchema } from "./phoneNumber.schema";
import { departmentIdSchema } from "./departmentId.schema";
 
export const employeeSchema = z.object({
  surname: surnameSchema,
  firstName: firstNameSchema,
  dateOfBirth: dateOfBirthSchema,
  phoneNumber: phoneNumberSchema,
  email: emailSchema,
  hireDate: hireDateSchema,
  departmentId: departmentIdSchema
})
.passthrough(); 

export type EmployeeSchema = z.infer<typeof employeeSchema>;