import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { PageRoutes } from './routes/PageRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TablePage from './pages/TablePage';
import GraphPage from './pages/GraphPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

function App() {
  const [initialRoute, setInitialRoute] = useState<PageRoutes | null>(null);

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

  if (initialRoute === null) {
    // Loading state, you can return a loader or something here
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path={PageRoutes.Main} element={<MainPage />} />
        <Route path={PageRoutes.Register} element={<RegisterPage />} />
        <Route path={PageRoutes.Login} element={<LoginPage />} />
        <Route path={PageRoutes.Table} element={<TablePage />} />
        <Route path={PageRoutes.Graph} element={<GraphPage />} />
        {!auth.currentUser && <Route path="*" element={<Navigate to={PageRoutes.Register} />} />}
      </Routes>
    </Router>
  );
}

export default App;
