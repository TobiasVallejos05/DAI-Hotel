import axios from 'axios';

const client = axios.create({ baseURL: 'https://spoonacular.com/food-api'});

export const get = async () => {
    return client.get('').then(response => response.data)
    .catch(error => {
        console.log(error)
        throw error;
    });
}

export const post = async (data) => {
    return client.post('', {...data}).then(response => response.data)
    .catch(error => {
        console.log(error);
        throw error;
    });
}

export const getWithToken = async () => {
    return client.get('/un-endpoint', {headers: { Authorization: `Bearer ${token}`}})
    .then(response => response.data)
    .catch(error => {
        console.log(error);
        throw error;
    });
}