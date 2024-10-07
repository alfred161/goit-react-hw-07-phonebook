import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction(
  'contacts/addContact',
  ({ name, phone }) => ({
    payload: {
      name,
      phone,
    },
  })
);

export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('filter/setFilter');
