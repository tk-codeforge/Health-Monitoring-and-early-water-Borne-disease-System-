import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
import os
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "data", "symptoms_disease.csv")
data2 = pd.read_csv(csv_path)

# 1. Clean columns and handle missing data
data2.columns = data2.columns.str.strip().str.lower() 
data2 = data2.dropna()

# 2. Drop Patient_ID (IDs should never be used as predictive features)
if 'patient_id' in data2.columns:
    data2 = data2.drop('patient_id', axis=1)

# 3. Encode Categorical Columns (Gender and Disease)
le_gender = LabelEncoder()
data2['gender'] = le_gender.fit_transform(data2['gender'].astype(str).str.strip())

le_disease = LabelEncoder()
data2['disease'] = le_disease.fit_transform(data2['disease'].astype(str).str.strip())

# 4. Process Symptoms using CountVectorizer
# This splits "fever, vomiting" into separate 0/1 columns
def split_symptoms(text):
    return [s.strip().lower() for s in text.split(',')]

vectorizer = CountVectorizer(tokenizer=split_symptoms, lowercase=True)
symptoms_encoded = vectorizer.fit_transform(data2['symptoms']).toarray()
symptom_cols = vectorizer.get_feature_names_out()

# Merge the new symptom columns back into the dataframe
symptoms_df = pd.DataFrame(symptoms_encoded, columns=symptom_cols)
data2 = pd.concat([data2.drop('symptoms', axis=1), symptoms_df], axis=1)

# 5. Separate features and target
X2 = data2.drop('disease', axis=1)
y2 = data2['disease']

# 6. Train the Model
model_symptoms = RandomForestClassifier(random_state=42)
model_symptoms.fit(X2, y2)

# 7. Save ALL artifacts together in one file
artifacts = {
    "model": model_symptoms,
    "le_gender": le_gender,
    "le_disease": le_disease,
    "vectorizer": vectorizer,
    "feature_columns": X2.columns.tolist() # Save column order!
}

pickle.dump(artifacts, open(os.path.join(BASE_DIR, "disease_model_artifacts.pkl"), 'wb'))
print("Symptoms model trained and saved successfully! ✅")
