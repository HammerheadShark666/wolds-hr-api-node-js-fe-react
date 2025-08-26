'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { clearImportedEmployees, clearValidationError } from '../importEmployeeSlice';
import { setImportEmployeeId } from '../../import-employee-history/importEmployeeHistorySlice';
import ToastErrors from '../../../components/ErrorToasts'; 
import { useNavigate } from 'react-router-dom';
import ImportEmployeeToolBar from './ImportEmployeeToolBar';
import { NAVIGATION } from '../../../helpers/constants';
import { formatDateTime } from '../../../helpers/dateHelper';

const ImportEmployeeContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);

  const { importedEmployees, loading, error } = useSelector((state: RootState) => state.importEmployee); 
  const importEmployeeHistoryDate = formatDateTime(importedEmployees?.date);

  const handleClick = () => {
    if (!importedEmployees?.id) return;

    dispatch(clearImportedEmployees());
    dispatch(setImportEmployeeId(importedEmployees.id));
    navigate(NAVIGATION.IMPORT_EMPLOYEES_HISTORY, { state: { id: importedEmployees.id } });
  };

  return (
    <div className="p-4">
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ImportEmployeeToolBar setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
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

export default ImportEmployeeContainer;