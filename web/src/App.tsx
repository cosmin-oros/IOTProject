import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { PageRoutes} from './routes/PageRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TablePage from './pages/TablePage';
import GraphPage from './pages/GraphPage';

function App() {
  return (
    <Routes>
      <Route path={PageRoutes.Main} Component={MainPage}/>
      <Route path={PageRoutes.Login} Component={LoginPage}/>
      <Route path={PageRoutes.Register} Component={RegisterPage}/>
      <Route path={PageRoutes.Table} Component={TablePage}/>
      <Route path={PageRoutes.Graph} Component={GraphPage}/>
    </Routes>
  );
}

export default App;