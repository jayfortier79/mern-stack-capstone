import FetchData from "../../utilities/fetch"
import React, {useEffect} from 'react';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function NewOrderPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises'
  const headers = { 'X-Api-Key': apikey};
  const params = new URLSearchParams();
  params.append('muscle', 'biceps');
  params.append('difficulty', 'beginner');
  const queryString = params.toString();
  const url = `${baseUrl}?${queryString}`;

  const { records, loading, error, refetch } = FetchData(url, headers,);

  

  

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