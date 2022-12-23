interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmisisonPart extends CoursePartBaseWDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWDescription {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmisisonPart
  | CourseSpecialPart;

export interface CoursesArray {
  courses: CoursePart[];
}
