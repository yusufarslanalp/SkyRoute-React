import React, { useState } from 'react';
import axios from 'axios';

const Page1 = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightRoutes, setFlightRoutes] = useState([]); // Add this line to define flightRoutes state
  const [expandedFlightRouteId, setExpandedFlightRouteId] = useState(null); // To track expanded flight route

  const handleSearch = () => {
    console.log(`Searching for routes from ${origin} to ${destination}`);
    axios
      .get('http://localhost:8080/route')  // Replace with your API URL
      .then((response) => {
        //console.log('Response from server:', response.data);
        const flightRoutes = response.data;
        console.log(flightRoutes);
        setFlightRoutes(flightRoutes); // Update flightRoutes with the data from the API
      })
      .catch((error) => {
        console.error('There was an error making the request!', error);
      });
  };

  const handleFlightRouteClick = (flightRouteId) => {
    // Toggle expanded state for flight route
    setExpandedFlightRouteId((prev) => (prev === flightRouteId ? null : flightRouteId));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Search for Routes</h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="origin" style={{ marginRight: '10px' }}>
          Origin
        </label>
        <select
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          <option value="">Select Origin</option>
          <option value="Location1">Location 1</option>
          <option value="Location2">Location 2</option>
          <option value="Location3">Location 3</option>
        </select>

        <label htmlFor="destination" style={{ marginRight: '10px' }}>
          Destination
        </label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          <option value="">Select Destination</option>
          <option value="LocationA">Location A</option>
          <option value="LocationB">Location B</option>
          <option value="LocationC">Location C</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: '5px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4>Flight Routes</h4>
        {flightRoutes.length > 0 ? (
          flightRoutes.map((flightRoute, index) => (
            Array.isArray(flightRoute) && flightRoute.length > 0 ? (
              <div key={flightRoute[0].id} style={{ marginBottom: '10px' }}>
                {/* Display the first transportation's 'from' location */}
                <div
                  onClick={() => handleFlightRouteClick(flightRoute[0].id)}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {flightRoute[0].from.name}  {/* Displaying 'from' name of the first transportation */}
                </div>

                {/* Show flight route details if expanded */}
                {expandedFlightRouteId === flightRoute[0].id && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '10px',
                      backgroundColor: '#f1f1f1',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                    }}
                  >
                    <strong>Flight Route Details:</strong>
                    <p>O {flightRoute[0].from.name}</p>
                    <p>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flightRoute[0].type}</p>
                    <p>O {flightRoute[0].to.name}</p>

                    {flightRoute.length > 1 && (
                      <>
                        <p>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flightRoute[1].type}</p>
                        <p>O {flightRoute[1].to.name}</p>
                      </>
                    )}

                    {flightRoute.length > 2 && (
                      <>
                        <p>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flightRoute[2].type}</p>
                        <p>O {flightRoute[2].to.name}</p>
                      </>
                    )}
                    
                  </div>
                )}
              </div>
            ) : null
          ))
        ) : (
          <div>No flight routes available</div>
        )}
      </div>

    </div>
  );
};

export default Page1;
