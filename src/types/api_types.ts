/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

import { AnyAaaaRecord } from "dns";
import { StringRegexOptions } from "joi";
import { SuperElementAccessExpression } from "typescript";

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

export interface IClassAssignment {
  assignmentId: string;
  classId: string;
  date: string;
  weight: number;
}

export interface IUniversityStudent {
  dateEnrolled: string;
  name: string;
  status: string;
  universityId: string;
}

export interface IStudentGrades {
  classId: string;
  grades: any[];
  name: string;
  studentId: string;
}

export interface IFinalGrades {
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  semester: string;
  finalGrade: string;
}