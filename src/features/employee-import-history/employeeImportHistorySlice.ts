import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedErrorEmployeesHistory, getImportedExistingEmployeesHistory } from "./employeeImportHistoryThunk";
import { EmployeeImportHistory, PagedEmployees, PagedImportErrorEmployees } from "../../types/importEmployee";
 
interface EmployeeImportHistoryState { 
  employeeImportHistory: EmployeeImportHistory[];
  employeeImportHistoryId: string | null;
  importedEmployeesHistory: PagedEmployees;
  importedExistingEmployeesHistory: PagedEmployees;  
  importedEmployeesErrorHistory: PagedImportErrorEmployees;   
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeImportHistoryState = {
  employeeImportHistory: [],
  importedEmployeesHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedExistingEmployeesHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  }, 
  importedEmployeesErrorHistory: {
    employees: [],
    page: 1,
    totalPages: 0,
    totalEmployees: 0,
  },  
  employeeImportHistoryId: null,
  loading: false,
  error: null,
};
 
const employeeImportHistorySlice = createSlice({
  name: 'employeeImportHistorySlice',
  initialState,
  reducers: {  
    setImportedEmployeesHistoryPage(state, action: PayloadAction<number>) {
      state.importedEmployeesHistory.page = action.payload;
    },
    setImportedExistingEmployeesHistoryPage(state, action: PayloadAction<number>) {
      state.importedExistingEmployeesHistory.page = action.payload;
    },
    setEmployeeImportId(state, action: PayloadAction<string>) {
      state.employeeImportHistoryId = action.payload;
    },
    clearValidationError: (state) => {
      state.error = null;
    },
    clearImportedEmployeesHistory(state) {
      state.importedEmployeesHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
      state.importedExistingEmployeesHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      };
      state.importedEmployeesErrorHistory = {
        employees: [],
        page: 1,
        totalPages: 0,
        totalEmployees: 0,
      }; 
      state.employeeImportHistoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getImportedEmployeeHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedEmployeeHistory.fulfilled, (state, action) => {
      state.employeeImportHistory = [...action.payload];
      state.loading = false;
    })
    .addCase(getImportedEmployeeHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported employees';
    })
    .addCase(getImportedEmployeesHistory.fulfilled, (state, action) => {
      state.importedEmployeesHistory.employees = [...action.payload.employees];
      state.importedEmployeesHistory.totalPages = action.payload.totalPages;
      state.importedEmployeesHistory.totalEmployees = action.payload.totalEmployees;
      state.importedEmployeesHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedEmployeesHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported employees';
    })  
    .addCase(getImportedEmployeesHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getImportedExistingEmployeesHistory.fulfilled, (state, action) => {
      state.importedExistingEmployeesHistory.employees = [...action.payload.employees];
      state.importedExistingEmployeesHistory.totalPages = action.payload.totalPages;
      state.importedExistingEmployeesHistory.totalEmployees = action.payload.totalEmployees;
      state.importedExistingEmployeesHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedExistingEmployeesHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported existing employees';
    })   
    .addCase(getImportedErrorEmployeesHistory.fulfilled, (state, action) => {
      state.importedEmployeesErrorHistory.employees = [...action.payload.employees];
      state.importedEmployeesErrorHistory.totalPages = action.payload.totalPages;
      state.importedEmployeesErrorHistory.totalEmployees = action.payload.totalEmployees;
      state.importedEmployeesErrorHistory.page =  action.payload.page; 
      state.loading = false;
    })
    .addCase(getImportedErrorEmployeesHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to get imported error employees';
    })   
  }
});

export const { setEmployeeImportId, setImportedEmployeesHistoryPage, setImportedExistingEmployeesHistoryPage, clearImportedEmployeesHistory, clearValidationError } = employeeImportHistorySlice.actions
export default employeeImportHistorySlice.reducer;
 











// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedErrorEmployeesHistory, getImportedExistingEmployeesHistory } from "./employeeImportHistoryThunk";
// import { EmployeeImportHistory, PagedEmployees, PagedImportErrorEmployees } from "../../types/importEmployee";
 
// interface EmployeeImportHistoryState {
//   employeeImportHistory: EmployeeImportHistory[];
//   employeeImportHistoryId: string | null;
//   importedEmployeesHistory: PagedEmployees;
//   importedExistingEmployeesHistory: PagedEmployees;
//   importedEmployeesErrorHistory: PagedImportErrorEmployees;
//   loading: boolean;
//   error: string | null;
// }

// const emptyPagedEmployees: PagedEmployees = {
//   employees: [],
//   page: 1,
//   totalPages: 0,
//   totalEmployees: 0,
// };

// const emptyPagedEmployeesErrors: PagedImportErrorEmployees = {
//   employees: [],
//   page: 1,
//   totalPages: 0,
//   totalEmployees: 0,
// };

// const initialState: EmployeeImportHistoryState = {
//   employeeImportHistory: [],
//   employeeImportHistoryId: null,
//   importedEmployeesHistory: { ...emptyPagedEmployees },
//   importedExistingEmployeesHistory: { ...emptyPagedEmployees },
//   importedEmployeesErrorHistory: { ...emptyPagedEmployeesErrors },
//   loading: false,
//   error: null,
// };

