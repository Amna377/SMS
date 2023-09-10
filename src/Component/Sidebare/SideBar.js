import React from 'react';
import { observer } from 'mobx-react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaChevronUp, FaChevronDown, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useNavigate ,useLocation} from 'react-router-dom';
import { sidebarStore } from './store';
import { menuItem } from './Routes';
import './Style.css';
import mylogo from '../../assets/Asset2.png';

import authStore from '../../screen/login form/store/loginstore';

const SideBar = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/Sidebar';
  const navigate = useNavigate(); 
  
  // const isDashboardPage = false; // Replace with your logic for determining if it's a dashboard page

  const toggleMenu = (index) => {
    sidebarStore.toggleMenu(index);
  };

  const closeSidebar = () => {
    sidebarStore.setSidebarOpen(false);
  };

  const handeLogout = () => {
    authStore.logout(); 
    navigate('/');
  };

  const handleMouseEnter = (index) => {
    sidebarStore.handleMouseEnter(index);
  };

  const handleMouseLeave = () => {
    sidebarStore.handleMouseLeave();
  };

  return (
    <div className="grid-container">
      {/* Header */}
      <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
        <div className="menu-icon" onClick={() => sidebarStore.setSidebarOpen(true)}>
          <FaBars />
        </div>
        <div className="header-left">

          <form id="search-form">
            <div class="search-container">
              <input type="text" name="search" placeholder="Search.." />
              <FaSearch className="search-icon" />
            </div>
          </form>

        </div>
        <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
          <span id="header-icon"><FaBell /></span>
          <span id="header-icon"><FaUserCircle /></span>
          <button id="logout-btn" onClick={handeLogout}>
            Logout <span className="material-icons-outlined"><FaSignOutAlt /></span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside id="sidebar" className={sidebarStore.sidebarOpen ? 'sidebar-responsive' : ''}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            {/* logo  */}
            <img src={mylogo} alt='Logo' style={{ width: '165px' }} />
          </div>
          <span className="material-icons-outlined" onClick={closeSidebar} style={{ cursor: 'pointer' }}><FaTimes /></span>
        </div>
        <ul className="link">
          {menuItem.map((item, index) => (
            <li key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              <NavLink to={item.path} className="navlink">
                <div className="navlink1" onClick={() => toggleMenu(index)}>
                  <div className="icon">{item.icon}</div>
                  {item.name}
                  {item.subitems && (
                    <div className="menu-item-arrow">
                      {sidebarStore.openMenus.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  )}
                </div>
              </NavLink>
              {item.subitems && sidebarStore.openMenus.includes(index) && (
                <ul className='sub-menu'>
                  {item.subitems.map((subitem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subitem.path} className="navlink">
                        <div className='navlink1'>
                          {subitem.name}
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-container ${isDashboardPage ? 'dashboard-content' : ''}`}>
        {/* Your main content goes here */}
        <Outlet />
      </main>
    </div>
  );
});

export default SideBar;
