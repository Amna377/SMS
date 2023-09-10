import { observable, action, makeObservable } from 'mobx';

class SubjectStore {
  showPopup = false;

  constructor() {
    makeObservable(this, {
      showPopup: observable,
      setSubjectShowPopup: action,
    });
  }

 
  setSubjectShowPopup(value) {
    this.showPopup = value;
  }
  

  // Add other actions and observables as needed
}

const subjectstore = new SubjectStore();
export default subjectstore;
