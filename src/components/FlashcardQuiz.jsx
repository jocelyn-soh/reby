import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '../carousel.css';

const FlashcardQuiz = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [allCollections, setAllCollections] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [classification, setClassification] = useState(null);
  const [flashcardIndex, setFlashcardIndex] = useState(1);
  const [flippedCards, setFlippedCards] = useState([]);
  const [stillLearningCount, setStillLearningCount] = useState(0);
  const [knowCount, setKnowCount] = useState(0);
  const [showQuizCompleted, setShowQuizCompleted] = useState(false); // To control the pop-up message

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
          setFlippedCards(new Array(numOfFlashcards).fill(false));
        }
      } catch (error) {
        console.error('Error fetching choose collection:', error);
      }
    };

    fetchChooseCollection();
  }, [user, deckId]);

  const handleStillLearning = () => {
    setClassification(false);
    handleNextCard();
    setStillLearningCount((prevCount) => prevCount + 1);
  };

  const handleKnow = () => {
    setClassification(true);
    handleNextCard();
    setKnowCount((prevCount) => prevCount + 1);
  };

  const handleNextCard = () => {
    if (currentCard === allCollections.length - 1) {
      // Last card
      if (classification === null) {
        // If the user hasn't classified the last card, set it as "Still Learning"
        setClassification(false);
        setShowQuizCompleted(true); // Display the "Quiz Completed" message
      }
    } else {
      setCurrentCard((prevCard) => prevCard + 1);
      setFlashcardIndex((prevIndex) => prevIndex + 1);
      setFlippedCards((prevFlippedCards) => {
        const updatedFlippedCards = [...prevFlippedCards];
        updatedFlippedCards[currentCard] = false; // Reset the flip status for the current card
        return updatedFlippedCards;
      });
      setClassification(null);
    }
  };

  const backToHome = () => {
    navigate('/Account');
  };

  const flipCard = (index) => {
    if (!flippedCards[index]) {
      setFlippedCards((prevFlippedCards) => {
        const updatedFlippedCards = [...prevFlippedCards];
        updatedFlippedCards[index] = true;
        return updatedFlippedCards;
      });
    }
  };

  return (
    <div className="reviewContainer">
      <header className="border-black border-20px h-20 py-2 flex justify-start items-center" style={{ backgroundColor: '#F7F4E6' }}>
        <img className="mt-2 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-32" src="/reby-logo.png" alt="Reby's logo" />
        <div className="flex justify-between items-center flex-1 mr-7">
          <div className="flex justify-center items-center ml-80 pl-40">
            <span className="text-wrap" style={{ textAlign: 'center' }}>
              <div>{flashcardIndex} / {allCollections.length}</div>
              <div style={{ marginLeft: '10px' }}>{deckId}</div>
            </span>
          </div>
          <div>
            <button type="submit" className="mt-2 mr-4 h-4 w-24 sm:h-2 md:h-10 lg:h-10 xl:h-16" onClick={backToHome}>
              <img src="/back-button.png" alt="Back" />
            </button>
          </div>
        </div>
      </header>
      <div className="classificationButtons">
        <button
          type="button"
          className={`stillLearning-button ${classification === false ? 'active' : ''}`}
          onClick={handleStillLearning}
          disabled={classification !== null}
        >
          Still Learning {stillLearningCount}
        </button>
        <button
          type="button"
          className={`know-button ${classification === true ? 'active' : ''}`}
          onClick={handleKnow}
          disabled={classification !== null}
        >
          Know {knowCount}
        </button>
      </div>
      <div className="carousel-box">
        <div className="carousel-quiz">
          {allCollections.length > 0 ? (
            <div className="card-wrapper">
              {allCollections.map((documentData, index) => (
                <div
                  key={index}
                  className={`card ${index === currentCard ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${(index - currentCard) * 100}%) rotateY(${flippedCards[index] ? '180' : '0'}deg)`,
                  }}
                  onClick={() => flipCard(index)}
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
      {showQuizCompleted && (
        <div className="quizCompletedPopup">
          <div className="quizCompletedPopupInner">
            <p className="message">Quiz Completed!</p>
            <button className="quizBack" onClick={backToHome}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardQuiz;
