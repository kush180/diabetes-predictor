# 🩺 GlucoseIQ — AI-Powered Diabetes Risk Predictor

A full-stack machine learning web application that predicts diabetes risk from patient health parameters using Logistic Regression.

---

## 📊 Model Performance

| Metric | Score |
|---|---|
| Accuracy | ~78% |
| ROC AUC | 0.81 |
| Cross Validation | Stratified K-Fold (5 splits) |
| Algorithm | Logistic Regression + GridSearchCV |

---

## ⚙️ Tech Stack

**Machine Learning**
- Python, Scikit-learn, Pandas, NumPy
- Logistic Regression with GridSearchCV hyperparameter tuning
- Stratified K-Fold Cross Validation
- Winsorization for outlier treatment

**Backend**
- Flask (REST API)
- Flask-CORS

**Frontend**
- React.js (Vite)
- CSS3 with animations

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 22+
- Anaconda (recommended)

---

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/diabetes-predictor.git
cd diabetes-predictor/backend

# Install dependencies
pip install -r requirements.txt

# Add your pickle files to the backend/ folder
# diabetes_model.pkl and scaler.pkl

# Run Flask server
python app.py
```
Flask runs on **http://localhost:5000**

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
React runs on **http://localhost:5173**

---

## 🔌 API Reference

### `POST /predict`

**Request Body:**
```json
{
  "pregnancies": 6,
  "glucose": 148,
  "bloodPressure": 72,
  "skinThickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetesPedigree": 0.627,
  "age": 50
}
```

**Response:**
```json
{
  "prediction": 1,
  "label": "Diabetic",
  "probability": 82.3
}
```

### `GET /health`
Returns `{ "status": "ok" }` if server is running.

---

## 🧪 ML Pipeline Summary

1. **Data Cleaning** — Replaced invalid zeros with column medians (excluding zeros)
2. **Outlier Treatment** — Winsorization at 5th–95th percentile using IQR method
3. **Scaling** — StandardScaler on train set, applied to test set
4. **Modelling** — Logistic Regression with GridSearchCV over penalty, solver, C, class_weight
5. **Evaluation** — ROC AUC scored using predict_proba on Stratified K-Fold splits

---

## 📁 Dataset

**Pima Indians Diabetes Dataset**
- Source: [Kaggle](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)
- 768 samples, 8 features, 1 binary target (Outcome)
- Features: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age

---

## ⚠️ Disclaimer

This application is built for **academic purposes only** and is not intended for real medical diagnosis. Always consult a qualified healthcare professional for medical advice.

---

## 👤 Author

**Kushagra Verma** — ML Pipeline, Backend, Frontend

---

## 📄 License

This project is for academic use only.
