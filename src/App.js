import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import Landing from './components/Landing';
import CreateDeck from './components/CreateDeck';
import ReviewDeck from './components/ReviewDeck';
import FlashcardQuiz from './components/FlashcardQuiz';
import DeckStatistics from './components/DeckStatistics';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route path='/account/decks/review/:deckId' element={<ReviewDeck />} />
        <Route path='/account/decks/review/quiz/:deckId' element={<FlashcardQuiz />} />
        <Route path='/account/decks/:deckId/statistics' element={<DeckStatistics />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
