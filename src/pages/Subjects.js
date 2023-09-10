// AddTeacherButton.js
import React from 'react';
import { observer } from 'mobx-react';
import SubjectPopup from '../screen/Subject/SubjectPopup';
import subjectstore from '../Stores/Subjects';

const Subjects = observer(() => {
  const handleAddTeacherClick = () => {
    subjectstore.setSubjectShowPopup(true);
  };

  return (
    <>
      <span id="teacher">Subjects</span>
      <button id="right-button" onClick={handleAddTeacherClick}>
        Add Subject
      </button>

      {subjectstore.showPopup && <SubjectPopup />}
    </>
  );
});

export default Subjects;
