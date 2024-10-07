import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export const ContactList = ({ filteredContacts, deleteContact }) => {
  const handleDelete = (id, name) => {
    deleteContact(id);
    Notify.success(`${name} successfully deleted.`);
  };

  return (
    <ul className={style.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <div className={style.contactItem}>
            {contact.name} [{contact.phone}]
            <button
              className={style.btn}
              onClick={() => handleDelete(contact.id, contact.name)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
