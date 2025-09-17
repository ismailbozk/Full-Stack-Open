const Content = (props) => {
    return (
      <div>
        {props.parts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  export default Content;