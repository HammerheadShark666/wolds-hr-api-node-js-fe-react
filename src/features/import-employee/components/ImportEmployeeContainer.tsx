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
import styles from "../css/Import-employee.module.css";
import globals from "../../../components/css/Toolbar.module.css"

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
    <div className="">
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ImportEmployeeToolBar setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} />
          
          {!importedEmployees?.id && (
            <div className={styles["import-employees-instructions"]}>
              <span>To import employees, click the Import Employees button below and select a CSV file. The file should use commas (,) to separate values. Ensure the CSV includes the required columns: Name, Email, and Department. After uploading, the system will process the file and display a summary of imported, existing, and failed records.</span>
              <div className={globals["toolbar-buttons"]}>     
                <button type="button">Import Employees</button>
                <input
                    type="file"            
                    style={{ display: 'none' }}
                  />   
              </div>
            </div>
           )}
          
          {importedEmployees?.id && (
            // <div className={styles["import-employees-summary"]}>
            //   <span>Imported employees at {importEmployeeHistoryDate}</span>
            //   <div>
            //     <p>Imported Employees Count: {importedEmployees.importedEmployeesCount}</p>
            //     <p>Existing Employees Count: {importedEmployees.importedEmployeesExistingCount}</p>
            //     <p>Failed Imports Count: {importedEmployees.importedEmployeesErrorsCount}</p>
            //   </div>
            //   <button onClick={handleClick}>Import Details</button>
            // </div>
            <div className={styles["import-employees-summary"]}>
            <span className={styles.date}>
              Imported employees at {importEmployeeHistoryDate}
            </span>
            <div className={styles.stats}>
              <p>
                <strong>Imported:</strong> {importedEmployees.importedEmployeesCount}
              </p>
              <p>
                <strong>Existing:</strong> {importedEmployees.importedEmployeesExistingCount}
              </p>
              <p>
                <strong>Failed:</strong> {importedEmployees.importedEmployeesErrorsCount}
              </p>
            </div>
            <button className={styles.button} onClick={handleClick}>
              Import Details
            </button>
          </div>

          )}
        </div>
      )}
    </div>
  );
};

export default ImportEmployeeContainer;