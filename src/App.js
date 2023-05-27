import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <div>
        <img
            className="mx-auto h-40 w-auto"
            src="reby-logo.png"
            alt="Reby's logo"
      />

      <h1 className='text-center text-4xl font-bold'>
        Welcome to Reby!
      </h1>
  
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
    </div>
  );
}

export default App;