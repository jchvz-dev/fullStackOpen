import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChangeFilter}) => (
    <div>
        filter shown with: <input value={value} onChange={onChangeFilter} />
    </div>
)

const ContactForm = ({onSubmit, onChangeName, onChangeNumber, name, number}) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={name} onChange={onChangeName}/>
        </div>
        <div>
            number: <input value={number} onChange={onChangeNumber}/>
        </div>
        <button type='submit'>add</button>
    </form>
)

const ContactsList = ({list}) => (
    list.map((contact) => <p key={contact.name}>{contact.name} {contact.number}</p>)
)

const App = () => {

    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setContacts(response.data)
            setFilteredContacts(response.data)
          })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        if (contacts.some(contact => contact.name.toLowerCase() == newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const contactObject = {
                name: newName,
                number: newNumber,
                id: contacts.length + 1
            }
            const updatedContacts = contacts.concat(contactObject)
            setContacts(updatedContacts)
            setFilteredContacts(filter === '' ? updatedContacts : updatedContacts.filter(contact => contact.name.toLowerCase().includes(filter)));

        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        const filterValue = event.target.value
        setFilter(filterValue)
        setFilteredContacts(filterValue === '' ? contacts : contacts.filter(contact => contact.name.toLowerCase().includes(filterValue)))
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} onChangeFilter={handleFilterChange} />
            <h2>Add a new</h2>
            <ContactForm onSubmit={addContact} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} name={newName} number={newNumber} />
            <h2>Numbers</h2>
            <ContactsList list={filteredContacts} />
        </div>
    )
}

export default App