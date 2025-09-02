'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";  
import { clearValidationErrors, setSelectedEmployee, setValidationErrors } from "../employeeSlice";
import { updateEmployeesState } from "../employeeSearchSlice";
import { addEmployee, updateEmployee } from "../employeeThunks"; 
import ToastErrors from "../../../components/ErrorToasts";
import InputText from "../../../components/InputText";
import InputDate from "../../../components/InputDate"; 
import InputEmail from "../../../components/InputEmail"; 
import InputSelect from "../../../components/InputSelect"; 
import { Employee } from "../../../types/employee";
import { employeeSchema } from "../validation/employee.schema";
import styles from "../../employee/css/Employee-form.module.css"; 

interface IProps { 
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>; 
}

type EmployeeFormInput = {
  surname: string;
  firstName: string;
  dateOfBirth?: string;
  hireDate?: string;
  phoneNumber?: string;
  email?: string;  
  departmentId?: string;
};

const EmployeeAddUpdate: React.FC<IProps> = ({ setShowEmployeePopUpForm }) => {
  const dispatch = useAppDispatch();
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);
  const departments = useSelector((state: RootState) => state.department.departments);
  const validationErrors = useSelector((state: RootState) => state.employee.validationErrors);

  const { handleSubmit, control, reset, formState: { errors } } = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeSchema) as any,
    defaultValues: {
      surname: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      hireDate: "",
      departmentId: ""
    }
  });

  const trimString = (val?: string) => val?.trim() ?? null;

  const populateEmployee = (data: EmployeeFormInput): Employee => ({
    id: selectedEmployee?.id ?? 0,
    surname: trimString(data.surname) ?? "",
    firstName: trimString(data.firstName) ?? "",
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split("T")[0] : null,
    hireDate: data.hireDate ? new Date(data.hireDate).toISOString().split("T")[0] : null,
    phoneNumber: trimString(data.phoneNumber),
    email: trimString(data.email),
    departmentId: data.departmentId ?? null,
    photo: "",
    department: null,
  });

  const onClose = () => {
    dispatch(setSelectedEmployee(null));
    dispatch(clearValidationErrors());
    setShowEmployeePopUpForm(false);
  };

  const onSubmit = async (data: EmployeeFormInput) => {
    dispatch(clearValidationErrors());
    toast.dismiss();

    const employee = populateEmployee(data);

    try {
      const resultAction = selectedEmployee
        ? await dispatch(updateEmployee(employee))
        : await dispatch(addEmployee(employee));

      unwrapResult(resultAction);

      setShowEmployeePopUpForm(false);
      if (!selectedEmployee) 
        dispatch(updateEmployeesState());
      reset();
    } catch (error: any) {
      dispatch(setValidationErrors(error)); 
    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        surname: selectedEmployee.surname,
        firstName: selectedEmployee.firstName,
        phoneNumber: selectedEmployee.phoneNumber ?? "",
        email: selectedEmployee.email ?? "",
        departmentId: selectedEmployee.departmentId ?? "",
        dateOfBirth: selectedEmployee.dateOfBirth
          ? new Date(selectedEmployee.dateOfBirth).toISOString().slice(0, 10)
          : "",
        hireDate: selectedEmployee.hireDate
          ? new Date(selectedEmployee.hireDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      reset();
      dispatch(clearValidationErrors());
    }
  }, [selectedEmployee, reset, dispatch]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText name="surname" control={control} label="Surname*" error={errors.surname} />
        <InputText name="firstName" control={control} label="First Name*" error={errors.firstName} />
        <InputDate name="dateOfBirth" control={control} label="Date of Birth" error={errors.dateOfBirth} />
        <InputEmail name="email" control={control} label="Email" error={errors.email} />
        <InputText name="phoneNumber" control={control} label="Phone Number" error={errors.phoneNumber} />
        <InputDate name="hireDate" control={control} label="Hire Date" error={errors.hireDate} />
        <InputSelect name="departmentId" control={control} label="Department" error={errors.departmentId} items={departments} />
        <div className={styles["button-row"]}>
          <button type="button" onClick={onClose}>Close</button>
          <button type="submit">{ selectedEmployee ? "Update Employee" : "Add Employee" }</button>
        </div>
      </form>
      <ToastErrors errors={validationErrors} onClear={() => dispatch(clearValidationErrors())} />
    </>    
  );
};

export default EmployeeAddUpdate;