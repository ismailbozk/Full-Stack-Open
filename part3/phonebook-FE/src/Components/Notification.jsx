const Notification = (props) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  if (props.message === null || props.message === undefined) {
    return null;
  }

  return (
    <div style={props.isError === true ? errorStyle : successStyle}>
      <br />
      <p>{props.message}</p>
    </div>
  );
};

export default Notification;
