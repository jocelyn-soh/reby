import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../decks.css';
import ShowTags from './ShowTags';

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
      {decks.length > 0 ? (
        <div className="grid grid-cols-5">
        {decks.map((deckId) => (
            <div key = {deckId} className="ml-2 mt-4 max-w-xs rounded overflow-hidden shadow-lg">
                <img className="w-full" src="https://www.makerstations.io/content/images/2022/03/olja-lobkis-studygram-04.jpeg" alt="Study aesthetic" />
                <div className="px-6 pt-2">
                <div className="font-bold text-xl mb-2" >{deckId}</div>
                </div>
                <div className="px-6 pt-0 pb-2">
                <Link to={`decks/review/${deckId}`}  type="button" class="border border-black hover:bg-black-700 hover:bg-buttonHoverColor rounded-full text-sm p-1 inline-flex items-center">
                  <img src="review.svg" alt="review"/>
                  <span class="sr-only">Icon description</span>
                </Link>
                <Link to={`decks/review/quiz/${deckId}`} type="button" class="border border-black hover:bg-black-700 hover:bg-buttonHoverColor rounded-full text-sm p-1 inline-flex items-center ml-1">
                  <img src="quiz.svg" alt="quiz"/>
                  <span class="sr-only">Icon description</span>
                </Link>
                <button type="button" class="border border-black hover:bg-black-700 hover:bg-buttonHoverColor rounded-full text-sm p-1 inline-flex items-center ml-1">
                  <img src="edit.svg" alt="edit"/>
                  <span class="sr-only">Icon description</span>
                </button>
                <Link to={`decks/${deckId}/statistics`} type="button" class="border border-black hover:bg-black-700 hover:bg-buttonHoverColor rounded-full text-sm p-1 inline-flex items-center ml-1">
                  <img src="stats.svg" alt="stats"/>
                  <span class="sr-only">Icon description</span>
                </Link>
                </div>
                <ShowTags deckId={deckId}/>                
            </div>))}
        </div>
    ) : (
        <p className="noDecks text-xl mt-40 text-center" >No decks yet...start creating your first deck!</p>
    )}
    </div>
  );
};

export default Decks;
