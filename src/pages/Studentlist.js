
import '../screen/Student/Style/StudentList.css'
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import studentListStore from '../Stores/StudentListStore';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';
Modal.setAppElement(null);

const Studentlist = observer(() => {
  useEffect(() => {
    studentListStore.fetchStudentData();
  }, []);

  const handleDelete = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
    studentListStore.deleteStudentData(studentId);
  };

  const handleEdit = (studentId) => {
    studentListStore.setEditingStudentId(studentId);
  };

  const handleCloseEditModal = () => {
    studentListStore.cancelEdit();
  };

  const handleSaveEdit = () => {
    studentListStore.saveEditedStudentData();
  };

  const editingStudentId = studentListStore.getEditingStudentId();
  const editedStudentData = studentListStore.getEditedStudentData();

  return (
    <div className="studentlist-table-container">
      <table className="studentlist-table">
        <thead>
          <tr>
            <th className="studentlist-th">id</th>
            <th className="studentlist-th">firstName</th>
            <th className="studentlist-th">Email</th>
            <th className="studentlist-th">Gender</th>
            <th className="studentlist-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentListStore.studentData.map((student) => (
            <tr key={student.id}>
              <td className="studentlist-td">{student.id}</td>
              <td className="studentlist-td">
                {editingStudentId === student.id ? (
                  <input
                    className="studentlist-FirstName"
                    type="text"
                    value={editedStudentData.firstName || ''}
                    onChange={(e) => studentListStore.setEditedStudentData('firstName', e.target.value)}
                  />
                ) : (
                  student.firstName
                )}
              </td>
              <td className="studentlist-td">{student.email}</td>
              <td className="studentlist-td">{student.gender}</td>
              <td className="studentlist-td">
                {editingStudentId === student.id ? (
                  <>
                    <FaTrash className="studentlist-delete-icon" onClick={() => handleDelete(student.id)} />
                    <FaEdit className="studentlist-save-icon" onClick={handleSaveEdit} />
                    <FaEdit className="studentlist-cancel-icon" onClick={handleCloseEditModal} />
                  </>
                ) : (
                  <FaEdit className="studentlist-edit-addstudentlist" onClick={() => handleEdit(student.id)} />
                )}
                {editingStudentId !== student.id && (
                  <FaTrash className="studentlist-delete-icon" onClick={() => handleDelete(student.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={editingStudentId !== null}
        onRequestClose={handleCloseEditModal}
        className="modal"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={handleCloseEditModal}>
            &times;
          </span>
          <h2>Edit Student</h2>
          <form>
            <div className="studentlist-form-div">
              <label className="studentlist-label">First Name:</label>
              <input
                className="studentlist-FirstName"
                type="text"
                value={editedStudentData.firstName || ''}
                onChange={(e) => studentListStore.setEditedStudentData('firstName', e.target.value)}
              />
            </div>
            <div className="studentlist-form-div">
              <label className="studentlist-label">Email:</label>
              <input
                className="studentlist-Email"
                type="email"
                value={editedStudentData.email || ''}
                onChange={(e) => studentListStore.setEditedStudentData('email', e.target.value)}
              />
            </div>
            <div className="studentlist-form-div">
              <label className="studentlist-label">Gender:</label>
              <select
                className="studentlist-gender"
                value={editedStudentData.gender || ''}
                onChange={(e) => studentListStore.setEditedStudentData('gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="studentlist-button-container">
              <button className="studentlist-button" type="button" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="studentlist-button" type="button" onClick={handleCloseEditModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
});

export default Studentlist;
