import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFlashcard from './AddFlashcard';
import DeckName from './DeckName';

const DeckContainer = () => {
  const [deckName, setDeckName] = useState('');
  const addFlashcardRef = useRef(null);
  const navigate = useNavigate()

  const scrollToFlashcard = () => {
    addFlashcardRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  const changeName = (deckName) => {
    setDeckName(deckName);
  }

  const backToHome = () => {
    navigate('/Account');
  }

  return (
    <div>
      <DeckName scrollToFlashcard={scrollToFlashcard} deckName={deckName} changeName={changeName} backToHome={backToHome} />
      <div ref={addFlashcardRef}>
        <AddFlashcard deckName={deckName} backToHome={backToHome} />
      </div>
    </div>
  );
};

export default DeckContainer;
