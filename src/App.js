import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import Landing from './components/Landing'
import CreateDeck from './components/CreateDeck';
import Decks from './components/Decks'; 
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path='/createdeck' element={<CreateDeck />} />
        <Route path='/decks' element={<Decks />}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
