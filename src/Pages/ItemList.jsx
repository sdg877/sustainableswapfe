import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App/App.css';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);
  if (!items) return null;

  return (
    <div className="centered-item-card-container">
      <div className="card-container">
        {items.map(item => (
          <div className="item-card" key={item.id}> 
            <Link to={`/items/${item.id}`}>
              <h2>{item.item_title}</h2>
            </Link>
            <p>{item.item_description}</p>
          </div> 
        ))}
      </div>
    </div>
  );
}

export default ItemList;
