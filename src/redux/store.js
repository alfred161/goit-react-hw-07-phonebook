import { contactsSlice } from '../redux/contactsSlice';
import { filterSlice } from '../redux/filterSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});
