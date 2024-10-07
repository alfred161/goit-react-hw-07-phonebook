import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ContactForm.module.css';
import { Notify } from 'notiflix';
import { nanoid } from '@reduxjs/toolkit';

export const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      Notify.failure('Please enter a name.');
      return;
    }

    if (phone.trim() === '') {
      Notify.failure('Please enter a phone.');
      return;
    }

    const contactExists = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      Notify.failure(`${name} is already in contacts.`);
      return;
    }

    addContact({
      id: nanoid(),
      name: name,
      phone: phone,
    });

    Notify.success(`${name} added successfully.`);
  };

  return (
    <form className={style.form} onSubmit={e => handleSubmit(e)}>
      <label>
        <p>Name</p>
        <input
          id={style.name}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          value={name}
          onChange={e => setName(e.target.value)}
          required
          autoFocus
        />
      </label>
      <label>
        <p>Number</p>
        <input
          id={style.number}
          type="tel"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </label>
      <button className={style.btn}>Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  addContact: PropTypes.func.isRequired,
};
