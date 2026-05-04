import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.adminAuth);
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;
