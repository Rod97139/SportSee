import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

import { ResizeObserver } from '@juggle/resize-observer';

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

// useChartDimensions

const combineChartDimensions = dimensions => {
    const parsedDimensions = {
        ...dimensions,
        marginTop: dimensions.marginTop || 10,
        marginRight: dimensions.marginRight || 10,
        marginBottom: dimensions.marginBottom || 40,
        marginLeft: dimensions.marginLeft || 75,
    }
    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height
            - parsedDimensions.marginTop
            - parsedDimensions.marginBottom,
            0,
        ),
        boundedWidth: Math.max(
            parsedDimensions.width
            - parsedDimensions.marginLeft
            - parsedDimensions.marginRight,
            0,
        ),
    }
}

export const useChartDimensions = passedSettings => {
    const ref = useRef()
    const dimensions = combineChartDimensions(
        passedSettings
    )
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    useEffect(() => {
        if (dimensions.width && dimensions.height)
            return [ref, dimensions]
        const element = ref.current
        const resizeObserver = new ResizeObserver(
            entries => {
                if (!Array.isArray(entries)) return
                if (!entries.length) return
                const entry = entries[0]
                if (width != entry.contentRect.width)
                    setWidth(entry.contentRect.width)
                if (height != entry.contentRect.height)
                    setHeight(entry.contentRect.height)
            }
        )
        resizeObserver.observe(element)
        return () => resizeObserver.unobserve(element)
    }, [])
    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height,
    })
    return [ref, newSettings]
}