import React from 'react';
import '../styles.css'
import { app, auth } from '../firebase/firebase';

const MainPage = () => {

  const onTablePress = () => {
    // ! nav
  };

  const onGraphPress = () => {
    // ! nav
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1>LightMonitor</h1>
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