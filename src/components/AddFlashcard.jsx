import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../createDeck.css';

const AddFlashcard = ({ deckName, tags }) => {
  const [flashcards, setFlashcards] = useState([{ front: '', back: '' }]);
  const { user } = UserAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIndex, setErrorIndex] = useState(-1);
  const [flashcardAdded, setFlashcardAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (flashcardAdded) {
      const timer = setTimeout(() => {
        setFlashcardAdded(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [flashcardAdded]);

  const handleAddFlashcard = (e) => {
    e.preventDefault();
    const lastFlashcard = flashcards[flashcards.length - 1];
    if (lastFlashcard.front && lastFlashcard.back) {
      setFlashcards((prevFlashcards) => [...prevFlashcards, { front: '', back: '' }]);
      setErrorIndex(-1);
      setErrorMessage('');
      setFlashcardAdded(true);
    } else {
      setErrorMessage('Please fill both the front and back fields before adding a new flashcard.');
      const emptyIndex = flashcards.findIndex((flashcard) => !flashcard.front || !flashcard.back);
      setErrorIndex(emptyIndex);
      setTimeout(() => {
        setErrorMessage('');
        setErrorIndex(-1);
      }, 2000);
    }
  };

  const handleDeckCompleted = async (e) => {
    e.preventDefault();

    try {
      const userCollectionRef = collection(firestore, user.uid);
      const documentRef = doc(userCollectionRef, deckName);
      await setDoc(documentRef, {
        'Total Flashcards': flashcards.length,
      });
      await setDoc(documentRef, {
        'Tags': tags, 
      })

      for (let i = 0; i < flashcards.length; i++) {
        const flashcard = flashcards[i];
        const userCollectionRef = collection(firestore, user.uid);
        const documentRef = doc(userCollectionRef, deckName);
        const flashcardsRef = collection(documentRef, (i + 1).toString()); // Increment index by 1
        const frontRef = doc(flashcardsRef, 'Front');
        const backRef = doc(flashcardsRef, 'Back');
        await setDoc(frontRef, {
          Content: flashcard.front,
        });
        await setDoc(backRef, {
          Content: flashcard.back,
        });
      }

      navigate('/Account');
    } catch (error) {
      console.error('Error completing deck:', error);
    }
  };

  return (
    <div className="deckContainer">
      <form className="formFlashcard">
        {flashcards.map((flashcard, index) => (
          <div
            className={`form-groupFlashcard ${errorIndex === index ? 'error' : ''}`}
            key={index}
          >
            <label>Front Flashcard</label>
            <input
              className="flashcard"
              type="text"
              value={flashcard.front}
              onChange={(e) => {
                const newFlashcards = [...flashcards];
                newFlashcards[index].front = e.target.value;
                setFlashcards(newFlashcards);
              }}
              required
            />
            <div style={{ marginTop: '1rem' }}>
              <label>Back Flashcard</label>
            </div>
            <input
              className="flashcard"
              type="text"
              value={flashcard.back}
              onChange={(e) => {
                const newFlashcards = [...flashcards];
                newFlashcards[index].back = e.target.value;
                setFlashcards(newFlashcards);
              }}
              required
            />
          </div>
        ))}
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <button type="button" className="addFlashcard-button" onClick={handleAddFlashcard}>
          Add Flashcard
        </button>
        <button type="submit" className="deckCompleted-button" onClick={handleDeckCompleted}>
          Deck Completed!
        </button>
      </form>
    </div>
  );
};

export default AddFlashcard;
