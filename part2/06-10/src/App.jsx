import { useState } from 'react'

const App = () => {
    const [contacts, setContacts] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [filteredContacts, setFilteredContacts] = useState(contacts)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

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

            <div>
                filter shown with: <input value={filter} onChange={handleFilterChange}/>
            </div>

            <h2>Add a new</h2>

            <form onSubmit={addContact}>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredContacts.map((contact) => <p key={contact.name}>{contact.name} {contact.number}</p>)}
        </div>
    )
}

export default App