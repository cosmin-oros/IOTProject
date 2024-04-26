import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { PageRoutes} from './routes/PageRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TablePage from './pages/TablePage';
import GraphPage from './pages/GraphPage';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from './firebase/firebase';

function App() {
  const [initialRoute, setInitialRoute] = useState(PageRoutes.Register);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitialRoute(PageRoutes.Main); 
      } else {
        setInitialRoute(PageRoutes.Register);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* {initialRoute === PageRoutes.Main && <Route path={PageRoutes.Main} element={<MainPage />} />}
        {initialRoute === PageRoutes.Register && <Route path={PageRoutes.Register} element={<RegisterPage />} />} */}
        <Route path={PageRoutes.Main} element={<MainPage />} />
        <Route path={PageRoutes.Register} element={<RegisterPage />} />
        <Route path={PageRoutes.Login} element={<LoginPage />} />
        <Route path={PageRoutes.Table} element={<TablePage />} />
        <Route path={PageRoutes.Graph} element={<GraphPage />} />
      </Routes>
    </Router>
  );
}

export default App;
