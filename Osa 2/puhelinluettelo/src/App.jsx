import { useState, useEffect } from 'react'
import FilterForm from './components/filterForm'
import Persons from './components/Persons'
import personService from './services/persons'
import PersonForm from './components/personForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const hook = () => {
    console.log('Odottaa...')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('Onnistui!')
        setPersons(initialPersons)
      })
  } 
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName) //etsitään person, jolla on sama nimi kuin lisättävällä personilla
      const changedPerson = { ...person, number: newNumber }         //luodaan uusi person olio, jossa on sama nimi kuin lisättävällä personilla, mutta uusi numero
      personService                                                  //päivitetään update metodilla uusi numero vanhalle personille
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedPerson.name} numero päivitetty`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`Virhe päivittäessä numeroa ${person.name}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedPerson.name} lisätty`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`Virhe lisättäessä ${newName}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Poista ${person.name} ?`)
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${person.name} Poistettu`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`Virhe poistaessa ${person.name}`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = searchName
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <div>
        <FilterForm searchName={searchName} handleSearchChange={handleSearchChange}/>
      </div>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App