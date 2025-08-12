
export type Employee = 
{
  id: number;  
  surname: string; 
  firstName: string;
  dateOfBirth: Date | null;  
  email: string | null; 
  hireDate: Date | null; 
  phoneNumber: string | null;
  photo: string;
  departmentId: string | null; 
  department: Department | null; 
}

export type Department = 
{
  id: string;
  name: string; 
}

export function isEmployee(obj: any): obj is Employee {
  return obj && typeof obj.id === "number" 
                    && typeof obj.surname === "string" 
                        && obj.firstName === "string" 
                            && (obj.hireDate === "string" || obj.hireDate === null) ;
}