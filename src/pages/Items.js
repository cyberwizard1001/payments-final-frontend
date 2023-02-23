import React, { useState, Fragment , useEffect} from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRowItems";
import EditableRow from "../components/EditableRowItems";
import "../styles/Billers.css";
import axios from "axios";

const Items = props => {
    const {id,fullName, ID} =
    (props.location.state);

    console.log(id);

    const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch resource when Component mounts
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/item/display/${id}`);

        const updatedData = result.data.map((item, index) => {
          return { id: item._id, fullName: item.name, phoneNumber: item.price};

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
      phoneNumber: "",
    });
  
    const [editFormData, setEditFormData] = useState({
      fullName: "",
      phoneNumber: "",
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
        name: addFormData.fullName,
        price: addFormData.phoneNumber,
      };

      const res = await axios.post(`http://localhost:3001/api/item/${id}/new`, newContact)
        .then((result) => {
          console.log(result.data)
          const newData = {id: nanoid(), fullName: result.data.name, phoneNumber: result.data.price};
        setData(() => [...data, newData]);
        window.location.reload();
        })
    };
  
    const handleEditFormSubmit = async (event) => {
      event.preventDefault();
  
      const editedContact = {
        name: editFormData.fullName,
        price: editFormData.phoneNumber,
      };
  
      const res = await axios.put(`http://localhost:3001/api/item/${id}/${editContactId}`, editedContact)
        .then((result) => {
          console.log(result.data);
          const editedData = {id: editContactId, fullName: result.data.name, phoneNumber: result.data.price};
    
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
        phoneNumber: contact.phoneNumber,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditContactId(null);
    };
  
    const handleDeleteClick = async (contactId) => {
      try {
        const result = await axios.delete(`http://localhost:3001/api/item/delete/${id}/${contactId}`);
  
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
        
        <h1>ITEMS</h1>
        <h4><center>Vendor Name: {fullName} &nbsp; &nbsp; &nbsp; Password: {ID}</center></h4>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
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
            placeholder="Enter item name"
            onChange={handleAddFormChange}
          />
          
          <input
            type="text"
            name="phoneNumber"
            required="required"
            placeholder="Enter price"
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  
}

export default Items
