import { useEffect, useState } from "react";

import SubmitForm from "./Components/SubmitForm.jsx";
import Numbers from "./Components/Numbers.jsx";
import Filter from "./Components/Filter.jsx";
import axios from "axios";

const App = () => {
  const [allPersons, setAllPersons] = useState([{ id: 1, name: "Arto Hellas", number: "040-123456" }]);
  const [persons, setPersons] = useState(allPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const personsToShow = persons;
  const useEffectHook = () => {
    axios.get("http://localhost:3001/persons")
      .then((response) => {
        const newPersons = response.data;
        setAllPersons(newPersons);
        updateFilteredPersons(filter, newPersons);
      });
  };
  useEffect(useEffectHook, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    const alreadySameName = persons.some((person) => person.name === newName);
    if (alreadySameName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newAllPersons = allPersons.concat({
        name: newName,
        number: newNumber,
      });
      setAllPersons(newAllPersons);
      setNewName("");
      setNewNumber("");
      updateFilteredPersons(filter, newAllPersons);
    }
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value.toLowerCase();
    setFilter(event.target.value.toLowerCase());
    updateFilteredPersons(newFilter, allPersons);
  };

  const updateFilteredPersons = (filter, allPersons) => {
    if (filter.length === 0) {
      setPersons(allPersons);
    } else {
      const filteredPersons = allPersons.filter((person) =>
        person.name.toLowerCase().includes(filter)
      );
      setPersons(filteredPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}></Filter>

      <h3>Add a new</h3>
      <SubmitForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleOnClick={handleOnClick}
      />

      <h3>Numbers</h3>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;