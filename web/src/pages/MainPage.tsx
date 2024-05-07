import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { FaSignOutAlt } from 'react-icons/fa'; 
import '../styles.css';
import { PageRoutes } from '../routes/PageRoutes';
import Lottie from 'react-lottie';
import lightbulbAnimation from "../assets/lightbulb.json"; 

const MainPage = () => {
  const navigate = useNavigate();
  const lottieRef = useRef<Lottie|null>(null);
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lightbulbAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const onTablePress = () => {
    // Navigate to the table page
    navigate(PageRoutes.Table);
  };

  const onGraphPress = () => {
    // Navigate to the graph page
    navigate(PageRoutes.Graph);
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
        <div className="imageContainer">
          <Lottie
            ref={lottieRef}
            options={defaultOptions}
            height={600}
            width={600}
          />
        </div>
        <div className='row-container'>
          <button className='button table-btn' onClick={onTablePress}>
            Table
          </button>
          <button className='button graph-btn' onClick={onGraphPress}>
            Graph
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
