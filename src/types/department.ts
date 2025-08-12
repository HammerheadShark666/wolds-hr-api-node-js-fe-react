export type Department = 
{
  id: string;
  name: string; 
}

export function isDepartment(obj: any): obj is Department {
  return obj && typeof obj.id === "string" 
                    && typeof obj.name === "string";
}