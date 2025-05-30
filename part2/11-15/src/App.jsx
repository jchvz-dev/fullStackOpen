import { useState, useEffect } from 'react'
import contactService from './services/contacts'

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

const ContactsList = ({list, removeContact}) => (
    list.map((contact) => (
            <p key={contact.name}>{contact.name} {contact.number} <button onClick={() => removeContact(contact.id, contact.name)}>delete</button></p>
        )
    )
)

const App = () => {

    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        contactService
            .getAll()
            .then(response => {
                setContacts(response.data)
                setFilteredContacts(response.data)
            })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        if (contacts.some(contact => contact.name.toLowerCase() == newName.toLowerCase())) {
            if (confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
                const contact = contacts.find(contact => contact.name.toLowerCase() == newName.toLowerCase())
                const newContact = { ...contact, number: newNumber}
                contactService
                    .update(contact.id, newContact)
                    .then(response => {
                        const updatedContacts = contacts.map(item => item.id === contact.id ? response.data : item)
                        setContacts(updatedContacts)
                        setFilteredContacts(filter === '' ? updatedContacts : updatedContacts.filter(contact => contact.name.toLowerCase().includes(filter)))
                    })
            }
        } else {
            const contactObject = {
                name: newName,
                number: newNumber,
                id: String(contacts.length + 1)
            }

            contactService
                .create(contactObject)

            const updatedContacts = contacts.concat(contactObject)
            setContacts(updatedContacts)
            setFilteredContacts(filter === '' ? updatedContacts : updatedContacts.filter(contact => contact.name.toLowerCase().includes(filter)))
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
    const handleContactDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete ${name} from the phonebook?`)) {
            contactService.remove(id)
            const updatedContacts = contacts.filter(contact => contact.id !== id)
            setContacts(updatedContacts)
            setFilteredContacts(filter === '' ? updatedContacts : updatedContacts.filter(contact => contact.name.toLowerCase().includes(filter)))
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} onChangeFilter={handleFilterChange} />
            <h2>Add a new</h2>
            <ContactForm onSubmit={addContact} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} name={newName} number={newNumber} />
            <h2>Numbers</h2>
            <ContactsList list={filteredContacts} removeContact={handleContactDelete} />
        </div>
    )
}

export default App