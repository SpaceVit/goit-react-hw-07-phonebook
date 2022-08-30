import { List, Contact, Button, ContactData } from './ContactList.styled';

export default function ContactList({ contacts, onDeleteContact }) {
  console.log(contacts);
  return (
    <List>
      {contacts.map(({ name, id, phone }) => (
        <Contact key={id}>
          <ContactData>
            {name}: <span>{phone}</span>
          </ContactData>

          <Button type="button" onClick={() => onDeleteContact(id)}>
            Delete
          </Button>
        </Contact>
      ))}
    </List>
  );
}
