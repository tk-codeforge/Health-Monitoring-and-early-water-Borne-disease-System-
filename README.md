# 🌊 Health Monitoring & Early Warning System (HMEWS)

A full-stack web application for predicting **water-borne diseases** using:
- 📍 Location-based water quality data
- 🤒 Symptoms-based input

Built using:
- ⚛️ React (Frontend)
- 🟢 Node.js + Express (Backend API)
- 🐍 Flask + Machine Learning (AI Models)
- 🧠 Random Forest / ML Models

---

## 🚀 Features

- 🔐 User Authentication (Login / Signup)
- 📍 Location-based Disease Prediction
- 🤒 Symptoms-based Disease Prediction
- 📊 Confidence Percentage Output
- 📈 Graphical Dashboard (Chart.js)
- ⚡ Real-time API integration

---

## 🏗️ Project Structure

```text
Early Water Borne Disease System/
├── backend/
│   ├── ai/
│   │   ├── data/
│   │   │   ├── water_quality.csv
│   │   │   └── symptoms_disease.csv
│   │   ├── app.py
│   │   ├── model.py
│   │   ├── train_symptoms.py
│   │   ├── model_location.pkl
│   │   ├── model_symptoms.pkl
│   │   └── encoders_location.pkl
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── predictionController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── predictionRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Symptoms.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   └── package.json
└── README.md

🚀 Installation & Setup

1️⃣ Backend Setup (Node.js)
cd backend
npm install
node server.js

2️⃣ AI Server Setup (Flask)
cd backend/ai
pip install -r requirements.txt
python app.py

3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start

👨‍💻 Author
Tanmay Kumar

⭐ If you like this project
Give it a ⭐ on GitHub!
