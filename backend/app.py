from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import os

app = Flask(_name_)
CORS(app)  # Enable CORS for React frontend

# Load your trained model (update path if needed)
# model = joblib.load('fraud_detection_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features from request
        features = [
            float(data['amount']),
            float(data['timeSinceLastTxn']),
            float(data['numTxnsLastHour']),
            float(data['avgAmountLastHour']),
            int(data['isInternational']),
            int(data['deviceType'])
        ]
        
        # Convert to numpy array
        features_array = np.array([features])
        
        # OPTION 1: Using a trained model (uncomment when you have a model)
        # prediction = model.predict(features_array)[0]
        # confidence = model.predict_proba(features_array)[0]
        # fraud_probability = float(confidence[1])  # Probability of fraud class
        
        # OPTION 2: Rule-based logic for testing (remove when using real model)
        prediction, fraud_probability = rule_based_fraud_detection(features)
        
        response = {
            'prediction': int(prediction),
            'confidence': float(fraud_probability),
            'message': 'Fraud detected' if prediction == 1 else 'Transaction appears safe'
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def rule_based_fraud_detection(features):
    """
    Simple rule-based fraud detection for testing.
    Replace this with your trained ML model.
    """
    amount, time_since, num_txns, avg_amount, is_intl, device = features
    
    fraud_score = 0
    
    # High amount transactions
    if amount > 5000:
        fraud_score += 0.3
    
    # Multiple transactions in short time
    if num_txns > 5 and time_since < 300:  # 5+ txns in 5 minutes
        fraud_score += 0.25
    
    # Large deviation from average
    if amount > avg_amount * 3:
        fraud_score += 0.25
    
    # International transactions
    if is_intl == 1:
        fraud_score += 0.2
    
    # Unusual time pattern
    if time_since < 60:  # Less than 1 minute
        fraud_score += 0.15
    
    prediction = 1 if fraud_score > 0.5 else 0
    confidence = min(fraud_score, 0.99) if prediction == 1 else min(1 - fraud_score, 0.99)
    
    return prediction, confidence

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if _name_ == '_main_':
    app.run(debug=True, host='0.0.0.0', port=5000)
