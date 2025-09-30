function SubmitForm(props) {
  return (
    <form>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          id="number"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit" onClick={props.handleOnClick}>
          add
        </button>
      </div>
    </form>
  );
}

export default SubmitForm;