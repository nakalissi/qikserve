import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import MenuPage from '../components/pages/MenuPage';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MenuPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
