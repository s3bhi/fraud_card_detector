# type: ignore
import pandas as pd
import numpy as np
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib

# ----------------------------
# 1️⃣ Generate synthetic dataset
# ----------------------------

def generate_dataset(n=1000):
    data = []
    for i in range(n):
        # realistic behavior
        is_fraud = random.choices([0, 1], weights=[0.9, 0.1])[0]  # 10% fraud
        if is_fraud == 0:
            amount = np.random.uniform(10, 5000)
            time_since_last = np.random.uniform(600, 72000)  # 10 min - 20 hrs
            num_txns_hour = np.random.randint(0, 5)
            avg_amt_hour = np.random.uniform(10, 3000)
            is_international = 0
            device = random.choice([0, 1])  # 0=Mobile, 1=Desktop
        else:
            amount = np.random.uniform(10000, 100000)
            time_since_last = np.random.uniform(1, 300)  # very frequent
            num_txns_hour = np.random.randint(5, 20)
            avg_amt_hour = np.random.uniform(5000, 80000)
            is_international = random.choice([0, 1])
            device = random.choice([0, 1])

        data.append([
            i+1, amount, time_since_last, num_txns_hour,
            avg_amt_hour, is_international, device, is_fraud
        ])

    columns = [
        "TransactionID", "Amount", "TimeSinceLastTxn",
        "NumTxnsLastHour", "AvgAmountLastHour",
        "IsInternational", "DeviceType", "Class"
    ]
    df = pd.DataFrame(data, columns=columns)
    return df


# ----------------------------
# 2️⃣ Save dataset
# ----------------------------

df = generate_dataset(1000)
df.to_csv("fraud_dataset.csv", index=False)
print("✅ Dataset 'fraud_dataset.csv' generated successfully!")
print(df.head())


# ----------------------------
# 3️⃣ Train the model
# ----------------------------

X = df[["Amount", "TimeSinceLastTxn", "NumTxnsLastHour",
        "AvgAmountLastHour", "IsInternational", "DeviceType"]]
y = df["Class"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print(f"✅ Model trained successfully!")
print(f"Training Accuracy: {model.score(X_train, y_train)*100:.2f}%")
print(f"Testing Accuracy: {model.score(X_test, y_test)*100:.2f}%")

joblib.dump(model, "fraud_model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("💾 Model and scaler saved!")


# ----------------------------
# 4️⃣ Manual Testing Mode
# ----------------------------

print("\n🔍 Fraud Detection Test Console")
amount = float(input("💰 Enter transaction amount (e.g., 5000): "))
time_since_last = float(input("⏱️ Enter time since last transaction (in seconds): "))
num_txns_hour = int(input("🧾 Enter number of txns in last hour: "))
avg_amt_hour = float(input("📊 Enter avg amount in last hour: "))
is_international = int(input("🌍 Is international? (0=No,1=Yes): "))
device = int(input("💻 Device type (0=Mobile,1=Desktop): "))

input_data = np.array([[amount, time_since_last, num_txns_hour,
                        avg_amt_hour, is_international, device]])
input_scaled = scaler.transform(input_data)
pred = model.predict(input_scaled)[0]

if pred == 1:
    print("🚨 ALERT: Fraudulent Transaction Detected!")
else:
    print("✅ Transaction appears Safe.")
