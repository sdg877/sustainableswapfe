
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SwapForm from './SwapForm';
import { currentUser } from '../lib/currentUser';

function ItemViewPage() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUserId = currentUser(); // Get current user ID

  const fetchItemDetails = useCallback(async () => {
    try {
      const [itemResponse, swapsResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
      ]);
      setItem(itemResponse.data);
      setSwaps(swapsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    fetchItemDetails();
  }, [itemId, fetchItemDetails]);


  const handleFormSubmit = async (formData) => {
    try {
      const response =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_swap/${itemId}/`, formData, {
        headers: {
         Authorization: `Bearer ${localStorage.getItem('access_token')}`
         }
         })
      const newSwap = response.data;
      setSwaps(prevSwaps => [...prevSwaps, formData]);
      fetchItemDetails();
      console.log(newSwap)
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Error: Item not found</p>;
  }

  return (
    <div className="centered-item-card-container">
      <div className="item-card enlarged">
        <h1>{item.item_title}</h1>
        <p>{item.item_description}</p>
        <img
          src={item.image_url}
          alt={item.item_title}
        />
        <h4>Swaps:</h4>
        <div>
          {swaps.length > 0 ? (
            swaps.map(swap => (
              <p key={swap.id}>{swap.item_title}, {swap.item_description}</p>
            ))
          ) : (
            <p>No offers yet</p>
          )}
        </div>
        {loggedInUserId && item && item.item_user !== loggedInUserId && (
          <SwapForm onSubmit={handleFormSubmit} ownerId={item.item_user} itemId={item.item_id} />
        )}
      </div>
    </div>
  );
}

export default ItemViewPage;
