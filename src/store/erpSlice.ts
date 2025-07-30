import { createSlice } from '@reduxjs/toolkit';

// Sample static ERP data
const initialState = {
    employees: [
        { id: 1, name: 'Alice Johnson', departmentId: 1, projectIds: [1, 2] },
        { id: 2, name: 'Bob Smith', departmentId: 2, projectIds: [2] },
        { id: 3, name: 'Charlie Lee', departmentId: 1, projectIds: [1] },
    ],
    departments: [
        { id: 1, name: 'Engineering' },
        { id: 2, name: 'HR' },
    ],
    projects: [
        { id: 1, name: 'Smart Home App' },
        { id: 2, name: 'ERP Integration' },
    ],
};

const erpSlice = createSlice({
    name: 'erp',
    initialState,
    reducers: {}, // No reducers needed for static data
});

export const selectEmployees = (state: any) => state.erp.employees;
export const selectDepartments = (state: any) => state.erp.departments;
export const selectProjects = (state: any) => state.erp.projects;

export default erpSlice.reducer; 