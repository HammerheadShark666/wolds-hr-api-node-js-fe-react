import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import axiosInstance from '../../api/axiosInstance'; 
import { updateEmployeeInEmployees, addEmployeeToEmployees, updateEmployeePhotoInEmployees, removeEmployeeFromEmployees } from './employeeSearchSlice'
import { handleError } from '../../helpers/errorHandlingHelper';
import { NAVIGATION } from '../../helpers/constants';
 
type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
} 

export const searchEmployeeRecords = createAsyncThunk<ApiEmployeePagingResponse, { keyword: string; departmentId: string, page: number, pageSize: number }>
('search/searchRecords', async ({ keyword, departmentId, page, pageSize } , { rejectWithValue }) => {
    try     
    {
      let url = NAVIGATION.EMPLOYEE_SEARCH + `?keyword=${keyword}&departmentId=${departmentId}&page=${page}&pageSize=${pageSize}`;

      if(departmentId === '0')
        url = NAVIGATION.EMPLOYEE_SEARCH + `?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;

      const response = await axiosInstance.get(url)
      return response.data;
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
}); 

export const addEmployee = createAsyncThunk<Employee, Employee, { rejectValue: any }>(
  'employee/addEmployee',
  async (employee, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(NAVIGATION.EMPLOYEES, employee);
      dispatch(addEmployeeToEmployees(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk('employee/updateEmployee',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
  
    try 
    {      
      const response = await axiosInstance.put( NAVIGATION.EMPLOYEES + '/' + employee.id, employee);
      dispatch(updateEmployeeInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee',
  async (employeeId: number, { rejectWithValue, dispatch }) => {

    try {          
      const response = await axiosInstance.delete(NAVIGATION.EMPLOYEES + '/' + employeeId);  
      dispatch(removeEmployeeFromEmployees(employeeId));    
      return response.data; 
    } 
    catch (error: any) 
    {  
      return handleError(error, rejectWithValue);  
    }
  }
);  

export const updateEmployeePhoto = createAsyncThunk('employee/updateEmployeePhoto',
  async ({ id, file }: { id: number; file: File }, { rejectWithValue, dispatch }) => {
  
    try 
    {      
      const formData = new FormData();
      formData.append('photoFile', file);

      const response = await axiosInstance.post(NAVIGATION.EMPLOYEE_PHOTO_UPLOAD + id, formData); 

      dispatch(updateEmployeePhotoInEmployees(response.data));
      return response.data; 
    } 
    catch (error: any) 
    { 
      return handleError(error, rejectWithValue); 
    }
  }
);