import { useFetch } from "../utils/hooks";

export const getUser = (userId) => useFetch(`http://localhost:3000/user/${userId}`)
export const getUserActivity = (userId) => useFetch(`http://localhost:3000/user/${userId}/activity`)
export const getUserSessions = (userId) => useFetch(`http://localhost:3000/user/${userId}/average-sessions`)
export const getUserPerformance = (userId) => useFetch(`http://localhost:3000/user/${userId}/performance`)

