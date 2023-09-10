import { toJS } from 'mobx';
import studentFormStore from '../Stores/StudentFormStore';

export const validateStudentForm= () => {
  const { firstName, lastName, gender, password, phoneNumber, subject,teacherClass ,email} = studentFormStore;

 
  studentFormStore.setErrors({});

  if (firstName.trim() === '') {
    studentFormStore.setErrors({ firstName: 'First Name is required' });
    return false;
  }
  if (teacherClass.trim() === '') {
    studentFormStore.setErrors({ teacherClass: 'teacherClass is required' });
    return false;
  }
  

  if (lastName.trim() === '') {
    studentFormStore.setErrors({ lastName: 'Last Name is required' });
    return false;
  }
  if (subject.trim() === '') {
    studentFormStore.setErrors({ subject: 'Subject is required' });
    return false;
  }
  
  
  if (phoneNumber.trim() === '') {
    studentFormStore.setErrors({ phoneNumber: 'Phone Number is required' });
    return false;
  }

  if (email.trim() === '') {
    studentFormStore.setErrors({ email: 'email is required' });
    return false;
  }
  
  
  if (gender.trim() === '') {
    studentFormStore.setErrors({ gender: 'Gender is required' });
    return false;
  }
  if (password.trim() === '') {
    studentFormStore.setErrors({ password: ' is required' });
    return false;
  }

  

  console.log('Form data submitted:', toJS(studentFormStore));
  return true;
};
