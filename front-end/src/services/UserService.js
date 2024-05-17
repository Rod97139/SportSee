import { useFetch } from "../utils/hooks";

const API_URL = `${window.location.origin}/sportsee/mock-data/user/`

export const getUser = (userId) => useFetch(`${API_URL +userId}.json`)
export const getUserActivity = (userId) => useFetch(`${API_URL + userId}/activity.json`)
export const getUserSessions = (userId) => useFetch(`${API_URL + userId}/average-sessions.json`)
export const getUserPerformance = (userId) => useFetch(`${API_URL + userId}/performance.json`)

