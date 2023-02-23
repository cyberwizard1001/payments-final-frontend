import React, { useState, Fragment , useEffect} from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import "../styles/Billers.css";
import axios from "axios";

const Billers = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch resource when Component mounts
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/api/biller/display");

    const updatedData = result.data.map((item, index) => {
      return { id: item._id, fullName: item.name, phoneNumber: item.phone};
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
        phone: addFormData.phoneNumber,
      };
  
      const res = await axios.post(`http://localhost:3001/api/biller/new`, newContact)
        .then((result) => {
          console.log(result.data)
          const newData = {id: nanoid(), fullName: result.data.name, phoneNumber: result.data.phone};
        setData(() => [...data, newData]);
        window.location.reload();
        })
  }
  
    const handleEditFormSubmit = async (event) => {
      event.preventDefault();
  
      const editedContact = {
        name: editFormData.fullName,
        phone: editFormData.phoneNumber,
      };
    
      const res = await axios.put(`http://localhost:3001/api/biller/${editContactId}`, editedContact)
        .then((result) => {
          console.log(result.data);
          const editedData = {id: editContactId, fullName: result.data.name, phoneNumber: result.data.phone};
    
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
      const result = await axios.delete(`http://localhost:3001/api/biller/delete/${contactId}`);

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
          <h1>BILLERS</h1>
        <form className="billersForm" onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val) => (
                <Fragment>
                  {editContactId === val.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={val}
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
            name="phoneNumber"
            required="required"
            placeholder="Enter Phone Number"
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };
  
  export default Billers;