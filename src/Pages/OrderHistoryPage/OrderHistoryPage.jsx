import FetchData from "../../utilities/fetch"
import React, {useEffect, useState} from 'react';
import '../../Pages/pages.css'

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function OrderHistoryPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/caloriesburned';
  const headers = { 'X-Api-Key': apikey};
  const [activity, setActivity] = useState('initialValue')
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
  
  
      
  if (activity !== 'all') {
    queryParams.push(`activity=${encodeURIComponent(activity)}`);
  }
  
  
  const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';


    return baseUrl + queryString;
    }
  


  return (
    <div id="burnedDiv">
      <h1>CALORIES BURNED BY ACTIVITY</h1>
      <h2>Enter Your Activity Here:</h2>
        <div>
          <label>ACTIVITY:</label>
          <input
            type="text"
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Enter Activity"
            
           
          />
        </div>
    
       {console.log(records)}
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

  
 







export default OrderHistoryPage