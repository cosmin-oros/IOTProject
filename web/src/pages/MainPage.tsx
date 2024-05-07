import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { FaSignOutAlt } from 'react-icons/fa'; 
import '../styles.css';
import { PageRoutes } from '../routes/PageRoutes';

const MainPage = () => {
  const navigate = useNavigate();

  const onTablePress = () => {
    // Navigate to the table page
    navigate('/table');
  };

  const onGraphPress = () => {
    // Navigate to the graph page
    navigate('/graph');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate(PageRoutes.Register);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1>LightMonitor</h1>
        <button className='logout-btn' onClick={handleLogout}>
          <FaSignOutAlt /> 
        </button>
      </div>    
      <div className='content'>
        <div className='row-container'>
          <button className='btn-main' onClick={onTablePress}>
            Table
          </button>
          <button className='btn-main' onClick={onGraphPress}>
            Graph
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
