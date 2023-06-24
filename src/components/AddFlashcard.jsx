import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../createDeck.css';

const AddFlashcard = ({ deckName }) => {
  const [frontFlashcard, setFrontFlashcard] = useState('');
  const [backFlashcard, setBackFlashcard] = useState('');
  const { user } = UserAuth();
  const [flashcardNumber, setFlashcardNumber] = useState(1);
  const [flashcardAdded, setFlashcardAdded] = useState(false);
  const [deckNameSaved, setDeckNameSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (flashcardAdded) {
      const timer = setTimeout(() => {
        setFlashcardAdded(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flashcardAdded]);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    if (frontFlashcard.trim() === '' || backFlashcard.trim() === '') return;

    try {
      setFlashcardNumber((currNum) => currNum + 1);
      const userCollectionRef = collection(firestore, user.uid);
      const documentRef = doc(userCollectionRef, deckName);
      await setDoc(documentRef, {
        'Total Flashcards': flashcardNumber,
      });
      const flashcardsRef = collection(documentRef, flashcardNumber.toString());
      const frontRef = doc(flashcardsRef, 'Front');
      const backRef = doc(flashcardsRef, 'Back');
      await setDoc(frontRef, {
        Content: frontFlashcard,
      });
      await setDoc(backRef, {
        Content: backFlashcard,
      });
      setFrontFlashcard('');
      setBackFlashcard('');
      setFlashcardAdded(true);
      setDeckNameSaved(true);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleDeckCompleted = async (e) => {
    e.preventDefault();

    try {
      if (!deckNameSaved) {
        const userCollectionRef = collection(firestore, user.uid);
        const documentRef = doc(userCollectionRef, deckName);
        await setDoc(documentRef, {
          'Total Flashcards': 0,
        });
      }

      navigate('/Account');
    } catch (error) {
      console.error('Error completing deck:', error);
    }
  };

  return (
    <div className="deckContainer">
      <form onSubmit={handleAddFlashcard} className="formFlashcard">
        <div className="form-groupFlashcard">
          <label>Front Flashcard</label>
          <input className="flashcard" type="text" value={frontFlashcard} onChange={(e) => setFrontFlashcard(e.target.value)} required />
          <label>Back Flashcard</label>
          <input className="flashcard" type="text" value={backFlashcard} onChange={(e) => setBackFlashcard(e.target.value)} required/>
        </div>
        <button type="submit" className="addFlashcard-button">
          Add Flashcard
        </button>
        {flashcardAdded && <p className={"addedFlashcard-message"}>Flashcard has been added!</p>}
        <button type="submit" className="deckCompleted-button" onClick={handleDeckCompleted}>
          Deck Completed!
        </button>
      </form>
    </div>
  );
};

export default AddFlashcard;
