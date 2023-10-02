import FetchData from "../../utilities/fetch"
import React, {useEffect, useState} from 'react';

const apikey= import.meta.env.VITE_REACT_APP_API_KEY;




function NewOrderPage() {
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  const headers = { 'X-Api-Key': apikey};
  const [muscle, setMuscle] = useState('biceps');
  const [difficulty, setDifficulty] = useState('beginner');
  const [type, setType] = useState('cardio');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${baseUrl}?muscle=${muscle}&difficulty=${difficulty}&type=${type}`;
      const {records: newRecords, error: newError} = await FetchData(url, headers);

      setRecords(newRecords);
      setError(newError);
    }catch (err) {
    setError(err);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
  handleSubmit();
}, []);

  return (
    <div>
      <h1>THE EXERCIXE INSTRUCTIONS</h1>
        <div>
          <label>Targeted Muscle:</label>
          <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
          <option value="abdominals">Abdominals</option>
          <option value="abductors">Abductors</option>
          <option value="adductors">Adductors</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">LowerBack</option>
          <option value="middle_back">MiddleBack</option>
          <option value="neck">Neck</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="traps">Traps</option>
          <option value="triceps">Triceps</option>
          </select>
        </div>
        <div>
        <label>Difficulty Level:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermidiate">Intermidiate</option>
          <option value="expert">Expert</option>
          </select>
        </div>
        <div>
        <label>Type of Exercise:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="olympic_weightlifting">Olympic Weightlifting</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="strength">Strength Training</option>
          <option value="stretching">Stretching</option>
          <option value="strongman">Strongman</option>
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
  ): (
    <div>No Data Available</div>
  )}
</div>
  );
          };

  
  export default NewOrderPage