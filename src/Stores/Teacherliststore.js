import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class Teacherliststore {
  studentData = [];
  selectedStudent = null;

  constructor() {
    makeObservable(this, {
      studentData: observable,
      selectedStudent: observable,
      fetchTeacherData: action,
      setStudentData: action,
      deleteStudentData: action,
    });
  }

  fetchTeacherData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const data = response.data.users;
      this.setStudentData(data);
    } catch (error) {
      console.error('Failed to fetch student data:', error);
    }
  };

  setStudentData = (data) => {
    this.studentData = data;
  };

  deleteStudentData = (studentId) => {
    this.studentData = this.studentData.filter((student) => student.id !== studentId);
  };
}

export const teacherliststore = new Teacherliststore();
