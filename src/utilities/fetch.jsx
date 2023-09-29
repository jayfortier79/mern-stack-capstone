import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function FetchData(url) {
const [records, setRecords] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(()=>{
    setLoading(true);
    fetch(url)
    .then(response => response.json())
    .then(data => setRecords({data}))

}).catch((err) => {
    setError(err);
})
  .finally(() => {
        setLoading(false);
    });

 [url];

return {records, loading, error};

}

{/*
<div>

<ul>
 
{records.map(()=> (
<li key= {index}>{list.id} | {list.name}</li>
))}



 
</ul>

</div>
*/}




export default FetchData