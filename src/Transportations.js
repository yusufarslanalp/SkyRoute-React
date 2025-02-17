import React, { useEffect, useState } from 'react';

const Transportations = () => {
  const [locations, setLocations] = useState([]);
  const [fromId, setFromId] = useState(null);
  const [toId, setToId] = useState(null);
  const [type, setType] = useState('');
  const [transportations, setTransportations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/location')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));

    fetch('http://localhost:8080/transportation')
      .then((response) => response.json())
      .then((data) => setTransportations(data))
      .catch((error) => console.error('Error fetching transportations:', error));
  }, []);

  const handleCreate = () => {
    const transportationData = {
      fromId,
      toId,
      type,
    };

    fetch('http://localhost:8080/transportation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transportationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Transportation created successfully:', data);
        setTransportations([...transportations, data]);
      })
      .catch((error) => console.error('Error creating transportation:', error));
  };

  const handleEdit = (id) => {
    console.log(`Edit transportation with ID: ${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/transportation/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log('Transportation deleted:', response.data);
        setTransportations(transportations.filter((transportation) => transportation.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting transportation:', error);
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Transportation Creation</h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label htmlFor="from" style={{ marginRight: '10px' }}>
          From
        </label>
        <select
          id="from"
          value={fromId || ''}
          onChange={(e) => setFromId(Number(e.target.value))}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <label htmlFor="to" style={{ marginRight: '10px' }}>
          To
        </label>
        <select
          id="to"
          value={toId || ''}
          onChange={(e) => setToId(Number(e.target.value))}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <label htmlFor="type" style={{ marginRight: '10px' }}>
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          <option value="">Select Type</option>
          <option value="FLIGHT">Flight</option>
          <option value="BUS">Bus</option>
          <option value="SUBWAY">Subway</option>
          <option value="UBER">Uber</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
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
      </div>

      <h3 style={{ marginTop: '40px' }}>Existing Transportations</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transportations.map((transportation) => (
            <tr key={transportation.id}>
              <td>{transportation.id}</td>
              <td>{transportation.from.name}</td>
              <td>{transportation.to.name}</td>
              <td>{transportation.type}</td>
              <td>
                <button
                  onClick={() => handleEdit(transportation.id)}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(transportation.id)}
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

export default Transportations;
