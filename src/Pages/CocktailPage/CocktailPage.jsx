import FetchData from "../../utilities/fetch"
import React, {useEffect, useState} from 'react';
import '../../Pages/pages.css'

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function CocktailPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/cocktail';
  const headers = { 'X-Api-Key': apikey};
  const [name, setName] = useState()
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
  
  if (name !== 'all') {
    queryParams.push(`name=${encodeURIComponent(name)}`);
  }
  
  const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';


    return baseUrl + queryString;
    
    }
  
    console.log(records);

  return (
    <div id="CocktailDiv">
      <h1>Cocktail Recipes By Name</h1>
      <h2>Enter The Name of A Cocktail for Recipe:</h2>
        <div>
          <label>Cocktail Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Cocktail Name"
          />
        </div>

       
    <button onClick={handleSubmit}>Submit</button>
    
    {loading ? (
      <div>LOADING...</div>
    ) : error ? (
      <div>Error: {error.message} </div>
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

  
 







export default CocktailPage