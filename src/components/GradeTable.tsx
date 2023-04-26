import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {IProps} from ".././types/api_types";
/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
export function dummyData() {
  return [];
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = (props: IProps) => {
  const columns: GridColDef[] = [
    { field: 'studentId', headerName: 'Student ID', width: 100 },
    { field: 'studentName', headerName: 'Student Name', width: 100 },
    { field: 'classId', headerName: 'Class ID', width: 100 },
    { field: 'className', headerName: 'Class Name', width: 100 },
    { field: 'semester', headerName: 'Semester', width: 100 },
    { field: 'finalGrade', headerName: 'Final Grade', width: 100 },
  ];
  const rows: GridRowsProp = props.finalGrades;
  return  <div style={{ height: 500, width: '100%' }}>
  <DataGrid loading = {props.isLoading} getRowId={(row) => row.studentId} rows={rows} columns={columns} />
  </div>;
};
