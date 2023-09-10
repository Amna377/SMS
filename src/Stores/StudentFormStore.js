import { observable, action, makeObservable } from 'mobx';

class FormStoreStudent{
  showPopup = false;
  firstName = '';
  lastName = '';
  teacherClass='';
  validationMessage = '';
  subject = '';
  phoneNumber = '';
  password = '';
  gender = 'male';
  email = '';
  errors = {}; // Initialize errors object

  constructor() {
    makeObservable(this, {
      showPopup: observable,
      firstName: observable,
      lastName: observable,
      subject: observable,
      teacherClass:observable,
      phoneNumber: observable,
      password: observable,
      gender: observable,
      email: observable,
      errors: observable,
      setFirstName: action,
      setLastName: action,
      setSubject: action,
      setPhoneNumber: action,
      setPassword: action,
      setGender: action,
      setEmail: action,
      resetForm: action,
      setErrors: action,
      setTeacherClass: action, // Corrected method name
    });
  }

  setFirstName(value) {
    this.firstName = value;
  }

  setLastName(value) {
    this.lastName = value;
  }

  setSubject(value) {
    this.subject = value;
  }

  setPhoneNumber(value) {
    this.phoneNumber = value;
  }

  setPassword(value) {
    this.password = value;
  }

  setGender(value) {
    this.gender = value;
  }

  setEmail(value) {
    this.email = value;
  }

  setTeacherClass(value) {
    this.teacherClass = value; 
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.subject = '';
    this.phoneNumber = '';
    this.password = '';
    this.gender = 'male';
    this.email = '';
    this.teacherClass='';
    this.errors = {};
  }

  setErrors(errors) {
    this.errors = { ...this.errors, ...errors };
    
  }
}

const StudentFormStore = new FormStoreStudent();
export default StudentFormStore;
