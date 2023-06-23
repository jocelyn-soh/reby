import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'; 
import Decks from './Decks';

const Account = () => {
  const { user, logout } = UserAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
      navigate('/createdeck');
    };

  const handleLogout = async () => {
    try {
      await logout();
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
    
    <header className='border-black border-20px h-20 py-2 flex items-center' style={{backgroundColor: '#F7F4E6'}}>
      <img
        className="mt-10 h-10 sm:h-12 md:h-16 lg:h-20 xl:h-40 mx-auto"
        src="reby-logo.png"
        alt="Reby's logo"
      />
      <h1 className="font-bold text-3xl mx-auto mt-8" style={{fontFamily:'Raleway, sans-serif', fontWeight: 500}}>
        What will you review today, {user.displayName}?
      </h1>
      <div className='h-10 mt-8 mx-auto flex justify-center items-center' >
        <button onClick={handleLogout} className='border-0px border-black-500 bg-buttonColor hover:bg-buttonHoverColor w-35 h-10 mx-auto p-2 my-2 text-white text-l rounded-md flex justify-center'
          style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
            Logout
        </button>
      </div>
    </header>

    <div className='h-10 w-full pl-80 flex justify-center items-center' style={{backgroundColor: '#F7F4E6'}}>
    </div>
  
    <div>

      <form onSubmit={handleSubmit}>
        <button className='text-xl border border-black hover:bg-black-700 hover:bg-buttonHoverColor focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-full text-sm p-0 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 float-right mr-4 mt-2' 
          style={{fontFamily:'Raleway, sans-serif', fontWeight: 400}}>
           <h1>&nbsp; + &nbsp;</h1>
        </button>

        <h2 className="font-bold text-3xl mx-auto mt-2 ml-2" style={{fontFamily:'Raleway, sans-serif', fontWeight: 900}}>
          My Decks 
        </h2>
      </form>
    </div>

      <Decks />
    </React.Fragment>
  );
};

export default Account;


