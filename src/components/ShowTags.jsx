import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { UserAuth } from '../context/AuthContext.js';
import { doc, getDoc} from 'firebase/firestore';

const ShowTags = ({deckId}) => {
  const { user } = UserAuth();
  const [tagsArr, setTagsArr] = useState([]); 


  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (user && user.uid && deckId) {
          const deckRef = doc(firestore, user.uid, deckId);
          const deckSnapshot = await getDoc(deckRef);
          setTagsArr(deckSnapshot.data()['Tags'] || []);
          console.log(tagsArr);
            // const tagsData = deckSnapshot.data();
            // setTagsArr(tagsData['Tags']);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, [user, deckId, tagsArr]);

  return (
    
    <div className="px-6 pt-0 pb-2">
      {tagsArr.map((tag, index) => (
    <button key={index} className="border-0px border-black-500 bg-buttonColor w-35 h-10 mx-auto p-2 text-white text-l rounded-full inline-block justify-center mr-2 mb-2">
    {tag}
</button>))}
</div>  
  );

  
};

export default ShowTags; 
