import FetchData from "../../utilities/fetch"
import React, {useEffect} from 'react';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function NewOrderPage() {
  const url = 'https://jsonplaceholder.typicode.com/albums'
  const headers = { 'X-Api-Key': apikey};
  const params = { param1: 'cardio', param2: 'abdominals' };

  const { records, loading, error, refetch } = FetchData(url, headers, params);

  

  

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Newness</h1>
      {Array.isArray(records) && records.map((record, index) => (
        <div key={index}>
          <h2>Record {index + 1}</h2>
          <ul>
            {Object.entries(record).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}
  
  
  export default NewOrderPage