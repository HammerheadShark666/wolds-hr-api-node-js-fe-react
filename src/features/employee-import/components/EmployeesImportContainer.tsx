// 'use client';

// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { AppDispatch, RootState } from '../../../app/store';
// import { clearImportedEmployees, clearValidationError } from '../employeeImportSlice';
// import ToastErrors from '../../../components/ErrorToasts'; 
// import EmployeesImportToolBar from './EmployeesImportToolBar';
// import { useNavigate } from 'react-router-dom';
// import { setEmployeeImportId } from '../../employee-import-history/employeeImportHistorySlice';

// const EmployeesImportContainer = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);

//   const importedEmployees = useSelector((state: RootState) => state.importEmployee.importedEmployees);
//   const loading = useSelector((state: RootState) => state.importEmployee.loading);
//   const error = useSelector((state: RootState) => state.importEmployee.error);

//   const importEmployeeHistoryId = importedEmployees?.id || '';
//   const importEmployeeHistoryDate = importedEmployees?.date
//     ? new Date(importedEmployees.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
//     : '';

//   const handleClick = () => {
//     if (!importEmployeeHistoryId) return;
//     dispatch(clearImportedEmployees());
//     dispatch(setEmployeeImportId(importEmployeeHistoryId));
//     navigate('/employees-import-history', { state: { id: importEmployeeHistoryId } }); //date: importedEmployees.date
//   };

//   return (
//     <div className="p-4">
//       <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <EmployeesImportToolBar
//             setShowEmployeePopUpForm={setShowEmployeePopUpForm}
//             showEmployeePopUpForm={showEmployeePopUpForm}
//           />

//           {importEmployeeHistoryId && (
//             <div className="mt-4">
//               <span>Imported employees at {importEmployeeHistoryDate}</span>
//               <div>
//                 <p>Imported Employees Count: {importedEmployees.importedEmployeesCount}</p>
//                 <p>Existing Employees Count: {importedEmployees.importedEmployeesExistingCount}</p>
//                 <p>Failed Imports Count: {importedEmployees.importedEmployeesErrorsCount}</p>
//               </div>
//               <button onClick={handleClick}>Import Details</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeesImportContainer;


'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { clearImportedEmployees, clearValidationError } from '../employeeImportSlice';
import { setEmployeeImportId } from '../../employee-import-history/employeeImportHistorySlice';
import ToastErrors from '../../../components/ErrorToasts';
import EmployeesImportToolBar from './EmployeesImportToolBar';
import { useNavigate } from 'react-router-dom';

const EmployeesImportContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);

  const { importedEmployees, loading, error } = useSelector((state: RootState) => state.importEmployee);

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
      : '';

  const importEmployeeHistoryDate = formatDate(importedEmployees?.date);

  const handleClick = () => {
    if (!importedEmployees?.id) return;

    dispatch(clearImportedEmployees());
    dispatch(setEmployeeImportId(importedEmployees.id));
    navigate('/employees-import-history', { state: { id: importedEmployees.id } });
  };

  return (
    <div className="p-4">
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <EmployeesImportToolBar
            setShowEmployeePopUpForm={setShowEmployeePopUpForm}
            showEmployeePopUpForm={showEmployeePopUpForm}
          />

          {importedEmployees?.id && (
            <div className="mt-4">
              <span>Imported employees at {importEmployeeHistoryDate}</span>
              <div>
                <p>Imported Employees Count: {importedEmployees.importedEmployeesCount}</p>
                <p>Existing Employees Count: {importedEmployees.importedEmployeesExistingCount}</p>
                <p>Failed Imports Count: {importedEmployees.importedEmployeesErrorsCount}</p>
              </div>
              <button onClick={handleClick}>Import Details</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesImportContainer;