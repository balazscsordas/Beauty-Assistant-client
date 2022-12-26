import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        const url = "http://localhost:8001/refresh";
        const response = await axios.get(url, {
            withCredentials: true // This allows us to send cookies with our request
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;