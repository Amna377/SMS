import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class AuthStore {
  formFields = {
    username: '',
    password: '',
  };

  errors = '';
  isLoggedIn = false;

  constructor() {
    makeObservable(this, {
      formFields: observable,
      errors: observable,
      isLoggedIn: observable,
      setError: action,
      validateForm: action,
      login: action,
      logout: action,
      setFormField: action,
      clearFormFields: action,
    });
  }

  setFormField(field, value) {
    this.formFields[field] = value;
  }

  setError(errors) {
    this.errors = errors;
  }

  validateForm() {
    this.errors = {};

    if (this.formFields.username === '') {
      this.errors.username = 'username is required';
      return true;
    }

    if (this.formFields.password === '') {
      this.errors.password = 'Password is required';
      return true;
    }

    return false;
  }


  async login() {
    if (this.validateForm()) {
      this.isLoggedIn = false;
    } else {
      // Simulate a successful login without sending data to the backend
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    }
  }

  clearFormFields() {
    this.formFields.username = '';
    this.formFields.password = '';
    
    
  }

  logout() {
    this.formFields.username = '';
    this.formFields.password = '';
    this.isLoggedIn = false;
    this.errors = '';
  }
}

const authStore = new AuthStore();
export default authStore;
