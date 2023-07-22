import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Chart from 'chart.js/auto';
import '../deckStatistics.css';

const DeckStatistics = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();

  const chartRef = useRef(null); 
  const chartInstance = useRef(null); 
  const [stillLearningCountArray, setStillLearningCountArray] = useState([]);
  const [knowCountArray, setKnowCountArray] = useState([]);

  useEffect(() => {
    const fetchChooseCollection = async () => {
      try {
        if (user && user.uid && deckId) {
          const deckRef = doc(firestore, user.uid, deckId);
          const deckDoc = await getDoc(deckRef);
          const data = deckDoc.data();
          setStillLearningCountArray(data['Still Learning Count']);
          setKnowCountArray(data['Know Count']);
        }
      } catch (error) {
        console.error('Error fetching choose collection:', error);
      }
    };

    fetchChooseCollection();
  }, [user, deckId]);

  useEffect(() => {
    // Create and render the line chart once the data is available
    if (chartRef.current && stillLearningCountArray && knowCountArray) {
      const ctx = chartRef.current.getContext('2d');

      const data = {
        labels: Array.from(
          { length: Math.max(stillLearningCountArray.length, knowCountArray.length) },
          (_, i) => `Attempt ${i + 1}`
        ),
        datasets: [
          {
            label: 'Still Learning',
            borderColor: 'rgba(165, 118, 91, 1)',
            backgroundColor: 'rgba(165, 118, 91, 0.2)',
            data: stillLearningCountArray,
          },
          {
            label: 'Know',
            borderColor: 'rgba(221, 187, 128, 1)',
            backgroundColor: 'rgba(221, 187, 128, 0.2)',
            data: knowCountArray,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Number of Attempts',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Number of Flashcards',
            },
            ticks: {
                stepSize: 1,
            }
          },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    filter: (legendItem) => {
                        if(!showStillLearning && legendItem.datasetIndex === 1) {
                            return false;
                        }
                        return true;
                    }
                }
            }
        }
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  }, [stillLearningCountArray, knowCountArray, showStillLearning]);

  const backToHome = () => {
    navigate('/Account');
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FBF9F0' }}>
      <div>
        <h1 style={{ color: 'brown', fontSize: '32px', fontWeight: 'bold', paddingTop: '20px', paddingLeft: '500px', fontFamily: 'Raleway' }}>
          Statistics - {deckId}
        </h1>
        <button className='statsBack' onClick={backToHome}>Back to Home</button>
        <div style={{ width: '60%', height: '50%', marginTop: '40px', marginLeft: '250px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
  
};
export default DeckStatistics;
