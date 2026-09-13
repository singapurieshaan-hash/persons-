import { useState, useEffect } from 'react'
import axios from 'axios' 

const Person = ({ person, toggleDeletionOf }) => {
  return (
  <li>
    {person.name} {person.number} 
    <button onClick={toggleDeletionOf}>Delete</button>
  </li>
  )}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Use Input...')
  const [newNumber, setNewNumber] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
    console.log('render', persons.length, 'notes')


  const setNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }

  const setNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value) 
  }

  const setSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }


  const filteredPersons = persons.filter(person =>
     person.name.toLowerCase().includes(search.toLowerCase())
  )

  const deletePerson = (id) => {

      const confirmed = window.confirm('Are you sure you want to delete this person?')

     if(confirmed) {
      axios. 
        delete(`http://localhost:3001/api/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
  }
  }

  const addName = (event) => {
  event.preventDefault()

  const existingPerson = persons.find(person => person.name === newName)

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with the new number?`
    )

    if (confirmUpdate) {
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      axios
        .put(`http://localhost:3001/api/persons/${existingPerson.id}`, updatedPerson)
        .then(response => {
          setPersons(
            persons.map(person =>
              person.id === existingPerson.id ? response.data : person
            )
          )

          setNewName('')
          setNewNumber('')
        })
    }

    return
  }

  const nameObject = {
    name: newName,
    number: newNumber
  }

  axios
    .post('http://localhost:3001/api/persons', nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
}

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={search} onChange={setSearchChange}/>
      <h2>add a new</h2>
      <form onSubmit= {addName} >
        <div>
          name: <input value= {newName} onChange={setNameChange}/>
          number: <input value= {newNumber} onChange={setNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul> 
        {filteredPersons.map(person => 
       <Person
          key={person.id}
          person={person}
          toggleDeletionOf={() => deletePerson(person.id)}
       />
       )}
      </ul>
     </div>
  )
}

export default App

