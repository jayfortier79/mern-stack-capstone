import FetchData from "../../utilities/fetch"
import React, {useEffect, useState} from 'react';
import '../../Pages/pages.css'

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function NutritionPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/nutrition';
  const headers = { 'X-Api-Key': apikey};
  const [query, setQuery] = useState('')
  const {records, loading, error, refetch} = FetchData(makeUrl(), {headers});


  const handleSubmit = async () => {
    try {
      refetch();
    }catch (err) {
    console.error(err);
    } 
    };

    
  useEffect(() => {
  refetch();
}, []);

function makeUrl() {
  const queryParams = [];
  
  
      
  if (query !== 'all') {
    queryParams.push(`query=${encodeURIComponent(query)}`);
  }
  
  const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';


    return baseUrl + queryString;
    }
  


  return (
    <div id="NutDiv">
      <h1>Nutrition Information By Food Item</h1>
      <h2>Enter A Food Item Here For More Info:</h2>
        <div>
          <label>QUERY:</label>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Food Item"
          />
        </div>

       
    <button onClick={handleSubmit}>Submit</button>
    
    {loading ? (
      <div>LOADING...</div>
    ) : error ? (
      <div>Error: {error.message}</div>
   ) : records && records.length > 0 ? (
      <div>
    {records.map((record, index) => (
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
  </div>
  ) : (
    <div>No Data Available</div>
  )}
</div>
  );
          };

  
 







export default NutritionPage