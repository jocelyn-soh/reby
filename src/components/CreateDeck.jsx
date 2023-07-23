import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFlashcard from './AddFlashcard';
import DeckName from './DeckName';
import AddTags from './AddTags';
import '../addTags.css'; 

const DeckContainer = () => {
  const [deckName, setDeckName] = useState('');
  const [tags, setTags] = useState([]); 
  const addTagsRef = useRef(null); 
  const addFlashcardRef = useRef(null);
  const navigate = useNavigate();

  const scrollToAddTags = () => {
    addTagsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFlashcard = () => {
    addFlashcardRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  const changeName = (deckName) => {
    setDeckName(deckName);
  };

  const backToHome = () => {
    navigate('/Account');
  };

  const changeTags = (value) => {
    setTags([...tags, value]);
  }; 

  const removeTags= (index) => {
    setTags(tags.filter((l, i) => i !== index))
}

  return (
    <div>
        <DeckName scrollToAddTags={scrollToAddTags} deckName={deckName} changeName={changeName} backToHome={backToHome} />

      <div ref={addTagsRef} className="form-group1">
      <label className="ml-60 p-5 ">Enter some tags.</label>
        <AddTags className="ml-60 p-5" scrollToFlashcard={scrollToFlashcard} tags={tags} changeTags={changeTags} removeTags={removeTags} /> 
      </div>
      <button type="submit" className="next-button" onClick={scrollToFlashcard}>
          Next
        </button>
      

      <div ref={addFlashcardRef}>
        <AddFlashcard deckName={deckName} tags={tags} backToHome={backToHome} />
      </div>
      
    </div>
  );
};

export default DeckContainer;
