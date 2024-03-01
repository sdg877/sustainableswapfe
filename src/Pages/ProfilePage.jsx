
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { currentUser } from '../lib/currentUser';
// import ItemEdit from '../Components/ItemEdit.jsx';

// function ProfilePage() {
//     const [userItems, setUserItems] = useState([]);
//     const userToken = localStorage.getItem('access_token');
//     const userId = currentUser();
//     const [editingItemId, setEditingItemId] = useState(null);

//     useEffect(() => {
//         refreshUserItems(userId, userToken);
//     }, [userToken, userId]);

//     const refreshUserItems = (userId, userToken) => {
//         axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/items/`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             if (Array.isArray(response.data)) {
//                 Promise.all(response.data.map(item =>
//                     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${item.id}/swaps/`, {
//                         headers: {
//                             Authorization: `Bearer ${userToken}`
//                         }
//                     }).then(swapsResponse => {
//                         item.swaps = swapsResponse.data;
//                         return item;
//                     })
//                 )).then(itemsWithSwaps => {
//                     setUserItems(itemsWithSwaps);
//                 }).catch(error => {
//                     console.error('Error fetching swaps for items:', error);
//                 });
//             } else {
//                 console.error('Invalid response format for user items:', response.data);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user items:', error);
//         });
//     };

//     const handleDelete = (itemId) => {
//         axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/delete/`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
//         })
//         .catch(error => {
//             console.error('Error deleting item:', error);
//         });
//     };

//     return (
//         <div>
//             <h1>Your Items</h1>
//             <div className="card-container">
//                 {userItems.map(item => (
//                     <div className="item-card" key={item.id}>
//                         {item && (
//                             <>
//                                 <Link to={`/items/${item.id}`}>
//                                     <h2>{item.item_title}</h2>
//                                 </Link>
//                                 <p>{item.item_description}</p>
//                                 <h4>Swaps:</h4>
//                                 <div>
//                                     {item.swaps && item.swaps.length > 0 ? (
//                                         item.swaps.map(swap => (
//                                             <p key={swap.id}>{swap.item_title}, {swap.item_description}</p>
//                                         ))
//                                     ) : (
//                                         <p>No swaps yet</p>
//                                     )}
//                                 </div>
//                                 <button className="btn btn-primary" onClick={() => handleDelete(item.id)}>Delete</button>
//                                 <button className="btn btn-primary" onClick={() => setEditingItemId(item.id)}>Edit</button>
//                             </>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             {editingItemId && (
//                 <ItemEdit
//                     itemId={editingItemId}
//                     userToken={userToken}
//                 />
//             )}
//         </div>
//     );
// }

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { currentUser } from '../lib/currentUser';
import ItemEdit from '../Components/ItemEdit.jsx';

function ProfilePage() {
    const [userItems, setUserItems] = useState([]);
    const userToken = localStorage.getItem('access_token');
    const userId = currentUser();
    const [editingItemId, setEditingItemId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        refreshUserItems(userId, userToken);
    }, [userToken, userId]);

    const refreshUserItems = (userId, userToken) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/items/`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                Promise.all(response.data.map(item =>
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${item.id}/swaps/`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }).then(swapsResponse => {
                        item.swaps = swapsResponse.data;
                        return item;
                    })
                )).then(itemsWithSwaps => {
                    setUserItems(itemsWithSwaps);
                    setIsLoading(false);
                }).catch(error => {
                    console.error('Error fetching swaps for items:', error);
                    setIsLoading(false);
                });
            } else {
                console.error('Invalid response format for user items:', response.data);
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.error('Error fetching user items:', error);
            setIsLoading(false);
        });
    };

    const handleDelete = (itemId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/delete/`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(response => {
            setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    return (
        <div>
            <h1>Your Items</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {userItems.length > 0 ? (
                        <div className="card-container">
                            {userItems.map(item => (
                                <div className="item-card" key={item.id}>
                                    {item && (
                                        <>
                                            <Link to={`/items/${item.id}`}>
                                                <h2>{item.item_title}</h2>
                                            </Link>
                                            <p>{item.item_description}</p>
                                            <h4>Swaps:</h4>
                                            <div>
                                                {item.swaps && item.swaps.length > 0 ? (
                                                    item.swaps.map(swap => (
                                                        <p key={swap.id}>{swap.item_title}, {swap.item_description}</p>
                                                    ))
                                                ) : (
                                                    <p>No swaps yet</p>
                                                )}
                                            </div>
                                            <button className="btn btn-primary" onClick={() => handleDelete(item.id)}>Delete</button>
                                            <button className="btn btn-primary" onClick={() => setEditingItemId(item.id)}>Edit</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p>No items yet</p>
                            <Link to="/items/create" className="btn btn-primary">Create Item</Link>
                        </div>
                    )}
                </>
            )}
            {editingItemId && (
                <ItemEdit
                    itemId={editingItemId}
                    userToken={userToken}
                />
            )}
        </div>
    );
}

export default ProfilePage;
