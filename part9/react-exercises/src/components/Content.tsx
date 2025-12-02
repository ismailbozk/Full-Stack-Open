import type { JSX } from 'react';
import type { CoursePart } from '../entities/Course';
import { Part } from './Part';

export function Content(props: { courseParts: CoursePart[] }): JSX.Element {
  return (
    <>
      {props.courseParts.map((part) => {
        return Part({ part });
      })}
    </>
  );
}