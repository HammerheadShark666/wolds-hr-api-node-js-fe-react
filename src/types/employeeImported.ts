import { Employee } from "./employee"

export type PagedEmployees = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}   

export type PagedImportErrorEmployees = {
  employees: EmployeeImportError[]
  page: number
  totalPages: number
  totalEmployees: number
}  

export type EmployeeImportError = {
  employee: string;
  error: string;
}
 
export type EmployeeImportHistory = {
  id: number
  date: string
}   

export type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}  

export type ApiExistingEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}

export type ApiErrorEmployeePagingResponse = {
  employees: EmployeeImportError[]
  page: number
  totalPages: number
  totalEmployees: number
}  