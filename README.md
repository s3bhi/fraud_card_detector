Fraud Detection System using Machine Learning

This project is a machine learning–based fraud detection system designed to identify fraudulent transactions in real time.
It combines a Flask backend and a React (Vite) frontend to provide an interactive web interface for prediction.

Project Overview

The system analyzes transaction details such as amount, frequency, device type, and international activity to predict whether a transaction is fraudulent.
A Random Forest Classifier model was trained on a synthetic dataset that simulates real-world transaction patterns.

Tech Stack

Frontend: React (Vite)

Backend: Flask (Python)

Machine Learning: Scikit-learn (Random Forest)

Data Handling: Pandas, NumPy

Model Storage: Joblib

Features

Predicts whether a transaction is fraudulent or legitimate

Interactive web interface for user input

Real-time prediction using a trained machine learning model

Flask API integration with React frontend

How to Run the Project
1. Clone the repository
https://github.com/s3bhi/fraud_card_detector.git
cd fraud-detection

2. Backend Setup (Flask)
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Use 'venv\Scripts\activate' if using CMD
pip install -r requirements.txt
python app.py


Flask will start at http://localhost:5000

3. Frontend Setup (React + Vite)

Open a new terminal:

cd frontend
npm install
npm run dev


Vite will start at http://localhost:5173

Dataset

The dataset used for training is a synthetic dataset created to mimic real-world credit card transactions, containing both fraudulent and non-fraudulent samples.
It includes key features like transaction amount, time between transactions, and number of recent transactions.

Model Details

Algorithm: Random Forest Classifier

Accuracy: Achieved high training and testing accuracy on the dataset

Saved Files:

fraud_model.pkl → Trained model

scaler.pkl → Data scaler for preprocessing

### 🤝 Contributors  
Special thanks to our amazing contributors: @Megatrox1 (Aashishkumar7903), @Prety2910, and @RoshanLourdhu for their support and contributions to this project.

