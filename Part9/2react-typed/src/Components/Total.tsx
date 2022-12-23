import { CoursesArray } from "../Helpers/types";

export default function Total({ courses }: CoursesArray) {
  return (
    <>
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
}
