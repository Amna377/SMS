import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import LoginForm from './screen/login form/loginform';
import SideBar from './Component/Sidebare/SideBar';
import Classes from './pages/Classes'
import  Features from './pages/Features';
 import Teachers from './pages/Teachers'
import Report from './pages/Report';

import Students from './pages/Students';
import Setting from './pages/Setting';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Studentlist from './pages/Studentlist';
import Teacherlist from './screen/Teacher/TeacherList';
import Subjects from './pages/Subjects';
import SubjectList from './pages/SubjectList';



const App = () => {
  return (
    <div>
     
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="SideBar" element={<SideBar />} >
        <Route index element={<Dashboard />} />
        <Route path="Classes" element={<Classes />} />
        <Route path="Features" element={<Features />} />
        <Route path="Report" element={<Report />} />
        <Route path="Subjects" element={<Subjects />} />
        <Route path="Students" element={<Students />} />
        <Route path="SubjectList" element={<SubjectList/>} />
        <Route path="Teachers" element={< Teachers />} />
        <Route path="settings" element={<Setting />} />
        <Route path="Test" element={<Test />} />
        <Route path="Teacherlist" element={<Teacherlist/>} />
        <Route path="Studentlist" element={<Studentlist/>} />
     
        <Route path="*" element={<>Not found</>} />
        </Route>
      </Routes>
      
    </div>
    
  );
};

export default App;
