import { useEffect, useState } from "react";

import SubmitForm from "./Components/SubmitForm.jsx";
import Numbers from "./Components/Numbers.jsx";
import Filter from "./Components/Filter.jsx";
import phonebookService from "./Service/PhoneBookService";

const App = () => {
  const [allPersons, setAllPersons] = useState([{ id: 1, name: "Arto Hellas", number: "040-123456" }]);
  const [persons, setPersons] = useState(allPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const personsToShow = persons;
  const useEffectHook = () => {
    phonebookService.getAll()
      .then((newPersons) => {
        setAllPersons(newPersons);
        updateFilteredPersons(filter, newPersons);
      })
      .catch((error) => {
        console.error("There was an error when fetching the all phonebook: ", error);
        alert("Could not fetch the phonebook.");
      });
  };
  useEffect(useEffectHook, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnSubmitClick = (event) => {
    event.preventDefault();
    const alreadySameName = persons.some((person) => person.name === newName);
    const alreadySameNumber = persons.some((person) => person.number === newNumber);

    if (alreadySameName && alreadySameNumber) {
      alert(`${newName} is already added to phonebook`);
    }
    else if (alreadySameName && !alreadySameNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personId = persons.find((p) => p.name === newName).id;
        const updatedPerson = { id: personId, name: newName, number: newNumber };
        phonebookService.update(personId, updatedPerson)
        .then(response => {
          console.log("Updated person response: ", response);
          const newAllPersons = allPersons.map(p => p.id !== personId ? p : response);
          setAllPersons(newAllPersons);
          setNewName("");
          setNewNumber("");
          updateFilteredPersons(filter, newAllPersons);
        })
        .catch((error) => {
          console.error("There was an error when updating the phone number", error);
          alert(`${updatedPerson.name} cannot be updated with the new phone number.`);
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService.create(newPerson)
        .then((returnedPerson) => {
          const newAllPersons = allPersons.concat(returnedPerson);
          setAllPersons(newAllPersons);
          setNewName("");
          setNewNumber("");
          updateFilteredPersons(filter, newAllPersons);
        })
        .catch((error) => {
          console.error("There was an error!", error);
          alert(`${newPerson.name} cannot be added to the phonebook.`);
        });
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

  const onDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deletObject(id)
      .then((response => {
        const newAllPersons = allPersons.filter((p) => p.id !== id);
        setAllPersons(newAllPersons);
        updateFilteredPersons(filter, newAllPersons);
      }))
      .catch((error) => {
        console.error("There was an error on delete person operation ", error);
        alert(`The person ${person.name} couldn't be removed from the server.`);
      });
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
        handleOnClick={handleOnSubmitClick}
      />

      <h3>Numbers</h3>
      <Numbers persons={persons} onDeleteButtonTap={onDelete} />
    </div>
  );
};

export default App;