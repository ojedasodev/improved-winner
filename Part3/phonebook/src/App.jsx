import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Message";
import { getPersons, create, deletePerson, update } from "./Services.js"

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({message: "", type: ""  })

  useEffect(() => {
    getPersons().then((persons) => {
      setPersons(persons)
    })
  }, []);

  if(!persons) return null

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) => person.name === filter);

  const toogleMessage = (message, type) => {
    setMessage({message, type})
    setTimeout(function() {
      setMessage({message: "", type: "" })
    }, 2000);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber
    };
    const exist = persons.filter((person) => person.name === newName);
    if (exist.length === 0) {
      create(newPersonObj).then((newPersonObj) => {
        setPersons(persons.concat(newPersonObj));
        toogleMessage(`${newPersonObj.name} added`, "success")
      }).catch(error => {
        toogleMessage(error.response.data.error, "error")
      })
      return;
    }
    if(window.confirm(`${newName} is already added to phonebook,
    replace the old number with a new one`)){
      update(exist[0].id, newPersonObj).then(updated => {
        const newPersons = persons.filter(person => person.id !== updated.id)
        newPersons.push(updated)
        setPersons(newPersons);
        toogleMessage(`${updated.name} updated`, "success")
      }).catch(error => {
        toogleMessage(error.response.data.error, "error")
      })
    }
  };

  const handleOnChange = (event, input) => {
    event.preventDefault();
    switch (input) {
      case "name":
        setNewName(event.target.value);
        break;
      case "number":
        setNewNumber(event.target.value);
        break;
      case "filter":
        setFilter(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleOnClick = (name, id) => {
    if(window.confirm(`delete ${name}?`)){
      deletePerson(id).then(() => {
        setPersons(persons.filter((persons) => persons.id !== id));
        toogleMessage(`${name} deleted`, "success")
      }).catch(error => {
        toogleMessage(`${name} has been deleted`, "error")
        console.log(error)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter text={filter} onChange={handleOnChange} />
      <h1>Add a new</h1>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        onChange={handleOnChange}
      />
      <h1>Numbers</h1>
      <Persons persons={filteredPersons} onClick={handleOnClick} />
    </div>
  );
};

export default App;
