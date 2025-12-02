import type { JSX } from 'react';

export function Total(props: { courseParts: { name: string; exerciseCount: number }[] }): JSX.Element {
  const total = props.courseParts.reduce((sum, part) => {return sum + part.exerciseCount}, 0);
  
  return (
    <p>
      Number of exercises {total}
    </p>
  );
}