import { useFetch } from "../utils/hooks";

const API_URL = 'http://localhost:3000/user/'

export const getUser = (userId) => useFetch(API_URL + userId)
export const getUserActivity = (userId) => useFetch(`${API_URL + userId}/activity`)
export const getUserSessions = (userId) => useFetch(`${API_URL + userId}/average-sessions`)
export const getUserPerformance = (userId) => useFetch(`${API_URL + userId}/performance`)

