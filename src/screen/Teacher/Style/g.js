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
  const isEditMode = !!studentData; // Check if studentData exists (indicating Edit mode)

  // When the popup is opened for editing, set the form data with the student data
  React.useEffect(() => {
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
    // ... (same as before)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateTeacherForm();

    if (isValid) {
      try {
        if (isEditMode) {
          // If in Edit mode, update the teacher data
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
          // If not in Edit mode, add a new teacher
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
        teacherStore.setShowPopup(false); // Close the popup after submission
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
      {/* ... (same as before) */}
    </div>
  );
});

export default AddTeacherPopup;
