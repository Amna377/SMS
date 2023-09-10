// AddTeacherButton.js
import React from 'react';
import { observer } from 'mobx-react';
import teacherStore from '../Stores/TeacherStore';
import TeacherPopup from '../screen/Teacher/TeacherPopup';

const Teacher = observer(() => {
  const handleAddTeacherClick = () => {
    teacherStore.setShowPopup(true);
  };

  return (
    <>
      <span id="teacher">Teachers</span>
      <button id="right-button" onClick={handleAddTeacherClick}>
        Add Teacher
      </button>

      {teacherStore.showPopup && <TeacherPopup />}
    </>
  );
});

export default Teacher;
