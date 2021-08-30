import React, { useEffect } from "react";
import s from "./ContactList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filteredSelector } from "../redux/selectors";
import * as operations from "../redux/operations";
import toast, { Toaster } from "react-hot-toast";

export default function ContactList() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(operations.fetcContacts()), [dispatch]);
  const filteredContactList = useSelector(filteredSelector);

  const deleteContact = (userId, userName) => {
    dispatch(operations.deleteContacts(userId));
    toast.error(`Contact ${userName} deleted`);
  };

  return (
    <ul className={s.contactList}>
      {filteredContactList &&
        filteredContactList.map((user) => (
          <li key={user.id} className={s.contactitem}>
            <span>
              {user.name} {user.number}
            </span>
            <button
              type="button"
              className={s.btn}
              onClick={() => deleteContact(user.id, user.name)}
            >
              Delete
            </button>
            <Toaster />
          </li>
        ))}
    </ul>
  );
}
