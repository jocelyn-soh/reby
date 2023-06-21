import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { collection, getDocs } from 'firebase/firestore';

const Decks = () => {
  const [decks, setDecks] = useState([]);
  const { user } = UserAuth();
  console.log(user);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        if (user && user.uid) {
          const deckQuerySnapshot = await getDocs(collection(firestore, user.uid));
          const deckList = deckQuerySnapshot.docs.map((doc) => doc.id);
          setDecks(deckList);
        }
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };
    fetchDecks();
  }, [user]);
  
  

  return (
    <div>
      <h2>Your Decks:</h2>
      {decks.length > 0 ? (
        <ul>
          {decks.map((deck) => (
            <li key={deck}>{deck}</li>
          ))}
        </ul>
      ) : (
        <p>No decks available.</p>
      )}
    </div>
  );
};

export default Decks;

