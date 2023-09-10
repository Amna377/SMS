import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { teacherliststore } from '../../Stores/Teacherliststore';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';
import '../Teacher/Style/Teacherlist.css'
import teacherFormStore from '../../Stores/TeacherFormStore';
import teacherStore from '../../Stores/TeacherStore';
import TeacherPopup from '../../screen/Teacher/TeacherPopup';

Modal.setAppElement(null);

const Teacherlist = observer(() => {
  useEffect(() => {
    teacherliststore.fetchTeacherData();
  }, []);

  const handleDelete = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
    teacherliststore.deleteStudentData(studentId);
  };

  const handleEdit = (studentData) => {
    // Handle opening the popup with the student data to edit
    teacherFormStore.setFormData(studentData);
    teacherStore.setShowPopup(true);
  };

  return (
    <>
      <div className="teacherlist-table-container">
        <table className="teacherlist-table">
          <thead>
            <tr> 
              <th className='teacherlist-th'>id</th>
              <th className='teacherlist-th'>firstName</th>
              <th  className='teacherlist-th'>Email</th>
              <th className='teacherlist-th'>Gender</th>
              <th className='teacherlist-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherliststore.studentData && Array.isArray(teacherliststore.studentData) ? (
              teacherliststore.studentData.map((student) => (
                <tr key={student.id}>
                  <td className='teacherlist-td'>{student.id}</td>
                  <td  className='teacherlist-td'>{student.firstName}</td>
                  <td  className='teacherlist-td'>{student.email}</td>
                  <td  className='teacherlist-td'>{student.gender}</td>
                  <td  className='teacherlist-td'>
                    <FaTrash className="teacherlist-delete-icon" onClick={() => handleDelete(student.id)} />
                    <FaEdit className="teacherlist-edit-addsteachert" onClick={() => handleEdit(student)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No student data available.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for displaying the form */}
        <Modal isOpen={teacherStore.showPopup} onRequestClose={() => teacherStore.setShowPopup(false)}>
          <TeacherPopup studentData={teacherFormStore.selectedStudent} />
        </Modal>
      </div>
    </>
  );
});

export default Teacherlist;
