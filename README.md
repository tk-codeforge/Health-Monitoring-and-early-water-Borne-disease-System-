# Health-Monitoring-and-early-water-Borne-disease-System-
A full-stack web application built using the MERN Stack that monitors water quality parameters and predicts early risks of water-borne diseases. The system helps health authorities and communities detect contamination early and take preventive action.

📌 Project Overview

Water-borne diseases such as cholera, typhoid, and dysentery spread due to contaminated water. 
This system:
Collects water quality data
Analyzes contamination levels
Predicts potential disease risk
Alerts users and authorities
Visualizes data using dashboards

**Project structure**
health-monitoring-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── WaterData.js
│   │   └── Symptom.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── waterData.js
│   │   └── symptoms.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── WaterInput.js
│   │   │   ├── SymptomInput.js
│   │   │   └── Alert.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── services/
│   │       └── api.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
