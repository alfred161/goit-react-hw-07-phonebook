import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from '../redux/operations';
import { setFilter } from '../redux/actions';
import {
  getContacts,
  getFilter,
  getError,
  getIsLoading,
} from '../redux/selectors';
import { useEffect } from 'react';

export const App = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter?.toLowerCase() || '');
  });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />

      {isLoading && (
        <b style={{ display: 'block', padding: '0 0 20px 10px' }}>Loading...</b>
      )}
      {error && <b>Error: {error}</b>}

      {filteredContacts.length > 0 ? (
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      ) : (
        !isLoading && (
          <b style={{ display: 'block', padding: '0 0 20px 10px' }}>
            No contacts found.
          </b>
        )
      )}
    </>
  );
};
