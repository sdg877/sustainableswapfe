import { jwtDecode } from 'jwt-decode'

export function currentUser() {
    const token = localStorage.getItem('access_token')
    const decodedToken = jwtDecode(token)
    return decodedToken.user_id
}
