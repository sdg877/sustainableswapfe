import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App/App.css';
import SwapForm from './SwapForm';

function ItemViewPage() {
  const { itemId } = useParams();
  console.log("Item ID:", itemId);

  const [item, setItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [swaps, setSwaps] = useState([]);

  const handleFormSubmit = (formData) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
      .then(response => {
        console.log("Offer submitted:", response.data);
        const newSwap = response.data; // Assuming the response data contains the newly added swap
        setSwaps(prevSwaps => [...prevSwaps, newSwap]); // Add the new swap to the existing swaps array
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error submitting offer:', error);
        // Handle error
      });
  };

  // const handleFormSubmit = (formData) => {
  //   axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
  //     .then(response => {
  //       fetchSwaps();
  //       setShowForm(false);
  //     })
  //     .catch(error => {
  //       console.error('Error submitting offer:', error);
  //       // Handle error
  //     });
  // };

  // const fetchSwaps = () => {
  //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
  //     .then(response => {
  //       setSwaps(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching swaps:', error);
  //     });
  // };

  const fetchSwaps = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
      .then(response => {
        setSwaps(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching swaps:', error);
      });
  };

  useEffect(() => {
    // Fetch item details
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
      .then(response => {
        setItem(response.data);
        console.log(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });

    // Fetch swaps associated with the item
    fetchSwaps();
  }, [itemId]);

  const s3BaseUrl = "https://sdg-ga-seb77.s3.amazonaws.com"

  return (
    <div className="centered-item-card-container">
      {item ? (
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
                <p>{swap.item_title}, {swap.item_description}</p>
              ))
            ) : (
              <p>No offers yet</p>
            )}
          </div>
          <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} itemId={item.item_id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemViewPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { currentUser } from '../lib/currentUser';
// import '../App/App.css';
// import SwapForm from './SwapForm';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [swaps, setSwaps] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Fetch item details
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//         setCurrentUser(response.data.user); // Assuming the user is part of the item data
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });

//     // Fetch swaps associated with the item
//     fetchSwaps();
//   }, [itemId]);

//   const fetchSwaps = () => {
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//       .then(response => {
//         setSwaps(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching swaps:', error);
//       });
//   };

//   const handleFormSubmit = (formData) => {
//     axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
//       .then(response => {
//         console.log("Offer submitted:", response.data);
//         fetchSwaps(); // Update swaps without page reload
//         setShowForm(false);
//       })
//       .catch(error => {
//         console.error('Error submitting offer:', error);
//         // Handle error
//       });
//   };

//   const s3BaseUrl = "https://sdg-ga-seb77.s3.amazonaws.com";

//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//           {item.image && (
//             <img
//               src={`${s3BaseUrl}/${item.image_url}/`}
//               alt={item.item_title}
//             />
//           )}
//           <h4>Swaps:</h4>
//           <div>
//             {swaps.length > 0 ? (
//               swaps.map(swap => (
//                 <p key={swap.swap_id}>{swap.item_title}, {swap.item_description}</p>
//               ))
//             ) : (
//               <p>No offers yet</p>
//             )}
//           </div>
//           {console.log("Current User:", currentUser)}
//           {console.log("Item Owner:", item.user)}
//           {currentUser !== item.user && <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} itemId={item.item_id} />}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default ItemViewPage;


