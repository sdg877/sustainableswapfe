// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../App/App.css';
// import SwapForm from './SwapForm';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);
//   const [, setShowForm] = useState(false);
//   const [swaps, setSwaps] = useState([]);

//   const handleFormSubmit = (formData) => {
//     axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
//       .then(response => {
//         console.log("Offer submitted:", response.data);
//         const newSwap = response.data;
//         setSwaps(prevSwaps => [...prevSwaps, newSwap]);
//         setShowForm(false);
//       })
//       .catch(error => {
//         console.error('Error submitting offer:', error);
//       });
//   };

//   useEffect(() => {
//     const fetchSwaps = () => {
//       axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//         .then(response => {
//           setSwaps(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching swaps:', error);
//         });
//     };

//     // Fetch item details
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//         console.log(response.data);
//         fetchSwaps(); // Fetch swaps inside the useEffect callback
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });
//   }, [itemId]); // itemId is still a dependency here

//   const s3BaseUrl = "https://sdg-ga-seb77.s3.amazonaws.com"

//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//           {item.image && (
//             <img
//             src={`${s3BaseUrl}/${item.image_url}/`}
//             alt={item.item_title}
//             />
//             )}
//           <h4>Swaps:</h4>
//           <div>
//             {swaps.length > 0 ? (
//               swaps.map(swap => (
//                 <p>{swap.item_title}, {swap.item_description}</p>
//               ))
//             ) : (
//               <p>No offers yet</p>
//             )}
//           </div>
//           <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} itemId={item.item_id} />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default ItemViewPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SwapForm from './SwapForm';
import { currentUser } from '../lib/currentUser'; // Importing currentUser function

function ItemViewPage() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUserId = currentUser(); // Get current user ID

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData);
      const newSwap = response.data;
      setSwaps(prevSwaps => [...prevSwaps, newSwap]);
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
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
    };

    fetchItemDetails();
  }, [itemId]);

  const s3BaseUrl = "https://sdg-ga-seb77.s3.amazonaws.com";

  // Logging for debugging
  console.log("Item Owner ID:", item ? item.item_user : null);
  console.log("Logged In User ID:", loggedInUserId);

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
        {item.image && (
          <img
            src={`${s3BaseUrl}/${item.image_url}/`}
            alt={item.item_title}
          />
        )}
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
        {/* Conditionally render SwapForm */}
        {loggedInUserId && item && item.item_user !== loggedInUserId && (
        <SwapForm onSubmit={handleFormSubmit} ownerId={item.item_user} itemId={item.item_id} />
        )}
      </div>
    </div>
  );
}

export default ItemViewPage;
