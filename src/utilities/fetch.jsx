import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react';
import axios from 'axios';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;
console.log(apikey)

function FetchData(url, headers, params) {
const [records, setRecords] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const findData = useCallback(() => {
    setLoading(true);
         axios
        .get(url, {headers, params})
        .then((response) => {
            setRecords(response.data);
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false);
        });

}, [url, headers, params]);

useEffect(() => {
findData();
}, [findData]);

const refetch = () => {
    findData();
};

return {records, loading, error, refetch};
}


export default FetchData