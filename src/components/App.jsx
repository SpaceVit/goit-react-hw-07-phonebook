import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Box } from './Box';
import { Container } from './App.styled';
import {
  addContact,
  setFilter,
  deleteContact,
  getContacts,
  getFilter,
} from '../redux';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const addToContact = ({ name, number }) => {
    const lowerCasedName = name.toLowerCase();

    let added = contacts.find(
      contact => contact.name.toLowerCase() === lowerCasedName
    );

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (added) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    dispatch(addContact(contact));
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filteredContacts = () => {
    const lowerCasedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCasedFilter)
    );
  };

  const handleDeleteContact = deleteContactId => {
    dispatch(deleteContact(deleteContactId));
  };

  const renderCondition = () => {
    if (contacts.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box as="main" py={3} width="100%">
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addToContact} />

        {renderCondition() ? (
          <>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={filteredContacts()}
              onDeleteContact={handleDeleteContact}
            />
          </>
        ) : (
          'There is no contacts'
        )}
      </Container>
    </Box>
  );
}
