/* eslint-disable react/prop-types */
const Persons = ({ persons, onClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => onClick(person.name, person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
