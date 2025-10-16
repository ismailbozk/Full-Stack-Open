function Numbers({ persons, onDeleteButtonTap }) {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => onDeleteButtonTap(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default Numbers;