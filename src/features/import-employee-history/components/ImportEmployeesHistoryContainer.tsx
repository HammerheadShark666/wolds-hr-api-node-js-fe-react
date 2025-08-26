'use client';

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import ImportEmployeesHistoryToolBar from "./ImportEmployeesHistoryToolBar";
import ToastErrors from "../../../components/ErrorToasts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Pagination from "../../../components/EmployeePagination";
import EmployeesTable from "../../../components/EmployeesTable";
import ImportEmployeesHistoryExistingTable from "./ImportEmployeesHistoryExistingTable";
import ImportEmployeesHistoryErrorTable from "./ImportEmployeesHistoryErrorTable";
import ImportEmployeesErrorPagination from "../../../components/ImportEmployeesErrorPagination";
import styles from "../css/Import-employee-history.module.css";
import { AppDispatch, RootState } from "../../../app/store";
import {
  clearImportedEmployeesHistory,
  clearValidationError,
  setImportEmployeeId,
  setImportedEmployeesHistoryPage,
  setImportedEmployeesExistingHistoryPage,
} from "../importEmployeeHistorySlice";
import {
  getImportedEmployeeHistory,
  getImportedEmployeesHistory,
  getImportedEmployeesErrorHistory,
  getImportedEmployeesExistingHistory,
} from "../importEmployeeHistoryThunk";
import { PAGE_SIZE } from "../../../helpers/constants";

const ImportEmployeesHistoryContainer = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialId = location.state?.id || searchParams.get("id") || "";
  const [importEmployeeHistoryId, setImportEmployeeHistoryId] = useState(initialId);
  const [activeTab, setActiveTab] = useState("imported-employees-history");
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);

  const {
    importedEmployeesHistory,
    importedEmployeesExistingHistory,
    importedEmployeesErrorHistory,
    loading,
    error,
  } = useSelector((state: RootState) => state.importEmployeeHistory);
 
  useEffect(() => { 
    dispatch(clearImportedEmployeesHistory());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    document.getElementById("import-history")?.focus();
    dispatch(getImportedEmployeeHistory()); 
  }, [dispatch]);
 
  const loadImportHistory = useCallback(
    async (id: string) => {
      if (!id) return dispatch(clearImportedEmployeesHistory());

      setImportEmployeeHistoryId(id);
      dispatch(setImportEmployeeId(id));

      await Promise.all([
        dispatch(getImportedEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedEmployeesExistingHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedEmployeesErrorHistory({ id, page: 1, pageSize: PAGE_SIZE })),
      ]);

      setActiveTab("imported-employees-history");
    },
    [dispatch]
  );

  useEffect(() => {
    if (importEmployeeHistoryId) loadImportHistory(importEmployeeHistoryId);
  }, [importEmployeeHistoryId, loadImportHistory]);

  const handleOnSelectChange = useCallback(
    async (id: string) => {
      setImportEmployeeHistoryId(id);
      dispatch(setImportEmployeeId(id));
      await loadImportHistory(id);
    },
    [dispatch, loadImportHistory]
  ); 

  const handlePageChange = (fetchFn: Function, setPageFn: Function) => async (page: number) => {
    if (!importEmployeeHistoryId) return;
    setPageFn(page);
    await dispatch(fetchFn({ id: importEmployeeHistoryId, page, pageSize: PAGE_SIZE }));
  };

  return (
    <div className="p-4">
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ImportEmployeesHistoryToolBar
            onSelectChange={handleOnSelectChange}
            importEmployeeHistoryId={importEmployeeHistoryId}
          />

          <Tabs className={styles["employee-import-history-tabs"]} value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="imported-employees-history">Imported Employees ({importedEmployeesHistory.totalEmployees})</TabsTrigger>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="existing-employees-history">Existing Employees ({importedEmployeesExistingHistory.totalEmployees})</TabsTrigger>
              <TabsTrigger className={styles["employee-import-history-tab"]} value="failed-employees-history">Failed Imports ({importedEmployeesErrorHistory.totalEmployees})</TabsTrigger>
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
              <ImportEmployeesHistoryExistingTable rows={importedEmployeesExistingHistory.employees} />
              <Pagination
                pagedEmployees={importedEmployeesExistingHistory}
                onPageChange={handlePageChange(getImportedEmployeesExistingHistory, setImportedEmployeesExistingHistoryPage)}
                title="Import Existing Employees"
              />
            </TabsContent>

            <TabsContent value="failed-employees-history">
              <ImportEmployeesHistoryErrorTable rows={importedEmployeesErrorHistory.employees} />
              <ImportEmployeesErrorPagination
                pagedEmployees={importedEmployeesErrorHistory}
                onPageChange={handlePageChange(getImportedEmployeesErrorHistory, () => {})}
                title="Import Employees that Errored"
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ImportEmployeesHistoryContainer;