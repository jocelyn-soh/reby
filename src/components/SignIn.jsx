import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)  
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
        <img
            className="mx-auto h-48 w-auto"
            src="reby-logo.png"
            alt="Reby's logo"
      />
      <div class='rounded-lg border-20px mx-20 mb-20 ml-80 mr-80 p-4 w-30 h-50 ' style={{backgroundColor:'#E9E4DB'}}>
        <p className='text-4xl font-Raleway-Medium py-5 text-center' style={{fontFamily:'Raleway, sans-serif', fontWeight: 500}}>SIGN IN</p>
        <p className='py-2 text-center' style={{fontFamily:'Raleway, sans-serif', fontWeight: 300}}>
          Don't have an account yet?{' '}
          <Link to='/signup' className='underline'>
            Sign up.
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium' style={{fontFamily:'Raleway, sans-serif', fontWeight: 600}}>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3 rounded-md' style={{backgroundColor:'#FBF9F0'}} type='email' />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium' style={{fontFamily:'Raleway, sans-serif', fontWeight: 600}}>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className='border p-3 rounded-md' style={{backgroundColor:'#FBF9F0'}} type='password' />
        </div>
        {error && (
          <div>
            <p className="error-text flex justify-center" style={{color:'red', fontFamily: 'Raleway, sans-serif', fontweight: 500}}>
              {"Oops, your login credentials has an incorrect email and/or password :(" }</p>
            <p className="error-text flex justify-center" style={{color:'red', fontFamily: 'Raleway, sans-serif', fontweight: 500}}>
              {"Please try again!" }</p>
          </div>
        )}
        <button className='border-40px border-black-500 bg-buttonColor hover:bg-buttonHoverColor
          w-40 h-10 mx-auto p-2 my-2 text-white text-l rounded-md flex justify-center' style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
          Login
        </button>
      </form>
      </div>

    </React.Fragment>
  );
};

export default SignIn;
