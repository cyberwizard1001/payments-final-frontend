import React, { useState, Fragment , useEffect} from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRowVendors";
import EditableRow from "../components/EditableRowVendors";
import "../styles/Billers.css";
import axios from "axios";

const Vendors = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch resource when Component mounts
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/api/vendor/display");

    const updatedData = result.data.map((item, index) => {
      return {id: item._id, fullName: item.username, ID: item.password};
  });

  setData(updatedData);
} catch (error) {
  console.log("Error fetching data", error);
}
};

fetchData();

  }, []);

  console.log(data);

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    ID: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    ID: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    const newContact = {
      username: addFormData.fullName,
      password: addFormData.ID,
    };

    const res = await axios.post(`http://localhost:3001/api/vendor/newadd`, newContact)
        .then((result) => {
          console.log(result.data)
          const newData = {id: nanoid(), fullName: result.data.username, ID: result.data.password};
        setData(() => [...data, newData]);
        window.location.reload();
        })
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedContact = {
      username: editFormData.fullName,
      password: editFormData.ID,
    };

    const res = await axios.put(`http://localhost:3001/api/vendor/${editContactId}`, editedContact)
        .then((result) => {
          console.log(result.data);
          const editedData = {id: editContactId, fullName: result.data.username, ID: result.data.password};
    
        setData(data.map(contact => contact.id === editContactId ? editedData : contact));
        setEditContactId(null);
        window.location.reload();
        })
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      ID: contact.ID,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = async (contactId) => {
    try {
    const result = await axios.delete(`http://localhost:3001/api/vendor/delete/${contactId}`);

        // Get the new data and update the state
    let updatedData = [...data];
    updatedData = updatedData.filter(item => item._id !== contactId);
    setData(updatedData);
    window.location.reload();
    } catch (error) {
        console.log("Error deleting data", error);
    }
  };

  return (
    <div className="billers">
        <h1>VENDORS</h1>
      <form calssName="billersForm" onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <form className= "billersForm" onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name"
          onChange={handleAddFormChange}
        />
        
        <input
          type="text"
          name="ID"
          required="required"
          placeholder="Enter password"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Vendors;