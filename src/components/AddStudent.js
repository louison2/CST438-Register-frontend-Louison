import React, { useState } from 'react';

const AddStudent = (props) => {
  const [studentData, setStudentData] = useState({
    name: '', // Add other student properties here
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Make a POST request to your API to add a new student
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (response.ok) {
          // Student added successfully, close the dialog
          props.onClose();
        } else {
          // Handle errors here if needed
          console.error('Failed to add student');
        }
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div>
      <h3>Add Student</h3>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more form fields for other student properties */}
        <div>
          <button type="button" onClick={handleSubmit}>
            Add
          </button>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
