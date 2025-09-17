const Total = (props) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      Number of exercises{" "}
      {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
};

export default Total;
