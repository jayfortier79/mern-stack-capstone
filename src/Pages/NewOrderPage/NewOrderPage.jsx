import FetchData from "../../utilities/fetch"
import React, {useEffect} from 'react';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;

function NewOrderPage() {
  const { records, loading, error, refetch } = FetchData('https://api.api-ninjas.com/v1/caloriesburnedactivities', {
    headers: { 'X-Api-Key': apikey }
  });

  

  

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Newness</h1>
      {records?.map((record, index) => (
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