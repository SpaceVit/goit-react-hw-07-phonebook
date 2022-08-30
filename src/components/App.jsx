import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Box } from './Box';
import { Container } from './App.styled';
import {
  setFilter,
  getFilter,
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from '../redux';

export default function App() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const { data: contacts } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [addContact] = useAddContactMutation();

  const addToContact = ({ name, number: phone }) => {
    const lowerCasedName = name.toLowerCase();

    let added = contacts.find(
      contact => contact.name.toLowerCase() === lowerCasedName
    );

    const contact = {
      name,
      phone,
    };

    if (added) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    addContact(contact);
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

  return (
    <Box as="main" py={3} width="100%">
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addToContact} />

        {contacts && contacts.length !== 0 ? (
          <>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={filteredContacts()}
              onDeleteContact={deleteContact}
            />
          </>
        ) : (
          'There is no contacts'
        )}
      </Container>
    </Box>
  );
}
