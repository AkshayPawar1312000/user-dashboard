// API component manages communication with external APIs, handling requests and responses to the server

import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
    // if(localStorage.getItem('profile')) {
    //     req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    // }

    return req
})


// export const getQuiz = (id) => API.get(`/quiz/${id}`);