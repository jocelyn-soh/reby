import React, { useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import '../landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      navigate('/signin');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (<React.Fragment>
    <style>{`
      body {
        background-color: #FBF9F0;
        margin: 0;
        padding: 0;
      }
    `}</style>
  <header className='border-black border-20px h-16 py-2' style={{backgroundColor: '#F7F4E6'}}>

  </header>
  <hr style={{backgroundColor: 'black'}}/>
  <div className='container'>
    <h1 className='item welcome' style={{fontFamily:'Raleway, sans-serif', fontWeight: 500}}>Welcome to Reby! </h1>
    <h2 className='item about' style={{fontFamily: 'Raleway, sans-serif', fontWeight: 500}}>Introducing レビュー, or Rebyū, which means review in Japanese, is a flashcard web application like no other. With an aesthetic and intuitive interface to create decks of flash cards, reviewing flashcards have never been so easy and productive!</h2>
    <img
      className='item image'
      src="reby-logo.png"
      alt="Reby's logo"
    />
  </div>

    <div>
      <form onSubmit={handleSubmit}>
        <button className='border-40px border-black-500 bg-buttonColor 
          hover:bg-buttonHoverColor w-40 mx-auto mb-8 mt-10 p-2 text-white text-l rounded-md flex justify-center' 
            style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
          Get Started!
        </button>
      </form>
    </div>
      <hr />
    <footer className='border-black border-20px h-16 py-2' style={{backgroundColor: '#F7F4E6'}}>

  </footer>
</React.Fragment>
);
};

export default Landing;