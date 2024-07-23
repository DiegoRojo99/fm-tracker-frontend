import React, { useState, useEffect } from 'react';
import '../Dev.css';

function AddTeam() {
  const [teamName, setTeamName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [image, setImage] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch countries from backend when component mounts
    fetch('http://localhost:5000/api/countries')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []); // Empty dependency array to fetch data only once on mount

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const requestData = {
        teamName: teamName,
        countryId: countryId,
        // Include other fields as needed
      };
  
      const response = await fetch('http://localhost:5000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setTeamName('');
      setCountryId('');
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };
  
  return (
    <div className="form-container">
      <h2>Add Football Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName" className="form-label">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
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
            {teams.map(team => (
              <option key={team.country_id} value={team.country_id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Team Logo:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-submit">Add Team</button>
      </form>
    </div>
  );
}

export default AddTeam;
