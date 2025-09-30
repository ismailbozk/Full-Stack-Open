function Filter({ handleFilterChange }) {
  return (
    <div>
      <label htmlFor="filter">filter shown with </label>
      <input id="filter" onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;