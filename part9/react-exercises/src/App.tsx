import type { JSX } from 'react';
import './App.css'

function Header(props: { courseName: string }): JSX.Element {
  return (
    <h1>{props.courseName}</h1>
  );
}

function Content(props: { courseParts: { name: string; exerciseCount: number }[] }): JSX.Element {
  return (
    props.courseParts.map((part, index) => {
      return
      (<p key={index}>
        {part.name} {part.exerciseCount}
      </p>
      );
    })
  );
}

function Total(props: { courseParts: { name: string; exerciseCount: number }[] }): JSX.Element {
  const total = props.courseParts.reduce((sum, part) => {return sum + part.exerciseCount}, 0);
  
  return (
    <p>
      Number of exercises {total}
    </p>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;