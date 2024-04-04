import {jwtDecode} from 'jwt-decode';

const getToken = () => localStorage.getItem('token');

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Obtiene el tiempo actual en segundos
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Considera el token como expirado si hay un error al decodificar
  }
};

const isUserAuthenticated = () => {
  const token = getToken();
  if (!token) return false; // No hay token
  return !isTokenExpired(token); // El token está presente y no ha expirado
};

export { getToken, isUserAuthenticated };
