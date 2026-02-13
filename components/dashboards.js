import React, { useState, useEffect } from 'react';
import WaterInput from './WaterInput';
import SymptomInput from './SymptomInput';
import Alert from './Alert';
import API from '../services/api';

const Dashboard = () => {
  const [waterData, setWaterData] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const waterRes = await API.get('/api/water');
      const symptomRes = await API.get('/api/symptoms');
      setWaterData(waterRes.data);
      setSymptoms(symptomRes.data);
      checkForAlerts(waterRes.data, symptomRes.data);
    };
    fetchData();
  }, []);

  const checkForAlerts = (water, symp) => {
    const newAlerts = [];
    water.forEach(data => {
      if (data.pH < 6.5 || data.pH > 8.5) newAlerts.push('Abnormal pH detected - risk of water-borne disease');
      if (data.contaminants) newAlerts.push('Contaminants detected - potential health risk');
    });
    symp.forEach(symp => {
      if (symp.symptoms.includes('diarrhea') && symp.symptoms.includes('nausea')) newAlerts.push('Symptoms suggest cholera or similar');
    });
    setAlerts(newAlerts);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <WaterInput />
      <SymptomInput />
      <Alert alerts={alerts} />
      <h2>Water Data</h2>
      <ul>{waterData.map(d => <li key={d._id}>{`pH: ${d.pH}, Contaminants: ${d.contaminants}`}</li>)}</ul>
      <h2>Symptoms</h2>
      <ul>{symptoms.map(s => <li key={s._id}>{s.symptoms.join(', ')}</li>)}</ul>
    </div>
  );
};

export default Dashboard;
