import React from 'react';
import { observer } from 'mobx-react';
import teacherFormStore from '../../Stores/TeacherFormStore';
import axios from 'axios';
import '../Teacher/Style/Teacher.css';
import Swal from 'sweetalert2';
import teacherStore from '../../Stores/TeacherStore';
import { validateTeacherForm } from '../../Helpers/Teachersvalidation';
import { FaPlusCircle } from 'react-icons/fa';

const AddTeacherPopup = observer(({ studentData }) => {
  const isEditMode = !!studentData;

  React.useEffect(() => {
    console.log('data',studentData)
    if (studentData) {
      teacherFormStore.setFirstName(studentData.firstName);
     
      teacherFormStore.setLastName(studentData.lastName);
      teacherFormStore.setTeacherClass(studentData.teacherClass);
      teacherFormStore.setSubject(studentData.subject);
      teacherFormStore.setPhoneNumber(studentData.phoneNumber);
      teacherFormStore.setGender(studentData.gender);
      teacherFormStore.setEmail(studentData.email);
     
    }
  }, [studentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      teacherFormStore.setFirstName(value);
    } else if (name === 'lastName') {
      teacherFormStore.setLastName(value);
    } else if (name === 'teacherClass') {
      teacherFormStore.setTeacherClass(value);
    } else if (name === 'subject') {
      teacherFormStore.setSubject(value);
    } else if (name === 'phoneNumber') {
      teacherFormStore.setPhoneNumber(value);
    } else if (name === 'gender') {
      teacherFormStore.setGender(value);
    } else if (name === 'email') {
      teacherFormStore.setEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateTeacherForm();

    if (isValid) {
      try {
        if (isEditMode) {
          const response = await axios.put(
            `https://dummy.restapiexample.com/api/v1/update/${studentData.id}`,
            {
              firstName: teacherFormStore.firstName,
              lastName: teacherFormStore.lastName,
              teacherClass: teacherFormStore.teacherClass,
              subject: teacherFormStore.subject,
              phoneNumber: teacherFormStore.phoneNumber,
              gender: teacherFormStore.gender,
              email: teacherFormStore.email,
            }
          );

          console.log(response.data);

          await Swal.fire({
            icon: 'success',
            title: 'Teacher updated successfully!',
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              content: 'my-swal-content',
            },
          });
        } else {
          const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', {
            firstName: teacherFormStore.firstName,
            lastName: teacherFormStore.lastName,
            teacherClass: teacherFormStore.teacherClass,
            subject: teacherFormStore.subject,
            phoneNumber: teacherFormStore.phoneNumber,
            gender: teacherFormStore.gender,
            email: teacherFormStore.email,
          });

          console.log(response.data);

          await Swal.fire({
            icon: 'success',
            title: 'Teacher added successfully!',
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              content: 'my-swal-content',
            },
          });
        }

        teacherFormStore.resetForm();
        teacherStore.setShowPopup(true);
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: 'error',
          title: 'Failed to save teacher',
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

  const handleClosePopup = () => {
    teacherStore.setShowPopup(false);
    teacherFormStore.resetForm();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span id="crosspopup" onClick={handleClosePopup}>
          &times;
        </span>
        <h2 id="h2-addteacher">{isEditMode ? 'Edit Teacher' : 'Add Teacher'}</h2>
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
                value={teacherFormStore.firstName}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.firstName && (
                <span className="error-message">{teacherFormStore.errors.firstName}</span>
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
                value={teacherFormStore.lastName}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.lastName && (
                <span className="error-message">{teacherFormStore.errors.lastName}</span>
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
                value={teacherFormStore.teacherClass}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.teacherClass && (
                <span className="error-message">{teacherFormStore.errors.teacherClass}</span>
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
                value={teacherFormStore.subject}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.subject && (
                <span className="error-message">{teacherFormStore.errors.subject}</span>
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
                value={teacherFormStore.phoneNumber}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.phoneNumber && (
                <span className="error-message">{teacherFormStore.errors.phoneNumber}</span>
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
                value={teacherFormStore.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {teacherFormStore.errors.gender && (
                <span className="error-message">{teacherFormStore.errors.gender}</span>
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
                value={teacherFormStore.email}
                onChange={handleInputChange}
              />
              {teacherFormStore.errors.email && (
                <span className="error-message">{teacherFormStore.errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-group button-row">
            <button id="addTeacher-button-popup" onClick={handleSubmit} type="button">
              {isEditMode ? 'Update Teacher' : 'Add Teacher'}
            </button>
            <button id="addTeacher-add-another" onClick={handleClosePopup}>
              <FaPlusCircle /> Add another
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddTeacherPopup;
