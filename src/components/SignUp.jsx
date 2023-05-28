import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password, username);
      navigate('/account')
    } catch (e) {
      if (e.message.includes("email")) {
        setError("Email is already in use.");
      } else if (e.message.includes("missing")){
        setError("Missing Password");
      } else {
        setError("Password needs at least 6 characters");
      }
      console.log(e.message);
    }
  };

  return (
    <React.Fragment>
      <style>{`
        body {
          background-color: #FBF9F0;
          margin: 0;
          padding: 0;
        }
      `}</style>
    <header className='border-black border-20px h-20 py-2 flex justify-center items-center' style={{backgroundColor: '#F7F4E6'}}>
      <img
        className="mt-10 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-40"
        src="reby-logo.png"
        alt="Reby's logo"
      />
    </header>
    <div className='h-10 w-full pl-80 flex justify-center items-center' style={{backgroundColor: '#F7F4E6', fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
      <p className='ml-80 text-xl text-right'>
          Already have an account?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
    </div>
    <div className='max-w-[700px] mx-auto my-16'>
      <div>
        <h1 className='text-2xl font-bold flex justify-center' style={{fontFamily:'Raleway, sans-serif', fontWeight: 500}}>GETTING STARTED </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium' style={{fontFamily:'Raleway, sans-serif', fontWeight: 600}}>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-md border p-3'
            style={{backgroundColor:'#FFFEFB'}}
            type='email'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium' style={{fontFamily:'Raleway, sans-serif', fontWeight: 600}}>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='rounded-md border p-3'
            style={{backgroundColor:'#FFFEFB'}}
            type='username'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium' style={{fontFamily:'Raleway, sans-serif', fontWeight: 600}}>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className= 'rounded-md border p-3'
            style={{backgroundColor:'#FFFEFB'}}
            type='password'
          />
        </div>
        {error && (
          <div>
            <p className="error-text flex justify-center" style={{color:'red', fontFamily: 'Raleway, sans-serif', fontweight: 500}}>
              {error}</p>
            <p className="error-text flex justify-center" style={{color:'red', fontFamily: 'Raleway, sans-serif', fontweight: 500}}>
              {"Please try again!" }</p>
          </div>
        )}
        <button className='border-40px border-black-500 bg-buttonColor 
          hover:bg-buttonHoverColor w-40 h-10 mx-auto p-2 my-2 text-white text-l rounded-md flex justify-center' 
            style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
          Let's Go
        </button>
      </form>
    </div>
    </React.Fragment>
  );
};

export default SignUp;



