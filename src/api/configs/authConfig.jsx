// endpoints related to authentication
const REGISTER = 'api/auth/register/'
const LOGIN = 'api/auth/login/'
const REFRESH_URL = 'api/auth/token/refresh/'

// get the access token
const AUTH_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token';

const getAuthToken = () =>  localStorage.getItem(AUTH_TOKEN_KEY)
const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN_KEY,token)
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
const setRefreshToken = (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
const removeAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export{
    REGISTER,
    LOGIN,
    setAuthToken,
    setRefreshToken,
    getAuthToken,
    removeAuthToken
}