/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, IClassAssignment, IUniversityStudent, IStudentGrades, IFinalGrades } from "../types/api_types";
import { BASE_API_URL, GET_DEFAULT_HEADERS } from ".././globals";

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: IClassAssignment[],
  klass: IUniversityClass
): Promise<number> {
  let studentGrades: IStudentGrades = await fetchSomeData(`/student/listGrades/${studentID}/${klass.classId}`);
  let finalGrade: number = 0;

  for (let assignment of classAssignments){
    const assId = assignment.assignmentId;
    const grade = studentGrades.grades[0][assId];
    finalGrade = finalGrade + (grade*(assignment.weight/100));
  }
  return finalGrade;
}
/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
 */

const fetchSomeData = async (prompt: string) => {
  const url = BASE_API_URL + prompt + "?buid=U20869212";
  const res = await fetch(url, {
    method: "GET",
    headers: GET_DEFAULT_HEADERS(),
  });
  const json = await res.json();
  console.log(json);
  return json;
};

export async function calcAllFinalGrade(classID: string): Promise<IFinalGrades[]> {
  let models: IFinalGrades[] = [];
  let listOfStudents: IUniversityStudent[] = await fetchSomeData("/student/findByStatus/enrolled");
  let listOfAssignments: IClassAssignment[] = await fetchSomeData(`/class/listAssignments/${classID}`);
  let kclass: IUniversityClass = await fetchSomeData(`/class/GetById/${classID}`);
  let classStudents: string[] = await fetchSomeData(`/class/listStudents/${classID}`)
  listOfStudents.map(async (student: IUniversityStudent) => {
    if (classStudents.includes(student.universityId)){
    let grade: number = await calculateStudentFinalGrade(student.universityId, listOfAssignments, kclass);
    let model: IFinalGrades = {studentId: student.universityId, studentName: student.name, classId: classID, className: kclass.title, semester: kclass.semester, finalGrade: grade}
    models.push(model);
  }
  })
  return models;
}
