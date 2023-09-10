import { observable, action, makeObservable } from 'mobx';

class StudentStoreClass {
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

  
}

const StoreStudent = new StudentStoreClass();
export default StoreStudent;
