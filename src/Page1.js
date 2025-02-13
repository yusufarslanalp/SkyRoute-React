import React, { useState } from 'react';
import axios from 'axios';

const Page1 = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [expandedProductId, setExpandedProductId] = useState(null); // To track expanded product

  const handleSearch = () => {
    console.log(`Searching for routes from ${origin} to ${destination}`);
    axios
      .get('http://localhost:8081/product')  // Replace with your API URL
      .then((response) => {
        console.log('Response from server:', response.data);
        setProducts(response.data);  // Assuming the response is a list of products
      })
      .catch((error) => {
        console.error('There was an error making the request!', error);
      });
  };

  const handleProductClick = (productId) => {
    // Toggle expanded state for product
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Search for Title</h3>
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
        <h4>Product List</h4>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ marginBottom: '10px' }}>
              <div
                onClick={() => handleProductClick(product.id)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {product.name}  {/* Displaying product name */}
              </div>

              {/* Show product details if the product is expanded */}
              {expandedProductId === product.id && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#f1f1f1',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                >
                  <strong>Product Details:</strong>
                  <p>Here some product detail.</p>  {/* Placeholder for product details */}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default Page1;
