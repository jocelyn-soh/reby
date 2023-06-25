import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '../carousel.css';

const ReviewDeck = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [allCollections, setAllCollections] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const fetchChooseCollection = async () => {
      try {
        if (user && user.uid && deckId) { 
          const numOfFlashcardsRef = doc(firestore, user.uid, deckId);
          const numOfFlashcardsDoc = await getDoc(numOfFlashcardsRef);
          const numOfFlashcards = numOfFlashcardsDoc.data()['Total Flashcards'];
  
          const tempCollections = [];
  
          for (let i = 1; i <= numOfFlashcards; i++) {
            const chooseRef = collection(firestore, user.uid, deckId, i.toString());
            const chooseSnapshot = await getDocs(chooseRef);
            const chooseData = chooseSnapshot.docs.map((doc) => doc.data());
  
            tempCollections.push(chooseData);
          }
  
          setAllCollections(tempCollections);
        }
      } catch (error) {
        console.error('Error fetching choose collection:', error);
      }
    };
  
    fetchChooseCollection();
  }, [user, deckId]); 
  

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === allCollections.length - 1 ? 0 : prevCard + 1));
  };

  const handlePreviousCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? allCollections.length - 1 : prevCard - 1));
  };

  const backToHome = () => {
    navigate('/Account');
  };

  return (
    <div className="reviewContainer">
      <header className="border-black border-20px h-20 py-2 flex justify-center items-center" style={{ backgroundColor: '#F7F4E6' }}>
        <img className="mt-2 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-40" src="/reby-logo.png" alt="Reby's logo" />
      </header>
      <div className="h-2 w-full pl-80 flex justify-center items-center" style={{ backgroundColor: '#F7F4E6', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
        <button type="submit" className="back-button" onClick={backToHome}>
          Back
        </button>
      </div>
      <div className="carousel-container">
        <div className="carousel">
          {allCollections.length > 0 ? (
            <div className="card-wrapper">
              {allCollections.map((documentData, index) => (
                <div
                  key={index}
                  className={`card ${index === currentCard ? 'active' : ''}`}
                  style={{ transform: `translateX(${(index - currentCard) * 100}%)` }}
                >
                  <div className="front">
                    {documentData && documentData[1] && (
                      <div className="card-content">
                        {Object.entries(documentData[1]).map(([key, value]) => (
                          <p key={key}>{value}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="back">
                    {documentData && documentData[0] && (
                      <div className="card-content">
                        {Object.entries(documentData[0]).map(([key, value]) => (
                          <p key={key}>{value}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="noFlashcards-message">No flashcards found!</p>
          )}
        </div>
      </div>
      <div className="navigation">
        <button className="nav-button" onClick={handlePreviousCard} disabled={allCollections.length <= 1}>
          Previous
        </button>
        <button className="nav-button" onClick={handleNextCard} disabled={allCollections.length <= 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewDeck;
