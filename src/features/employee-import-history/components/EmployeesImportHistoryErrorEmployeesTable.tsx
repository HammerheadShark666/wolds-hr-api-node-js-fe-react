import {  useSelector } from "react-redux"; 
import styles from "../../../components/css/EmployeesTable.module.css";
import { RootState } from "../../../app/store";  
import { EmployeeImportError } from "../../../types/employeeImported";

interface IProps {
  rows: EmployeeImportError[];
};  
  
const EmployeesImportHistoryErrorEmployeesTable = ({ rows }: IProps) => {
 
  const { loading } = useSelector((state: RootState) => state.employeeList);
      
  if (loading) {
    return <p>Loading...</p>;
  } 
  
  return (
    <>
      <table className={styles["employee-list-table"]}>
        <thead>
          <tr> 
            <th>Employee</th>
            <th>Error</th>            
          </tr>
      </thead>
      <tbody>
          {rows.map((employee) => {           
            return (
              <tr>
                <td>              
                  {employee.employee}
                </td> 
                <td>              
                  {employee.error}
                </td>             
              </tr>   
            );
          })}
        </tbody> 
      </table>
    </>
  )
};
  
export default EmployeesImportHistoryErrorEmployeesTable;