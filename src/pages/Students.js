import React from 'react';
import { observer } from 'mobx-react';
 import {validateStudentForm} from '../Helpers/Studentvalidation'
import '../screen/Student/Style/Student.css'
import { FaPlusCircle } from 'react-icons/fa';
import FormStoreStudent  from '../Stores/StudentFormStore'
import StudentStoreClass from '../Stores/StudentStore';
import axios from 'axios';
import Swal from 'sweetalert2';
import StudentFormStore from '../Stores/StudentFormStore';
const Student = observer(() => {
  const handleAddTeacherClick = () => {
    StudentStoreClass.setShowPopup(true);
  };
 


const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = validateStudentForm();
  console.log(isValid);

  if (isValid) {
    try {
      const response = await axios.post(
        'https://dummy.restapiexample.com/api/v1/create',
        {
          firstName: FormStoreStudent.firstName,
          lastName: FormStoreStudent.lastName,
          teacherClass: FormStoreStudent.teacherClass,
          subject: FormStoreStudent.subject,
          phoneNumber: FormStoreStudent.phoneNumber,
          gender: FormStoreStudent.gender,
          email: FormStoreStudent.email,
        }
      );

      console.log(FormStoreStudent.firstName);

      await Swal.fire({
        icon: 'success',
        title: 'Student added successfully!',
        showConfirmButton: false,
        timer: 5000,
        customClass: {
          container: 'my-swal-container',
          title: 'my-swal-title',
          content: 'my-swal-content',
        },
      });

      FormStoreStudent.resetForm();
      StudentStoreClass.setShowPopup(true);
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Failed to add student',
        text: 'Please try again.',
        customClass: {
          container: 'my-swal-container',
          title: 'my-swal-title',
          content: 'my-swal-content',
        },
      });
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fill in all the required fields.',
      customClass: {
        container: 'my-swal-container',
        title: 'my-swal-title',
        content: 'my-swal-content',
      },
    });
  }
};

  
   const  resetForm = () => {
    FormStoreStudent.resetForm();
    
    
  };



  const closePopup = () => {
   StudentStoreClass.setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      FormStoreStudent.setFirstName(value);
      
    } else if (name === 'lastName') {
      FormStoreStudent.setLastName(value);
    } else if (name === 'teacherClass') {
      FormStoreStudent.setTeacherClass(value); 
      
    } else if (name === 'subject') {
      FormStoreStudent.setSubject(value);
    } else if (name === 'phoneNumber') {
      FormStoreStudent.setPhoneNumber(value); 
    } else if (name === 'password') {
      FormStoreStudent.setPassword(value);
    } else if (name === 'gender') {
      FormStoreStudent.setGender(value);
    } else if (name === 'email') {
      FormStoreStudent.setEmail(value); 

    }
  };

  return (
    <>
      <span id="teacher">Student</span>
      <button id="right-button" onClick={handleAddTeacherClick}>
        Add Student
      </button>

      {StudentStoreClass.showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span id="crosspopup" onClick={closePopup}>
              &times;
            </span>
            <h2 id="h2-addteacher">Add Student</h2>
            <form id="addTeacher-horizontal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="addTeacher-firstName" id="addTeacher-label-firstName">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="addTeacher-firstName"
                    name="firstName"
                    value={FormStoreStudent.firstName}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.firstName && (
                    <span className="error-message">{FormStoreStudent.errors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="addTeacher-lastName" id="addTeacher-label-lastName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="addTeacher-lastName"
                    name="lastName"
                    value={FormStoreStudent.lastName}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.lastName && (
                    <span className="error-message">{FormStoreStudent.errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="addTeacher-teacherClass" id="addTeacher-label-teacherClass">
                    Class:
                  </label>
                  <input
                    type="text"
                    id="addTeacher-teacherClass"
                    name="teacherClass"
                    value={FormStoreStudent.teacherClass}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.teacherClass && (
                    <span className="error-message">{FormStoreStudent.errors.teacherClass}</span>
                  )}
                 
                </div>
                <div className="form-group">
                  <label htmlFor="addTeacher-subject" id="addTeacher-label-subject">
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="addTeacher-subject"
                    name="subject"
                    value={FormStoreStudent.subject}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.subject && (
                    <span className="error-message">{FormStoreStudent.errors.subject}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="addTeacher-phoneNumber" id="addTeacher-label-phoneNumber">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="addTeacher-phoneNumber"
                    name="phoneNumber"
                    value={FormStoreStudent.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.phoneNumber && (
                    <span className="error-message">{FormStoreStudent.errors.phoneNumber}</span>
                  )}
                  
                </div>
                <div className="form-group">
                  <label htmlFor="addTeacher-email" id="addTeacher-label-password">
                  password
                  </label>
                  <input
                    type="password"
                    id="addTeacher-email"
                    name="password"
                    value={FormStoreStudent.password}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.password && (
                    <span className="error-message">{FormStoreStudent.errors.password}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="addTeacher-gender" id="addTeacher-label-gender">
                    Gender:
                  </label>
                  <select
                    id="addTeacher-gender"
                    name="gender"
                    value={FormStoreStudent.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {FormStoreStudent.errors.gender && (
                    <span className="error-message">{FormStoreStudent.errors.gender}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="addTeacher-email" id="addTeacher-label-email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="addTeacher-email"
                    name="email"
                    value={FormStoreStudent.email}
                    onChange={handleInputChange}
                  />
                  {FormStoreStudent.errors.email && (
                    <span className="error-message">{FormStoreStudent.errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-group button-row">
                <button id="addTeacher-button-popup" onClick={handleSubmit} type="button">
                  Add Student
                </button>
                <button id="addTeacher-add-another" onClick={resetForm}>
                  <FaPlusCircle /> Add another Student
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
});

export default Student;
