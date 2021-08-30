import * as api from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetcContacts = createAsyncThunk(
  "contacts/fetcContacts",
  async () => {
    try {
      const contactsFromDB = await api.fetcContacts();
      return contactsFromDB;
    } catch (error) {
      return error;
    }
  }
);

export const postContacts = createAsyncThunk(
  "contacts/postContacts",
  async (newContact) => {
    try {
      const contactsFromDB = await api.postContacts(newContact);
      return contactsFromDB;
    } catch (error) {
      return error;
    }
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContacts",
  async (id) => {
    try {
      await api.deleteContacts(id);
      return id;
    } catch (error) {
      return error;
    }
  }
);
