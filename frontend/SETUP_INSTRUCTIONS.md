# Setup Instructions - Fraud Detection App

## Step-by-Step Guide

### Step 1: Setup Backend (Flask)

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
```bash
pip install -r requirements.txt
```

5. **Start Flask server:**
```bash
python app.py
```

You should see: `Running on http://0.0.0.0:5000`

### Step 2: Setup Frontend (React)

1. **Open a new terminal and navigate to frontend folder:**
```bash
cd frontend
```

2. **Install dependencies (if not already installed):**
```bash
npm install
```

3. **Start React development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or similar)

### Step 3: Test the Connection

1. Open your browser to the frontend URL
2. Fill in the transaction form with test data:
   - Amount: 10000
   - Time Since Last Txn: 100
   - Transactions Last Hour: 8
   - Avg Amount Last Hour: 2000
   - International: Yes
   - Device: Desktop
3. Click "Analyze Transaction"
4. You should see the fraud detection result!

### Step 4: Add Your Own ML Model (Optional)

If you have a trained model:

1. Save your model in the backend folder:
```python
import joblib
joblib.dump(your_model, 'backend/fraud_detection_model.pkl')
```

2. Update `backend/app.py`:
   - Uncomment line 11: `model = joblib.load('fraud_detection_model.pkl')`
   - Uncomment lines 30-32 (model prediction code)
   - Comment out or remove line 35 (rule-based detection)

### Troubleshooting

**CORS Error:**
- Make sure Flask server is running
- Check that `flask-cors` is installed: `pip install flask-cors`

**Connection Refused:**
- Verify Flask is running on port 5000
- Check firewall settings

**Port Already in Use:**
- Change port in `app.py`: `app.run(port=5001)`
- Update frontend API URL in `TransactionForm.tsx`

### Project Structure
```
project/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── frontend/
    └── src/
        └── components/
            └── TransactionForm.tsx
```
