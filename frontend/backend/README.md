# Fraud Detection Backend

Flask API for fraud detection predictions.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### POST /predict
Analyzes a transaction for fraud detection.

**Request Body:**
```json
{
  "amount": 5000.00,
  "timeSinceLastTxn": 3600,
  "numTxnsLastHour": 3,
  "avgAmountLastHour": 2500.00,
  "isInternational": 0,
  "deviceType": 1
}
```

**Response:**
```json
{
  "prediction": 1,
  "confidence": 0.85,
  "message": "Fraud detected"
}
```

### GET /health
Health check endpoint.

## Adding Your ML Model

1. Train your model and save it:
```python
import joblib
joblib.dump(model, 'fraud_detection_model.pkl')
```

2. Uncomment the model loading lines in app.py
3. Replace the rule-based detection with model predictions
