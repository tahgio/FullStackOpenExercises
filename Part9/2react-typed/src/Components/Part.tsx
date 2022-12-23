import { useMemo } from "react";
import { CoursePart } from "../Helpers/types";

export default function Part({ courseSingle }: { courseSingle: CoursePart }) {
  const assertNever = (value: CoursePart): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const RenderPart = useMemo(() => {
    switch (courseSingle.type) {
      case "normal":
        return (
          <>
            <strong>
              <h3>
                {courseSingle.name} {courseSingle.exerciseCount}
              </h3>
            </strong>
            <em>
              <p>{courseSingle.description}</p>
            </em>
          </>
        );
      case "groupProject":
        return (
          <>
            <strong>
              <h3>
                {courseSingle.name} {courseSingle.exerciseCount}
              </h3>
            </strong>
            <p>project exercises {courseSingle.groupProjectCount}</p>
          </>
        );
      case "submission":
        return (
          <>
            <strong>
              <h3>
                {courseSingle.name} {courseSingle.exerciseCount}
              </h3>
            </strong>
            <em>
              <p>{courseSingle.description}</p>
            </em>
            <p>submit to {courseSingle.exerciseSubmissionLink}</p>
          </>
        );
      case "special":
        return (
          <>
            <strong>
              <h3>
                {courseSingle.name} {courseSingle.exerciseCount}
              </h3>
            </strong>
            <em>
              <p>{courseSingle.description}</p>
            </em>
            <p>
              required skills{" "}
              {courseSingle.requirements.map((e, i) => (
                <span key={i}>{e} </span>
              ))}
            </p>
          </>
        );
      default:
        return assertNever(courseSingle);
    }
  }, [courseSingle]);

  return <div>{RenderPart}</div>;
}
