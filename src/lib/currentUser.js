// import { jwtDecode } from 'jwt-decode'

// export function currentUser() {
//     const token = localStorage.getItem('access_token')
//     const decodedToken = jwtDecode(token)
//     return decodedToken.user_id
// }

export function currentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null; 
    }
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(atob(base64));
      

      return decodedToken.user_id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; 
    }
  }
  