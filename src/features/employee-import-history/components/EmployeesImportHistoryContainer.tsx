// import { useCallback, useEffect, useState } from "react";
// import EmployeesImportHistoryToolBar from "./EmployeesImportHistoryToolBar";
// import ToastErrors from "../../../components/ErrorToasts";
// import { clearImportedEmployeesHistory, clearValidationError, setEmployeeImportId, setImportedEmployeesHistoryPage, setImportedExistingEmployeesHistoryPage } from "../../employee-import-history/employeeImportHistorySlice";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
// import Pagination from "../../../components/EmployeePagination";
// import EmployeesTable from "../../../components/EmployeesTable";
// import { AppDispatch, RootState } from "../../../app/store";
// import { useDispatch, useSelector } from "react-redux";
// import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedErrorEmployeesHistory, getImportedExistingEmployeesHistory } from "../employeeImportHistoryThunk";
// import styles from "../css/Employee-import-history.module.css"; 
// import EmployeesImportHistoryExistingEmployeesTable from "./EmployeesImportHistoryExistingEmployeesTable"; 
// import { PAGE_SIZE } from "../../../helpers/constants";
// import EmployeesImportHistoryErrorEmployeesTable from "./EmployeesImportHistoryErrorEmployeesTable";
// import EmployeeImportErrorPagination from "../../../components/EmployeeImportErrorPagination";
// import { useLocation, useSearchParams } from "react-router-dom";

// const EmployeesImportHistoryContainer = () => {
 
//   const dispatch = useDispatch<AppDispatch>();
//   const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
//   const { importedEmployeesHistory, importedExistingEmployeesHistory, importedEmployeesErrorHistory, loading, error } = useSelector((state: RootState) => state.importEmployeeHistory);
//   const [activeTab, setActiveTab] = useState("imported-employees-history");
   
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
  
//   const [employeeImportHistoryId, setEmployeeImportHistoryId] = useState(
//     location.state?.id || searchParams.get('id') || ''
//   );
 
//   const [importHistoryDate] = useState(
//     location.state?.importHistoryDate || searchParams.get('date') || new Date().toISOString()
//   );

//   useEffect(() => {
//     document.getElementById('import-history')?.focus();
//     dispatch(getImportedEmployeeHistory())
//   }, [dispatch]);
 
//   const loadImportHistory = useCallback(async (id: string, date: string) => {
//   if (id) {
//     if (id === '') {
//       dispatch(clearImportedEmployeesHistory());
//     } else {
//       setEmployeeImportHistoryId(id);
//       dispatch(setEmployeeImportId(id)); 

//       await dispatch(getImportedEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE }));
//       await dispatch(getImportedExistingEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE }));
//       await dispatch(getImportedErrorEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE }));
//     }
//   }
// }, [dispatch]);

//   useEffect(() => {
//     const loadHistoryData = async () => {
//       await loadImportHistory(employeeImportHistoryId, importHistoryDate);
//     }
//     loadHistoryData();    
//   }, [employeeImportHistoryId, dispatch, importHistoryDate, loadImportHistory]);
  
//   const handleOnSelectChange = useCallback(
//     async (id: string , date: string) => {

//       dispatch(setEmployeeImportId(id));
 
//       const loadHistoryData = async () => {
//         await loadImportHistory(id, date);
//       }
//       loadHistoryData();  

//     }, [dispatch, loadImportHistory]
//   );
  
//   const handlePageChangeIportedEmployees = async (pageNumber: number) => {
//     if(employeeImportHistoryId !== null ) { 
//       dispatch(setImportedEmployeesHistoryPage(pageNumber));
//       await dispatch(getImportedEmployeesHistory({ page: pageNumber, id: employeeImportHistoryId, pageSize: PAGE_SIZE })); 
//     }
//   };

//   const handlePageChangeImportedExistingEmployees = async (pageNumber: number) => {
//     if(employeeImportHistoryId !== null ) { 
//       dispatch(setImportedExistingEmployeesHistoryPage(pageNumber)); 
//       await dispatch(getImportedExistingEmployeesHistory({ id: employeeImportHistoryId, page: pageNumber, pageSize: PAGE_SIZE }));
//     }
//   };

//   const handlePageChangeImportedErrorEmployees = async (pageNumber: number) => {
//     if(employeeImportHistoryId !== null ) { 
//       await dispatch(getImportedErrorEmployeesHistory({ id: employeeImportHistoryId, page: pageNumber, pageSize: PAGE_SIZE }));
//     }
//   };

//   return (   
//     <div className="p-4"> 
//       <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
//       {loading ? 
//         <p>Loading...</p> :        
//           <>   
//             <EmployeesImportHistoryToolBar onSelectChange={handleOnSelectChange} employeeImportHistoryId={employeeImportHistoryId} />  
//             <Tabs className={styles["employee-import-history-tabs"]} value={activeTab} onValueChange={setActiveTab}>
//               <TabsList>
//                 <TabsTrigger className={styles["employee-import-history-tab"]} value="imported-employees-history">Imported Employees</TabsTrigger>
//                 <TabsTrigger className={styles["employee-import-history-tab"]} value="existing-employees-history">Existing Employees</TabsTrigger>
//                 <TabsTrigger className={styles["employee-import-history-tab"]} value="failed-employees-history">Failed Imports</TabsTrigger>
//               </TabsList>  
//               <TabsContent value="imported-employees-history">
//                 <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedEmployeesHistory.employees} />
//                 <Pagination pagedEmployees={importedEmployeesHistory} onPageChange={handlePageChangeIportedEmployees} title={"Imported Employees"} />
//               </TabsContent>
//               <TabsContent value="existing-employees-history">
//                 <EmployeesImportHistoryExistingEmployeesTable rows={importedExistingEmployeesHistory.employees} />
//                 <Pagination pagedEmployees={importedExistingEmployeesHistory} onPageChange={handlePageChangeImportedExistingEmployees} title={"Import Existing Employees"} />
//               </TabsContent>
//               <TabsContent value="failed-employees-history">
//                 <EmployeesImportHistoryErrorEmployeesTable rows={importedEmployeesErrorHistory.employees} />
//                 <EmployeeImportErrorPagination pagedEmployees={importedEmployeesErrorHistory} onPageChange={handlePageChangeImportedErrorEmployees} title={"Import Employees that Errored"} />
//               </TabsContent>   
//             </Tabs>          
//          </> 
//       }
//       </div>   
//   );
// };

