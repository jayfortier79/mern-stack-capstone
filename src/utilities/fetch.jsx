import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react';
import axios from 'axios';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;
console.log(apikey)

function FetchData(url, options = {}) {
const [records, setRecords] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const findData = useCallback(() => {
    setLoading(true);
         axios
        .get(url, {
            headers: {
            'X-Api-Key': apikey,
            ...options.headers,   
            }, 
            params: {
            ...options.params,
            },
        })
        .then((response) => {
            setRecords(response.data);
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false);
        });

}, [url, options.headers, options.params]);

useEffect(() => {
findData();
}, []);

const refetch = () => {
    findData();
};

return {records, loading, error, refetch};
}


export default FetchData