// const employeeImportHistorySlice = createSlice({
//   name: "employeeImportHistorySlice",
//   initialState,
//   reducers: {
//     setImportedEmployeesHistoryPage(state, action: PayloadAction<number>) {
//       state.importedEmployeesHistory.page = action.payload;
//     },
//     setImportedExistingEmployeesHistoryPage(state, action: PayloadAction<number>) {
//       state.importedExistingEmployeesHistory.page = action.payload;
//     },
//     setEmployeeImportId(state, action: PayloadAction<string>) {
//       state.employeeImportHistoryId = action.payload;
//     },
//     clearValidationError(state) {
//       state.error = null;
//     },
//     clearImportedEmployeesHistory(state) {
//       state.importedEmployeesHistory = { ...emptyPagedEmployees };
//       state.importedExistingEmployeesHistory = { ...emptyPagedEmployees };
//       state.importedEmployeesErrorHistory = { ...emptyPagedEmployeesErrors };
//       state.employeeImportHistoryId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder      
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )    
//       .addCase(getImportedEmployeeHistory.fulfilled, (state, action: PayloadAction<EmployeeImportHistory[]>) => {
//         state.employeeImportHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedEmployees>) => {
//         state.importedEmployeesHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedExistingEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedEmployees>) => {
//         state.importedExistingEmployeesHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedErrorEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedImportErrorEmployees>) => {
//         state.importedEmployeesErrorHistory = action.payload;
//         state.loading = false;
//       }) 
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state) => {
//           state.loading = false;
//           state.error = "Failed to fetch import history data";
//         }
//       );
//   },
// });

// export const {
//   setEmployeeImportId,
//   setImportedEmployeesHistoryPage,
//   setImportedExistingEmployeesHistoryPage,
//   clearImportedEmployeesHistory,
//   clearValidationError,
// } = employeeImportHistorySlice.actions;

// export default employeeImportHistorySlice.reducer;







// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   getImportedEmployeeHistory,
//   getImportedEmployeesHistory,
//   getImportedExistingEmployeesHistory,
//   getImportedErrorEmployeesHistory,
// } from "./employeeImportHistoryThunk";
// import {
//   EmployeeImportHistory,
//   PagedEmployees,
//   PagedImportErrorEmployees,
// } from "../../types/importEmployee";

// interface EmployeeImportHistoryState {
//   employeeImportHistory: EmployeeImportHistory[];
//   employeeImportHistoryId: string | null;
//   importedEmployeesHistory: PagedEmployees;
//   importedExistingEmployeesHistory: PagedEmployees;
//   importedEmployeesErrorHistory: PagedImportErrorEmployees;
//   loading: boolean;
//   error: string | null;
// }

// const emptyPagedEmployees: PagedEmployees = {
//   employees: [],
//   page: 1,
//   totalPages: 0,
//   totalEmployees: 0,
// };

// const emptyPagedEmployeesErrors: PagedImportErrorEmployees = {
//   employees: [],
//   page: 1,
//   totalPages: 0,
//   totalEmployees: 0,
// };

// const initialState: EmployeeImportHistoryState = {
//   employeeImportHistory: [],
//   employeeImportHistoryId: null,
//   importedEmployeesHistory: { ...emptyPagedEmployees },
//   importedExistingEmployeesHistory: { ...emptyPagedEmployees },
//   importedEmployeesErrorHistory: { ...emptyPagedEmployeesErrors },
//   loading: false,
//   error: null,
// };

// const employeeImportHistorySlice = createSlice({
//   name: "employeeImportHistorySlice",
//   initialState,
//   reducers: {
//     setImportedEmployeesHistoryPage(state, action: PayloadAction<number>) {
//       state.importedEmployeesHistory.page = action.payload;
//     },
//     setImportedExistingEmployeesHistoryPage(state, action: PayloadAction<number>) {
//       state.importedExistingEmployeesHistory.page = action.payload;
//     },
//     setEmployeeImportId(state, action: PayloadAction<string>) {
//       state.employeeImportHistoryId = action.payload;
//     },
//     clearValidationError(state) {
//       state.error = null;
//     },
//     clearImportedEmployeesHistory(state) {
//       state.importedEmployeesHistory = { ...emptyPagedEmployees };
//       state.importedExistingEmployeesHistory = { ...emptyPagedEmployees };
//       state.importedEmployeesErrorHistory = { ...emptyPagedEmployeesErrors };
//       state.employeeImportHistoryId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle pending for any thunk
//     builder.addMatcher(
//       (action) => action.type.endsWith("/pending"),
//       (state) => {
//         state.loading = true;
//         state.error = null;
//       }
//     );

//     // Handle rejected for any thunk
//     builder.addMatcher(
//       (action) => action.type.endsWith("/rejected"),
//       (state) => {
//         state.loading = false;
//         state.error = "Failed to fetch import history data";
//       }
//     );

//     // Handle specific fulfilled thunks
//     builder
//       .addCase(getImportedEmployeeHistory.fulfilled, (state, action: PayloadAction<EmployeeImportHistory[]>) => {
//         state.employeeImportHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedEmployees>) => {
//         state.importedEmployeesHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedExistingEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedEmployees>) => {
//         state.importedExistingEmployeesHistory = action.payload;
//         state.loading = false;
//       })
//       .addCase(getImportedErrorEmployeesHistory.fulfilled, (state, action: PayloadAction<PagedImportErrorEmployees>) => {
//         state.importedEmployeesErrorHistory = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export const {
//   setEmployeeImportId,
//   setImportedEmployeesHistoryPage,
//   setImportedExistingEmployeesHistoryPage,
//   clearImportedEmployeesHistory,
//   clearValidationError,
// } = employeeImportHistorySlice.actions;

// export default employeeImportHistorySlice.reducer;
