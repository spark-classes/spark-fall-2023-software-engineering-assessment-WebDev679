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
  classAssignments: IClassAssignment[], // an array of IClassAssignment types
  klass: IUniversityClass
): Promise<number> {
  let studentGrades: IStudentGrades = await fetchSomeData(`/student/listGrades/${studentID}/${klass.classId}`); //fetches the grades for a student in a class
  let finalGrade: number = 0;

  // for loop iterates through each of the assignments and finds their weight and then multiplies it with their grade
  for (let assignment of classAssignments){
    const assId = assignment.assignmentId; //assignmentId
    const grade = studentGrades.grades[0][assId]; //grade for that specific assignment
    finalGrade = finalGrade + (grade*(assignment.weight/100)); //weightted grade added to the final grade
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

// function to fetch data by inputting the prompt after the BASE_API_URL (excluding the parameters)
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
  let models: Array<IFinalGrades> = []; // the list of all the final grades for a specific class
  let listOfStudents: IUniversityStudent[] = await fetchSomeData("/student/findByStatus/enrolled"); //a list of all the students enrolled in the semester
  let kclass: IUniversityClass = await fetchSomeData(`/class/GetById/${classID}`); //gets the class information with the classId
  let listOfAssignments: IClassAssignment[] = await fetchSomeData(`/class/listAssignments/${classID}`); //list of assignments (with weight information) of the specific class
  let classStudents: string[] = await fetchSomeData(`/class/listStudents/${classID}`); // list of student ids of all the students in a class
  let model: IFinalGrades; // a model for one student's final grade

  // iterating through each of the student enrolled in a semester
  for (let student of listOfStudents){
    // checking if that student is in the reuqest class
    if (classStudents.includes(student.universityId)){
      // calculating the grade of the student
    let grade: number = await calculateStudentFinalGrade(student.universityId, listOfAssignments, kclass);
    // rounding it off to one decimal place
    let roundedGrade = grade.toFixed(1);
    // making a model with all the information required by the App
    model = {studentId: student.universityId, studentName: student.name, classId: classID, className: kclass.title, semester: kclass.semester, finalGrade: roundedGrade}
   // adding this model to the final array
    models = [...models, model]
  }
  }
  return models;
}
