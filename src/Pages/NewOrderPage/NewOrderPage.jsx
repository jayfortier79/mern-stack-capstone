import FetchData from "../../utilities/fetch"
import React, {useEffect, useState} from 'react';
import '../../Pages/pages.css'
const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function NewOrderPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  const headers = { 'X-Api-Key': apikey};
  const [muscle, setMuscle] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [type, setType] = useState('all');
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

if (muscle !== 'all') {
  queryParams.push(`muscle=${muscle}`);
}
if (difficulty !== 'all') {
  queryParams.push(`difficulty=${difficulty}`);
}
if (type !== 'all') {
  queryParams.push(`type=${type}`);
}

const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    return baseUrl + queryString;
  }


const availableMuscles = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  'triceps',
];

const availableDifficulties = ['beginner', 'intermediate', 'expert'];

const availableTypes = [
  'olympic_weightlifting',
  'plyometrics',
  'powerlifting',
  'strength',
  'stretching',
  'strongman',
];


  return (
    <div id= "newDiv">
      <h1>THE EXERCISE INSTRUCTIONS</h1>
      <h2>Search For Exercise Suggestions:</h2>
        <div>
          <label>Targeted Muscle:</label>
          <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
          <option value="all">Include All</option>
          {availableMuscles.map((option) => (
            <option key={option} value={option}>
          {option}
          </option>
          ))}
          </select>
        </div>
        <div>
        <label>Difficulty Level:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="all">Include All</option>
          {availableDifficulties.map((option) => (
            <option key={option} value={option}>
          {option}
          </option>
          ))}
          </select>
        </div>
        <div>
        <label>Type of Exercise:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">Include All</option>
          {availableTypes.map((option) => (
            <option key={option} value={option}>
          {option}
          </option>
          ))}
          </select>
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

  
  export default NewOrderPage