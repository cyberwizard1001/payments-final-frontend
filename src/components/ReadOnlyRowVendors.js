import React from "react";
import { Link } from "react-router-dom";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
const state = contact
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.ID}</td>
      <td><Link to ={{
            pathname: "/items",
            state
          }}><button>Items</button></Link></td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;