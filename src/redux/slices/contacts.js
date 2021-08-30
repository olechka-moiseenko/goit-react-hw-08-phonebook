import { createSlice } from "@reduxjs/toolkit";
import * as operations from "../operations";

const initialState = {
  entities: [],
  status: null,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [operations.fetcContacts.fulfilled](state, action) {
      state.entities = action.payload;
    },
    [operations.fetcContacts.pending](state, action) {
      return {
        ...state,
        status: "Loading",
        error: null,
      };
    },
    [operations.fetcContacts.rejected](state, action) {
      return {
        ...state,
        status: null,
        error: "Error",
      };
    },
    [operations.postContacts.fulfilled](state, { payload }) {
      return {
        ...state,
        entities: [...state.entities, payload],
        status: null,
        error: null,
      };
    },
    [operations.postContacts.pending](state, action) {
      return {
        ...state,
        entities: [...state.entities],
        status: "Loading",
      };
    },
    [operations.postContacts.rejected](state, _) {
      return {
        ...state,
        entities: state.entities,
        error: "Error",
      };
    },
    [operations.deleteContacts.fulfilled](state, action) {
      return {
        ...state,
        entities: state.entities.filter((item) => item.id !== action.payload),
        status: null,
        error: null,
      };
    },
    [operations.deleteContacts.pending](state, _) {
      return {
        ...state,
        status: "Loading",
        error: null,
      };
    },
    [operations.deleteContacts.rejected](state, _) {
      return {
        ...state,
        status: null,
        error: "Error",
      };
    },
  },
});

export default contactsSlice.reducer;
