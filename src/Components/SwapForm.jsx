import React, { useState } from 'react';
import axios from 'axios';
import { currentUser } from '../lib/currentUser.js'; // Import the currentUser function

import { useParams } from 'react-router-dom';


function SwapForm({ onSubmit, ownerId }) {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const { itemId } = useParams()
  const item_id = itemId

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

     const token = localStorage.getItem('access_token')

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item)
    try{
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_swap/${item_id}/`, item, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setItem(initialState);
      setOfferAccepted(false);
      console.log('posted')
    } catch (error){
      console.log(error)
    }

  };

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
