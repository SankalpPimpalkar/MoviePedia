import axios from "axios";

const AXIOS = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

export const usersAPI = {
    register: async (formData) => {
        const response = await AXIOS.post('/users/register', formData)
        return response.data
    },
    login: async (formData) => {
        const response = await AXIOS.post('/users/login', formData)
        return response.data
    },
    getCurrentUser: async () => {
        const response = await AXIOS.get('/users/me')
        return response.data
    },
    logout: async () => {
        const response = await AXIOS.post('/users/logout')
        return response.data
    }
}

export const moviesAPI = {
    createMovie: async (formData) => {
        const response = await AXIOS.post('/movies', formData)
        return response.data
    },
    getAllMovies: async () => {
        const response = await AXIOS.get('/movies')
        return response.data
    },
    getSearchedMovies: async (q, page, sort, order) => {
        const response = await AXIOS.get(`/movies/search?q=${q}&page=${page}&sort=${sort}&order=${order}`)
        return response.data
    },
    getMovieById: async (id) => {
        const response = await AXIOS.get(`/movies/${id}`)
        return response.data
    },
    editMovie: async (id, formData) => {
        const response = await AXIOS.post(`/movies/${id}`, formData)
        return response.data
    },
    deleteMovie: async (id) => {
        const response = await AXIOS.delete(`/movies/${id}`)
        return response.data
    },
}