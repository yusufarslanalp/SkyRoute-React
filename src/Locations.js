import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  // State variables to store form inputs and fetched locations
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [locationCode, setLocationCode] = useState('');
  const [locations, setLocations] = useState([]); // Stores fetched locations

  // Fetch locations when the page loads
  useEffect(() => {
    axios
      .get('http://localhost:8080/location')
      .then((response) => {
        setLocations(response.data); // Set locations into state
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  // Handle form submission (Create button click)
  const handleCreate = () => {
    const newLocation = {
      name,
      country,
      city,
      locationCode,
    };

    axios
      .post('http://localhost:8080/location', newLocation)
      .then((response) => {
        console.log('Location created successfully:', response.data);
        setLocations([...locations, response.data]); // Add newly created location to the list
        setName('');
        setCountry('');
        setCity('');
        setLocationCode('');
      })
      .catch((error) => {
        console.error('Error creating location:', error);
      });
  };

  // Handle edit button (placeholder function)
  const handleEdit = (id) => {
    console.log(`Edit location with ID: ${id}`);
    // Implement your edit logic here (e.g., open a modal or fill form with data)
  };

  // Handle delete button
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/location/${id}`)
      .then((response) => {
        console.log('Location deleted:', response.data);
        setLocations(locations.filter((location) => location.id !== id)); // Remove deleted location from the list
      })
      .catch((error) => {
        console.error('Error deleting location:', error);
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Create New Location</h3>

      {/* First Row (Name & Country) */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px', width: '200px' }}>
          <label htmlFor="name" style={{ display: 'block', width: '100%' }}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', width: '100%' }}
          />
        </div>

        <div style={{ width: '200px' }}>
          <label htmlFor="country" style={{ display: 'block', width: '100%' }}>Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ padding: '5px', width: '100%' }}
          />
        </div>
      </div>

      {/* Second Row (City & Location Code) */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px', width: '200px' }}>
          <label htmlFor="city" style={{ display: 'block', width: '100%' }}>City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ padding: '5px', width: '100%' }}
          />
        </div>

        <div style={{ width: '200px' }}>
          <label htmlFor="locationCode" style={{ display: 'block', width: '100%' }}>Location Code:</label>
          <input
            type="text"
            id="locationCode"
            value={locationCode}
            onChange={(e) => setLocationCode(e.target.value)}
            style={{ padding: '5px', width: '100%' }}
          />
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={handleCreate}
        style={{
          padding: '5px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Create
      </button>

      {/* Locations Table */}
      <h3 style={{ marginTop: '40px' }}>Existing Locations</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Location Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.city}</td>
              <td>{location.country}</td>
              <td>{location.locationCode}</td>
              <td>
                <button
                  onClick={() => handleEdit(location.id)}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  style={{ cursor: 'pointer' }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
