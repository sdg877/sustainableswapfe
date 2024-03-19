// import { jwtDecode } from 'jwt-decode'

// export function currentUser() {
//     const token = localStorage.getItem('access_token')
//     const decodedToken = jwtDecode(token)
//     return decodedToken.user_id
// }

import jwtDecode from 'jwt-decode';

export function currentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        // Handle case where token is not found
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.user_id;
    } catch (error) {
        // Handle decoding errors
        console.error('Error decoding token:', error);
        return null;
    }
}