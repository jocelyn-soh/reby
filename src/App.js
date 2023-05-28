import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
