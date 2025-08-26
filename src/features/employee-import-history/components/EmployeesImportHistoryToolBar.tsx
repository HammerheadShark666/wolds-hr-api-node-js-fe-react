import React from 'react';
import globals from "../../../components/css/Toolbar.module.css";
import styles from "../css/Employee-import-history-toolbar.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

type Props = {
  onSelectChange: (employeeImportHistoryId: string, employeeImportHistoryDate: string) => void;
  employeeImportHistoryId: string | null;
};

const EmployeesImportHistoryToolBar = ({ onSelectChange, employeeImportHistoryId }: Props) => {
  const importEmployeeHistory = useSelector(
    (state: RootState) => state.importEmployeeHistory.employeeImportHistory
  );
 
  const selectedItem = importEmployeeHistory.find(item => item.id === employeeImportHistoryId);

  console.log('Selected Item:', selectedItem);

  const formattedDate = selectedItem
    ? new Date(selectedItem.date).toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = importEmployeeHistory.find(item => item.id === selectedId);
    if (selected) {
      onSelectChange(selected.id, selected.date);
    } else {
      onSelectChange('0', '');
    }
  };

  return (
    <div className={globals["toolbar"]}>
      <div className={styles["toolbar-title"]}>
        <span>Employees Import History {formattedDate}</span>
      </div>

      <div className={globals["toolbar-buttons"]}>
        <div>
          <label htmlFor="import-history" className={globals["toolbar-label"]}>Import History</label>
          <select
            id="import-history"
            value={employeeImportHistoryId || '0'}
            onChange={handleChange}
            className={styles["select"]}
          >
            <option value="0">Select</option>
            {importEmployeeHistory.map(item => (
              <option key={item.id} value={item.id}>
                {new Date(item.date).toLocaleString('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeesImportHistoryToolBar;
