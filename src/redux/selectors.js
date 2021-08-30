import { createSelector } from "reselect";

export const getContacts = (state) => state.contactsSlice.entities;
export const getFilter = (state) => state.filterSlice;

export const filteredSelector = createSelector(
  [getContacts, getFilter],
  (contacts, filterValue) =>
    contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filterValue)
    )
);
