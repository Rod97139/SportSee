import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const data = await response?.data;
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return { isLoading, data, error };
}