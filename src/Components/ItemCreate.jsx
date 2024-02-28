
// import React, { useState } from 'react';
// import axios from 'axios';
// import { currentUser } from '../lib/currentUser';

// function ItemCreate() {
//     const [formData, setFormData] = useState({
//         item_title: '',
//         item_description: '',
//         listing_active: true,
//         user: currentUser()
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData)
//         axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/`, formData)
//             .then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('Error:', error.response.data);
//             });
//     };

//     return (
//         <div className="Auth-form">
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="item_title" className="form-label">Title:</label>
//                     <input type="text" id="item_title" name="item_title" value={formData.item_title} onChange={handleChange} className="form-control" />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="item_description" className="form-label">Description:</label>
//                     <textarea id="item_description" name="item_description" value={formData.item_description} onChange={handleChange} className="form-control"></textarea>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default ItemCreate;

// import React, { useState } from 'react';
// import axios from 'axios';

// import { currentUser } from '../lib/currentUser';

// function ItemCreate() {
//     const [formData, setFormData] = useState({
//         item_title: '',
//         item_description: '',
//         listing_active: true,
//         user: currentUser()
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData)
//         axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/`, formData)
//             .then(response => {
//                 console.log(response.data);
//                 // Redirect to homepage
//                 window.location.href = '/'; // Redirect using window.location
//             })
//             .catch(error => {
//                 console.error('Error:', error.response.data);
//             });
//     };

//     return (
//         <div className="Auth-form">
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="item_title" className="form-label">Title:</label>
//                     <input type="text" id="item_title" name="item_title" value={formData.item_title} onChange={handleChange} className="form-control" />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="item_description" className="form-label">Description:</label>
//                     <textarea id="item_description" name="item_description" value={formData.item_description} onChange={handleChange} className="form-control"></textarea>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default ItemCreate;

import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { currentUser } from '../lib/currentUser';

function ItemCreate() {
    const [formData, setFormData] = useState({
        item_title: '',
        item_description: '',
        image: null, // Add image field to formData
        listing_active: true,
        user: currentUser()
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // If the change event is for the image input
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0] // Store the file object
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };


    const handleImageChange = (e) => {
        const myFile = e.target.files[0] 
        const blob = myFile.slice(0, myFile.size);
        const fileExt = myFile.name.split('.').pop();
        const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` });
        setFormData({
            ...formData,
            image: newFile
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData object to send files along with other form data
        const formDataToSend = new FormData();
        formDataToSend.append('item_title', formData.item_title);
        formDataToSend.append('item_description', formData.item_description);
        formDataToSend.append('listing_active', formData.listing_active);
        formDataToSend.append('user', formData.user);
        formDataToSend.append('image', formData.image); // Append image file
        console.log(formData)
        
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                // Redirect to homepage
                // window.location.href = '/'; // Redirect using window.location
            })
            .catch(error => {
                console.error('Error:', error.response.data);
            });
    };

    return (
        <div className="Auth-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="item_title" className="form-label">Title:</label>
                    <input type="text" id="item_title" name="item_title" value={formData.item_title} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="item_description" className="form-label">Description:</label>
                    <textarea id="item_description" name="item_description" value={formData.item_description} onChange={handleChange} className="form-control"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ItemCreate;
