import React from 'react';
import './loginForm.css'
import  iconemail from '../../assets/img 2 .png';
import icon1 from '../../assets/icon.png';
import { observer } from 'mobx-react-lite';
import authStore from './store/loginstore';
import { useNavigate } from 'react-router-dom';
import myImage from '../../assets/download 2.png';


const LoginForm = observer(() => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    authStore.setFormField(name, value);
  };

  // console.log(authStore.isLoggedIn);
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    if (!authStore.validateForm()) {
      authStore.login();
      console.log(authStore.login);
  
      if (authStore.isLoggedIn) {
        navigate('/SideBar');
        authStore.clearFormFields(); // Move the clearFormFields call here
      }
    }
  };
  
  
  

  return (
    <div className="login-container">
      <div className="login-form-column">
        <h2 className="login-h2">Login to Your Account!</h2>
        <text className="login-text-content">start managing your results faster and better</text>
        <form className="login-form" onSubmit={handleButtonClick}>
          <label className="login-label">username:</label>
          <div className="login-icon-container">
            <input
              type="username"
              className='login-email'
              placeholder="Enter username or username"
              name="username"
              value={authStore.formFields.username}
              onChange={handleInputChange}
            />
            <img src={iconemail} className="login-icon-login" alt="" />
          </div>
          {authStore.errors.username && <div className="login-error-message">{authStore.errors.username}</div>}

          <label className="login-label">Password:</label>
          <div className="login-icon-container">
            <input
              placeholder="Enter your password"
              type="password"
              className='login-password'
              name="password"
              autoComplete="current-password"
              value={authStore.formFields.password}
              onChange={handleInputChange}
            />
            <img src={icon1} className="login-icon-login" alt="" />
          </div>
          {authStore.errors.password && <div className="login-error-message">{authStore.errors.password}</div>}
           <div> <button className="buttom-login" type="submit">LOGIN</button></div>
          
        </form>
        
      </div>
      <div className="login-img-column">
        <img src={myImage} alt="YourImage" />
      </div>
    </div>
  );
});

export default LoginForm;