// export default EmployeesImportHistoryContainer;

'use client';

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import EmployeesImportHistoryToolBar from "./EmployeesImportHistoryToolBar";
import ToastErrors from "../../../components/ErrorToasts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Pagination from "../../../components/EmployeePagination";
import EmployeesTable from "../../../components/EmployeesTable";
import EmployeesImportHistoryExistingEmployeesTable from "./EmployeesImportHistoryExistingEmployeesTable";
import EmployeesImportHistoryErrorEmployeesTable from "./EmployeesImportHistoryErrorEmployeesTable";
import EmployeeImportErrorPagination from "../../../components/EmployeeImportErrorPagination";
import styles from "../css/Employee-import-history.module.css";
import { AppDispatch, RootState } from "../../../app/store";
import {
  clearImportedEmployeesHistory,
  clearValidationError,
  setEmployeeImportId,
  setImportedEmployeesHistoryPage,
  setImportedExistingEmployeesHistoryPage,
} from "../../employee-import-history/employeeImportHistorySlice";
import {
  getImportedEmployeeHistory,
  getImportedEmployeesHistory,
  getImportedErrorEmployeesHistory,
  getImportedExistingEmployeesHistory,
} from "../employeeImportHistoryThunk";
import { PAGE_SIZE } from "../../../helpers/constants";

const EmployeesImportHistoryContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialId = location.state?.id || searchParams.get("id") || "";
  //const initialDate = location.state?.importHistoryDate || searchParams.get("date") || new Date().toISOString();

  const [employeeImportHistoryId, setEmployeeImportHistoryId] = useState(initialId);
  //const [importHistoryDate, setImportHistoryDate] = useState(initialDate);
  const [activeTab, setActiveTab] = useState("imported-employees-history");
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);

  const {
    importedEmployeesHistory,
    importedExistingEmployeesHistory,
    importedEmployeesErrorHistory,
    loading,
    error,
  } = useSelector((state: RootState) => state.importEmployeeHistory);
 
  useEffect(() => {
    document.getElementById("import-history")?.focus();
    dispatch(getImportedEmployeeHistory());
  }, [dispatch]);
 
  const loadImportHistory = useCallback(
    async (id: string) => {
      if (!id) return dispatch(clearImportedEmployeesHistory());

      setEmployeeImportHistoryId(id);
      dispatch(setEmployeeImportId(id));

      await Promise.all([
        dispatch(getImportedEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedExistingEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedErrorEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE })),
      ]);
    },
    [dispatch]
  );

  useEffect(() => {
    if (employeeImportHistoryId) loadImportHistory(employeeImportHistoryId);
  }, [employeeImportHistoryId, loadImportHistory]);

  const handleOnSelectChange = useCallback(
    async (id: string) => {
      setEmployeeImportHistoryId(id);
      dispatch(setEmployeeImportId(id));
      await loadImportHistory(id);
    },
    [dispatch, loadImportHistory]
  ); 

  const handlePageChange = (fetchFn: Function, setPageFn: Function) => async (page: number) => {
    if (!employeeImportHistoryId) return;
    setPageFn(page);
    await fetchFn({ id: employeeImportHistoryId, page, pageSize: PAGE_SIZE });
  };

  return (
    <div className="p-4">
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <EmployeesImportHistoryToolBar
            onSelectChange={handleOnSelectChange}
            employeeImportHistoryId={employeeImportHistoryId}
          />

          <Tabs className={styles["employee-import-history-tabs"]} value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="imported-employees-history">Imported Employees</TabsTrigger>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="existing-employees-history">Existing Employees</TabsTrigger>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="failed-employees-history">Failed Imports</TabsTrigger>
            </TabsList>

            <TabsContent value="imported-employees-history">
              <EmployeesTable
                rows={importedEmployeesHistory.employees}
                showEmployeePopUpForm={showEmployeePopUpForm}
                setShowEmployeePopUpForm={setShowEmployeePopUpForm}
              />
              <Pagination
                pagedEmployees={importedEmployeesHistory}
                onPageChange={handlePageChange(getImportedEmployeesHistory, setImportedEmployeesHistoryPage)}
                title="Imported Employees"
              />
            </TabsContent>

            <TabsContent value="existing-employees-history">
              <EmployeesImportHistoryExistingEmployeesTable rows={importedExistingEmployeesHistory.employees} />
              <Pagination
                pagedEmployees={importedExistingEmployeesHistory}
                onPageChange={handlePageChange(getImportedExistingEmployeesHistory, setImportedExistingEmployeesHistoryPage)}
                title="Import Existing Employees"
              />
            </TabsContent>

            <TabsContent value="failed-employees-history">
              <EmployeesImportHistoryErrorEmployeesTable rows={importedEmployeesErrorHistory.employees} />
              <EmployeeImportErrorPagination
                pagedEmployees={importedEmployeesErrorHistory}
                onPageChange={handlePageChange(getImportedErrorEmployeesHistory, () => {})}
                title="Import Employees that Errored"
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default EmployeesImportHistoryContainer;