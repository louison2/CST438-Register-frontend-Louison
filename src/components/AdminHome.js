import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent'; // Import the AddStudent component
import EditStudent from './EditStudent'; // Import the EditStudent component

const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // called once after initial render
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // Fetch students from the API endpoint
    axios
      .get('/student')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students: ', error);
      });
  };

  const handleAddStudentClick = () => {
    setShowAddDialog(true);
  };

  const handleEditStudentClick = (student) => {
    setSelectedStudent(student);
    setShowEditDialog(true);
  };

  const handleDeleteStudentClick = (studentId) => {
    // Implement delete student logic here
    axios
      .delete(`/student/${studentId}`)
      .then((response) => {
        if (response.status === 204) {
          // Student deleted successfully, fetch the updated student list
          fetchStudents();
        } else {
          console.error('Failed to delete student');
        }
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const addStudent = (newStudentData) => {
    // Make a POST request to the API to create a new student
    axios
      .post('/student', newStudentData)
      .then((response) => {
        if (response.status === 201) {
          // Student added successfully, close the dialog and fetch the updated student list
          setShowAddDialog(false);
          fetchStudents();
        } else {
          console.error('Failed to add student');
        }
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div>
      <div style={{ margin: 'auto' }}>
        <h3>Student List</h3>
      </div>
      <button onClick={handleAddStudentClick}>Add Student</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>
                <button onClick={() => handleEditStudentClick(student)}>Edit</button>
                <button onClick={() => handleDeleteStudentClick(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddDialog && <AddStudent onClose={() => setShowAddDialog(false)} addStudent={addStudent} />}
      {showEditDialog && selectedStudent && (
        <EditStudent student={selectedStudent} onClose={() => setShowEditDialog(false)} />
      )}
    </div>
  );
};

export default AdminHome;
