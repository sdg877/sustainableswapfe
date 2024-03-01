import React, { useState } from 'react';
import { currentUser } from '../lib/currentUser.js'; // Import the currentUser function

import { useParams } from 'react-router-dom';


function SwapForm({ onSubmit, ownerId }) {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const { itemId } = useParams()

  const currentUserId = currentUser()
  const initialState = { 
    item_id: itemId,
    item_title: '', 
    item_description: '', 
    offer_accepted: false, 
    user_id: currentUserId,
    user: currentUserId
     }
  const [item, setItem] = useState (initialState)


  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(item)

  };

  //help
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Make your offer:</h4>
        <label>
          Item Title:
          <input type="text" value={item.item_title} id='item_title' name='item_title' onChange={handleChange} />
        </label>
        <br />
        <label>
          Item Description:
          <textarea value={item.item_description} id='item_description' name='item_description' onChange={handleChange} />
        </label>
        {ownerId === currentUserId && ( 
          <>
            <br />
            <label>
              Offer Accepted:
              <input type="checkbox" checked={offerAccepted} onChange={() => setOfferAccepted(!offerAccepted)} />
            </label>
          </>
        )}
        <input type="hidden" value={currentUserId} /> {/* Provide the user ID as a hidden input */}
        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
}

export default SwapForm;
