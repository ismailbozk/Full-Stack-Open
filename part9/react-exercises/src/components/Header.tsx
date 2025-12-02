import type { JSX } from 'react';

export function Header(props: { courseName: string }): JSX.Element {
  return (
    <h1>{props.courseName}</h1>
  );
}