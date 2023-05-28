import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(user);
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
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
    <div className='h-10 w-full pl-80 flex justify-center items-center' style={{backgroundColor: '#F7F4E6'}}>
    </div>
    <h1 className='text-2xl mt-10 py-4 flex justify-center' style={{fontFamily:'Raleway, sans-serif', fontWeight: 500}}>You have successfully logged in!</h1>
    <div className='h-10 w-full mt-30 flex justify-center items-center' >
      <button onClick={handleLogout} className='border-40px border-black-500 bg-buttonColor hover:bg-buttonHoverColor w-40 h-10 mx-auto p-2 my-2 text-white text-l rounded-md flex justify-center'
        style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
          Logout
      </button>
    </div>
    </React.Fragment>
  );
};

export default Account;
