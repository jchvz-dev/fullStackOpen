import { useState } from 'react'

const App = () => {
    const [contacts, setContacts] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        if (contacts.some(contact => contact.name == newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const contactObject = {
                name: newName,
                number: newNumber
            }
            setContacts(contacts.concat(contactObject))
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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {contacts.map((contact) => <p key={contact.name}>{contact.name} {contact.number}</p>)}
        </div>
    )
}

export default App