import React, { useState } from 'react';
import API from '../services/api';

const SymptomInput = () => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symptomArray = symptoms.split(',').map(s => s.trim());
    await API.post('/api/symptoms', { symptoms: symptomArray });
    alert('Symptoms submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Symptoms (comma separated)" />
      <button type="submit">Submit Symptoms</button>
    </form>
  );
};

export default SymptomInput;
