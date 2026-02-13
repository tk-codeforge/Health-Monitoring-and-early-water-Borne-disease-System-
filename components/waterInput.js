import React, { useState } from 'react';
import API from '../services/api';

const WaterInput = () => {
  const [data, setData] = useState({ pH: '', contaminants: '', location: '' });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/api/water', data);
    alert('Data submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="pH" placeholder="pH Level" onChange={handleChange} />
      <input name="contaminants" placeholder="Contaminants" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <button type="submit">Submit Water Data</button>
    </form>
  );
};

export default WaterInput;
