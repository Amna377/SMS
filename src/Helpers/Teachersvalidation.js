import { toJS } from 'mobx';
import teacherFormStore from '../Stores/TeacherFormStore';

export const validateTeacherForm = () => {
  const { firstName, lastName, gender, password, phoneNumber, subject,teacherClass ,email} = teacherFormStore;

 
  teacherFormStore.setErrors({});

  if (firstName === '') {
    teacherFormStore.setErrors({ firstName: 'First Name is required' });
    return false;
  }
  if (teacherClass === '') {
    teacherFormStore.setErrors({ teacherClass: 'teacherClass is required' });
    return false;
  }
  

  if (lastName === '') {
    teacherFormStore.setErrors({ lastName: 'Last Name is required' });
    return false;
  }
  if (subject === '') {
    teacherFormStore.setErrors({ subject: 'Subject is required' });
    return false;
  }
  
  
  if (phoneNumber === '') {
    teacherFormStore.setErrors({ phoneNumber: 'Phone Number is required' });
    return false;
  }

  if (email === '') {
    teacherFormStore.setErrors({ email: 'email is required' });
    return false;
  }
  
  
  if (gender === '') {
    teacherFormStore.setErrors({ gender: 'Gender is required' });
    return false;
  }

  

 

 
  
 
  

  

  // Proceed with form data submission
  console.log('Form data submitted:', toJS(teacherFormStore));
  return true;
};
