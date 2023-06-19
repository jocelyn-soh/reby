import React, { useState } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import '../deck.css';

export const CreateDeck = () => {
  const [deckName, setDeckName] = useState('');
  const [frontFlashcard, setFrontFlashcard] = useState('');
  const [backFlashcard, setBackFlashcard] = useState('');
  const { user } = UserAuth();

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (deckName.trim() === '') return;

    try {
      const userCollectionRef = collection(firestore, user.uid);
      const documentRef = doc(userCollectionRef, deckName);
      await setDoc(documentRef, {});
      const flashcardsRef = collection(documentRef, 'Flashcard');
      const frontRef = doc(flashcardsRef, 'Front');
      const backRef = doc(flashcardsRef, 'Back');
      await setDoc(frontRef, {
        'Content': frontFlashcard
      });
      await setDoc(backRef, {
        'Content': backFlashcard
      })
      setDeckName('');
      setFrontFlashcard('');
      setBackFlashcard('');
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  }
    

  return (
    <div className="container">
    <header className='border-black border-20px h-20 py-2 flex justify-center items-center' style={{backgroundColor: '#F7F4E6'}}>
      <img
        className="mt-10 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-40"
        src="reby-logo.png"
        alt="Reby's logo"
      />
    </header>
    <div className='h-10 w-full pl-80 flex justify-center items-center' style={{backgroundColor: '#F7F4E6', fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
    </div>
      <form onSubmit={handleCreateDeck} className="form">
        <div className="form-group">
          <label>Deck Name</label>
          <input
            className='deckName'
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Deck Name"
          />
        </div>
        <div className="form-group">
          <label>Front Flashcard</label>
            <input
            className='flashcard'
            type="text"
            value={frontFlashcard}
            onChange={(e) => setFrontFlashcard(e.target.value)}
            />
          <label>Back Flashcard</label>
          <input
            className='flashcard'
            type="text"
            value={backFlashcard}
            onChange={(e) => setBackFlashcard(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Create Deck</button>
      </form>
    </div>
  );
  
};

export default CreateDeck;



