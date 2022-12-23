import { CoursesArray } from "../Helpers/types";
import Part from "./Part";

export default function Content({ courses }: CoursesArray) {
  return (
    <>
      {courses.map((e, i) => (
        <Part courseSingle={e} key={i} />
      ))}
    </>
  );
}
