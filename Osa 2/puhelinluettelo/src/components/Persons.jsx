const Persons = ({persons, deletePerson}) => {
    return(
      <ul>
        {persons.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
      </ul>
    )
  }

export default Persons