import { observable, action, makeObservable } from 'mobx';

class TeacherStore {
  showPopup = false;

  constructor() {
    makeObservable(this, {
      showPopup: observable,
      setShowPopup: action,
    });
  }

 
  setShowPopup(value) {
    this.showPopup = value;
  }
  

  // Add other actions and observables as needed
}

const teacherStore = new TeacherStore();
export default teacherStore;
