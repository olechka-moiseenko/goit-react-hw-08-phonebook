import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./ContactForm.module.css";
import { v4 as uuidv4 } from "uuid";
import * as operations from "../redux/operations";
import { filteredSelector, getContacts } from "../redux/selectors";
import SearchContact from "../SearchContact/SearchContact";
import ContactList from "../../src/ContactList/ContactList";
import AppBarMenu from "../../src/AppBar/AppBar";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const allContacts = useSelector(filteredSelector);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      allContacts.some(
        (contact) => contact.name === evt.target.elements.inputName.value
      )
    ) {
      toast(`${evt.target.elements.inputName.value} is already in contacts`);
    } else {
      dispatch(
        operations.postContacts({
          name: evt.target.elements.inputName.value,
          number: evt.target.elements.inputNumber.value,
        })
      );
      toast.success(`Contact ${evt.target.elements.inputName.value} added`);
    }
    evt.target.reset();
  };

  const numberInputId = uuidv4();
  const nameInputId = uuidv4();

  return (
    <>
      <AppBarMenu />
      <form onSubmit={handleSubmit} className={s.form}>
        <Toaster />
        <label className={s.label}>Name</label>
        {/* <label className={s.formItem}> */}
        <input
          className={s.input}
          autoComplete="off"
          type="text"
          name="inputName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          id={nameInputId}
        />
        <label className={s.label}>
          Number
          <input
            className={s.input}
            autoComplete="off"
            type="tel"
            name="inputNumber"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            id={numberInputId}
          />
        </label>
        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </form>
      {contacts.length > 0 && <SearchContact />}
      <ContactList />
    </>
  );
}
