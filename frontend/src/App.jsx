import { useState } from "react";
import "./App.css";

const fields = [
  { key: "pregnancies",      label: "Pregnancies",              min: 0,   max: 20,   step: 1,    unit: "times",  hint: "Number of times pregnant" },
  { key: "glucose",          label: "Glucose",                  min: 0,   max: 300,  step: 1,    unit: "mg/dL",  hint: "Plasma glucose concentration" },
  { key: "bloodPressure",    label: "Blood Pressure",           min: 0,   max: 200,  step: 1,    unit: "mmHg",   hint: "Diastolic blood pressure" },
  { key: "skinThickness",    label: "Skin Thickness",           min: 0,   max: 100,  step: 1,    unit: "mm",     hint: "Triceps skin fold thickness" },
  { key: "insulin",          label: "Insulin",                  min: 0,   max: 900,  step: 1,    unit: "μU/mL",  hint: "2-Hour serum insulin" },
  { key: "bmi",              label: "BMI",                      min: 0,   max: 70,   step: 0.1,  unit: "kg/m²",  hint: "Body mass index" },
  { key: "diabetesPedigree", label: "Diabetes Pedigree",        min: 0,   max: 3,    step: 0.001,unit: "score",  hint: "Diabetes pedigree function" },
  { key: "age",              label: "Age",                      min: 1,   max: 120,  step: 1,    unit: "years",  hint: "Age in years" },
];

const initialForm = Object.fromEntries(fields.map(f => [f.key, ""]));

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    const empty = fields.filter(f => form[f.key] === "");
    if (empty.length > 0) {
      setError(`Please fill in: ${empty.map(f => f.label).join(", ")}`);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError("Could not connect to server. Make sure Flask is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError(null);
  };

  const isDiabetic = result?.prediction === 1;

  return (
    <div className="app">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-icon">⬡</div>
          <h1 className="title">GlucoseIQ</h1>
          <p className="subtitle">AI-Powered Diabetes Risk Predictor</p>
          <div className="header-badge">Logistic Regression · ROC AUC 0.81</div>
        </header>

        {/* Form */}
        <div className="card form-card">
          <div className="card-label">Patient Parameters</div>
          <div className="grid">
            {fields.map((field) => (
              <div className="field" key={field.key}>
                <label className="field-label">
                  {field.label}
                  <span className="field-unit">{field.unit}</span>
                </label>
                <input
                  type="number"
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder="—"
                  className="field-input"
                />
                <span className="field-hint">{field.hint}</span>
              </div>
            ))}
          </div>

          {error && <div className="error-msg">{error}</div>}

          <div className="btn-row">
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <button className="btn-predict" onClick={handleSubmit} disabled={loading}>
              {loading ? <span className="spinner" /> : "Analyze Risk"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`card result-card ${isDiabetic ? "result-positive" : "result-negative"}`}>
            <div className="result-icon">{isDiabetic ? "⚠" : "✓"}</div>
            <div className="result-label">{result.label}</div>
            <div className="result-prob-label">Diabetes Probability</div>
            <div className="result-prob">{result.probability}%</div>

            {/* Probability bar */}
            <div className="prob-bar-bg">
              <div
                className="prob-bar-fill"
                style={{ width: `${result.probability}%` }}
              />
            </div>

            <div className="result-note">
              {isDiabetic
                ? "High risk detected. Please consult a healthcare professional."
                : "Low risk detected. Maintain a healthy lifestyle."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
