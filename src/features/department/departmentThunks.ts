import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axiosInstance from '../../api/axiosInstance';
import { Department } from '../../types/department';
import { RootState } from '../../app/store';
import { NAVIGATION } from '../../helpers/constants';

export const fetchDepartments = createAsyncThunk<Department[], void>('departments/fetchDepartments',
  async (_, { getState, rejectWithValue }) => {

    const state = getState() as RootState;

    if (state.department.departments.length > 0) {
      return rejectWithValue('Departments already loaded');
    }

    const response = await axiosInstance.get(NAVIGATION.DEPARTMENTS, {});
    return response.data;
  }
);