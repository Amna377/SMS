import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class StudentListStore {
  studentData = [];
  editingStudentId = null;
  editedStudentData = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchStudentData = async () => {
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

  setEditingStudentId = (studentId) => {
    this.editingStudentId = studentId;
    this.editedStudentData = { ...this.studentData.find((student) => student.id === studentId) };
  };

  setEditedStudentData = (field, value) => {
    this.editedStudentData[field] = value;
  };

  saveEditedStudentData = () => {
    const updatedStudentData = this.studentData.map((student) =>
      student.id === this.editingStudentId ? this.editedStudentData : student
    );
    this.setStudentData(updatedStudentData);
    this.setEditingStudentId(null);
  };

  cancelEdit = () => {
    this.editedStudentData = {};
    this.setEditingStudentId(null);
  };

  getEditingStudentId = () => {
    return this.editingStudentId;
  };

  getEditedStudentData = () => {
    return this.editedStudentData;
  };
}

const studentStore = new StudentListStore();
export default studentStore;
