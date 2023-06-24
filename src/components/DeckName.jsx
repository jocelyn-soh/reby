import React from 'react';
import '../createDeck.css';

const CreateDeck = ({ deckName, changeName, scrollToFlashcard, backToHome}) => {

  const handleCreateDeck = async (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  return (
    <div className="deckContainer">
      <header className="border-black border-20px h-20 py-2 flex justify-center items-center" style={{ backgroundColor: '#F7F4E6' }}>
        <img className="mt-10 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-40" src="reby-logo.png" alt="Reby's logo" />
      </header>
      <div className="h-10 w-full pl-80 flex justify-center items-center" style={{ backgroundColor: '#F7F4E6', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
        <button type="submit" className="back-button" onClick={backToHome}>
          Back
        </button>
      </div>
      <form onSubmit={handleCreateDeck} className="form">
        <div className="form-group">
          <label>Please enter a deck name.</label>
          <input className="deckName" type="text" value={deckName} onChange={(e) => changeName(e.target.value)} placeholder="Deck Name" required />
        </div>
        <button type="submit" className="submit-button" onClick={scrollToFlashcard}>
          Create Deck
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
