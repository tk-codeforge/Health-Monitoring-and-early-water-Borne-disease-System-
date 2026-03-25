import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

data1 = pd.read_csv(os.path.join(BASE_DIR, "data", "water_quality.csv"))

# Strip leading/trailing whitespace from column names
data1.columns = data1.columns.str.strip()

# Drop rows with missing data (optional)
data1 = data1.dropna()

# Safely select all text/categorical columns (catches both 'object' and 'string' dtypes)
categorical_cols = data1.select_dtypes(include=['object', 'string', 'category']).columns

# Strip whitespace from string columns' values
for col in categorical_cols:
    data1[col] = data1[col].astype(str).str.strip()

# Encode categorical columns including target
encoders = {}
for col in categorical_cols:
    le = LabelEncoder()
    data1[col] = le.fit_transform(data1[col])
    encoders[col] = le

# Verify dtypes and data (They should all be int/float now)
print(data1.dtypes)
print(data1.head())

# Separate features and target
X1 = data1.drop('disease', axis=1)
y1 = data1['disease']

# Train classifier
model_location = RandomForestClassifier(random_state=42)
model_location.fit(X1, y1)

# Save model and encoders
pickle.dump(model_location, open(os.path.join(BASE_DIR, "model_location.pkl"), 'wb'))
pickle.dump(encoders, open(os.path.join(BASE_DIR, "encoders_location.pkl"), 'wb'))

print("Location model trained ✅")
