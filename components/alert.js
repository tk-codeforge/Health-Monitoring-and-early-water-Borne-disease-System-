import React from 'react';

const Alert = ({ alerts }) => {
  return (
    <div>
      {alerts.map((alert, index) => <p key={index} style={{ color: 'red' }}>{alert}</p>)}
    </div>
  );
};

export default Alert;
