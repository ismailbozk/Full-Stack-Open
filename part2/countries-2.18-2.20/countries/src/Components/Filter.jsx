function Filter(props) {
  return (
    <div>
      <label id="filter">Find Countries</label>
      <input id="input" onChange={props.onChange} value={props.filter}></input>
    </div>
  );
}

export default Filter;