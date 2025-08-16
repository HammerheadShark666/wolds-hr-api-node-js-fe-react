import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";  
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../employeeThunks"; 
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { unwrapResult } from "@reduxjs/toolkit";
import { clearValidationErrors, setSelectedEmployee } from "../employeeSlice"; 
import InputText from "../../../components/InputText";
import InputEmail from "../../../components/InputEmail";
import InputDate from "../../../components/InputDate";
import InputSelect from "../../../components/InputSelect";
import styles from "../../employee/css/Employee-form.module.css"; 
import { toast } from "react-toastify";
import { Employee } from "../../../types/employee";
import { updateEmployeesState } from "../employeeSearchSlice";
import ToastErrors from "../../../components/ErrorToasts";
import { surnameSchema } from "../validation/surname.schema";
import { firstNameSchema } from "../validation/firstName.schema";
import { emailSchema } from "../validation/email.schema";
import { phoneNumberSchema } from "../validation/phoneNumber.schema";
import { departmentIdSchema } from "../validation/departmentId.schema";
import { dateOfBirthSchema } from "../validation/dateOfBirth.schema";
import { hireDateSchema } from "../validation/hireDate.schema";
import { clearValidationError } from "../../employee-import/employeeImportSlice";

const employeeInputSchema = z.object({
  surname: surnameSchema,
  firstName: firstNameSchema,
  dateOfBirth: z.string().optional().nullable(),
  hireDate: z.string().optional().nullable(),
  email: emailSchema.optional(),
  phoneNumber: phoneNumberSchema.optional(),
  departmentId: departmentIdSchema.optional(),
});

const employeeSchema = employeeInputSchema.extend({
  dateOfBirth: dateOfBirthSchema.optional().nullable(),
  hireDate: hireDateSchema.optional().nullable(),
});
 
type EmployeeFormInput = z.infer<typeof employeeInputSchema>;   
type EmployeeFormData = z.infer<typeof employeeSchema>; 

interface IProps { 
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>; 
};

const EmployeeAddUpdate: React.FC<IProps> = ({ setShowEmployeePopUpForm }) => {
  const dispatch = useAppDispatch();
  const { loading, validationErrors } = useSelector((state: RootState) => state.employee);
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);
 
  const { 
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeInputSchema), 
  });

  function populateEmployee(data: EmployeeFormData, id: number) : Employee { 
    return { 
      id: id,
      surname: data.surname.trim(),
      firstName: data.firstName.trim(), 
      dateOfBirth: data.dateOfBirth ?? null, 
      hireDate: data.hireDate ?? null,
      departmentId: data.departmentId ?? null,
      email: data.email ?? null,
      phoneNumber: data.phoneNumber ?? null,
      photo: "",
      department: null
    }  
  }  

  const onClose = () => {
    dispatch(setSelectedEmployee(null));
    dispatch(clearValidationErrors());
    setShowEmployeePopUpForm(false);
  }

  const onSubmit = async (data: EmployeeFormInput) => {
    try { 
      const validatedData: EmployeeFormData = employeeSchema.parse(data);

      dispatch(clearValidationErrors());
      toast.dismiss(); 
      
      let resultAction = null;
      if (selectedEmployee != null) {
        resultAction = await dispatch(updateEmployee(populateEmployee(validatedData, selectedEmployee.id)));      
      } else {    
        resultAction = await dispatch(addEmployee(populateEmployee(validatedData, 0)));       
      }
      
      unwrapResult(resultAction);
      setShowEmployeePopUpForm(false);

      if (selectedEmployee == null)
        dispatch(updateEmployeesState());

      reset();      
    } catch (error : any) {
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
    }
  };
 
  useEffect(() => {
    if(selectedEmployee != null) {
      setValue('surname', selectedEmployee.surname);
      setValue('firstName', selectedEmployee.firstName);
      setValue('phoneNumber', selectedEmployee.phoneNumber ?? "");
      setValue('email', selectedEmployee.email ?? "");
      setValue('departmentId', selectedEmployee.departmentId ?? "");
      setValue('dateOfBirth', selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toISOString().substring(0, 10) : null);
      setValue('hireDate', selectedEmployee.hireDate ? new Date(selectedEmployee.hireDate).toISOString().substring(0, 10) : null);
    } else { 
      reset(); 
      dispatch(clearValidationErrors());
    }
  }, [selectedEmployee, setValue, reset, dispatch]);
 
  const departments = useSelector((state: RootState) =>
    state.department.departments
  );
    
  return (     
    <>
      <h2 className={styles["h2"]}>{ selectedEmployee == null ? "Add Employee" : "Update Employee" }</h2>
      {loading && <p>Adding employee...</p>}      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container"> 
          <InputText name="surname"  control={control}  label="Surname"  error={errors.surname}></InputText>    
          <InputText name="firstName"  control={control}  label="First Name"  error={errors.firstName}></InputText>
          <InputDate name="dateOfBirth"  control={control}  label="Date of birth"  error={errors.dateOfBirth}></InputDate>
          <InputEmail name="email"  control={control}  label="Email"  error={errors.email}></InputEmail>
          <InputText name="phoneNumber"  control={control}  label="Phone Number"  error={errors.phoneNumber}></InputText>
          <InputDate name="hireDate"  control={control}  label="Hire date"  error={errors.hireDate}></InputDate> 
          <InputSelect name="departmentId"  control={control}  label="Department"  error={errors.departmentId} items={departments} ></InputSelect>
          <div className={styles["button-row"]}>
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit">{ selectedEmployee == null ? "Add Employee" : "Update Employee"  }</button>       
          </div>
        </div>  
      </form>    
      <ToastErrors errors={validationErrors} onClear={() => dispatch(clearValidationErrors())} />
    </>    
  )
} 

export default EmployeeAddUpdate;
