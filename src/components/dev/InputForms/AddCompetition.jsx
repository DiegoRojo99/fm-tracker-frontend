import React, { useState, useEffect } from 'react';
import '../Dev.css';

function AddCompetition() {
  const [competitionName, setCompetitionName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [competitionType, setCompetitionType] = useState('league');
  const [countries, setCountries] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch countries from backend when component mounts
    fetch(backendUrl+'/api/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, [backendUrl]); // Empty dependency array to fetch data only once on mount

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ competitionName, countryId, competitionType }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Reset the form fields
      setCompetitionName('');
      setCountryId('');
      setCompetitionType('competition'); // Reset competition type to default value
    } catch (error) {
      console.error('Error adding competition:', error);
      // Optionally, handle error
    }
  };

  return (
    <div className="form-container">
      <h2>Add Football Competition</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="competitionName" className="form-label">Competition Name:</label>
          <input
            type="text"
            id="competitionName"
            value={competitionName}
            onChange={(event) => setCompetitionName(event.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="country" className="form-label">Country:</label>
          <select
            value={countryId}
            onChange={(event) => setCountryId(event.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.country_id} value={country.country_id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="competitionType" className="form-label">Competition Type:</label>
          <select
            value={competitionType}
            onChange={(event) => setCompetitionType(event.target.value)}
            className="form-input"
            required
          >
            <option value="league">League</option>
            <option value="cup">Cup</option>
          </select>
        </div>

        <button type="submit" className="form-submit">Add Competition</button>
      </form>
    </div>
  );
}

export default AddCompetition;
