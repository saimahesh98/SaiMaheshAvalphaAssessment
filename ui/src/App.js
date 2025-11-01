import logo from './logo.png';
import './App.css';
import { useState } from 'react';
import { calculateCommission } from "./apis/CommisionCalcAPIs";

function App() {
  const [formData, setFormData] = useState({
    localSalesCount: '',
    foreignSalesCount: '',
    averageSaleAmount: ''
  });
  
  const [results, setResults] = useState({
    avalphaTechnologiesCommission: 0,
    competitorCommission: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const maxSales = 100000;
    const maxAmount = 1000000;
    const newErrors = {};
    const localSales = Number(data.localSalesCount);
    const foreignSales = Number(data.foreignSalesCount);
    const averageAmount = Number(data.averageSaleAmount);

    if (isNaN(localSales) || localSales < 0 || localSales > maxSales) {
      newErrors.localSalesCount = `Local Sales Count must be 0 - ${maxSales}`;
    }
    if (isNaN(foreignSales) || foreignSales < 0 || foreignSales > maxSales) {
      newErrors.foreignSalesCount = `Foreign Sales Count must be 0 - ${maxSales}`;
    }
    if (isNaN(averageAmount) || averageAmount < 0 || averageAmount > maxAmount) {
      newErrors.averageSaleAmount = `Average Sale Amount must be 0 - £${maxAmount}`;
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors({});
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const localSales = Number(formData.localSalesCount);
    const foreignSales = Number(formData.foreignSalesCount);
    const averageAmount = Number(formData.averageSaleAmount);
    if (localSales === 0 && foreignSales === 0 && averageAmount === 0) {
      setErrors({ general: "All values cannot be zero. Please enter at least one non-zero value." });
      return;
    }
    setIsLoading(true);
    try {
      const data = await calculateCommission({
        localSalesCount: localSales,
        foreignSalesCount: foreignSales,
        averageSaleAmount: averageAmount,
      });
      setResults({
        avalphaTechnologiesCommission:
          data.avalphaTechnologiesCommissionAmount.toFixed(2),
        competitorCommission: data.competitorCommissionAmount.toFixed(2),
      });
    } catch (error) {
      setErrors({ api: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="Avalpha Technologies Logo" />
          <h1 className="company-title">Avalpha Technologies</h1>
          <h2 className="app-subtitle">Commission Calculator</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-container">
          <div className="form-section">
            <h3>Sales Information</h3>
            <form onSubmit={handleSubmit} className="calculator-form">
              <div className="form-group">
                <label htmlFor="localSalesCount">Local Sales Count</label>
                <input 
                  type="number" 
                  id="localSalesCount"
                  name="localSalesCount"
                  value={formData.localSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of local sales"
                  required
                  className={errors.localSalesCount ? "input-error" : ""}
                />
                {errors.localSalesCount && (
                  <div className="error-message">{errors.localSalesCount}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                <input
                  type="number"
                  id="foreignSalesCount"
                  name="foreignSalesCount"
                  value={formData.foreignSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of foreign sales"
                  required
                  className={errors.foreignSalesCount ? "input-error" : ""}
                />
                {errors.foreignSalesCount && (
                  <div className="error-message">{errors.foreignSalesCount}</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="averageSaleAmount">Average Sale Amount (£)</label>
                <input 
                  type="number" 
                  step="0.01"
                  id="averageSaleAmount"
                  name="averageSaleAmount"
                  value={formData.averageSaleAmount}
                  onChange={handleInputChange}
                  placeholder="Enter average sale amount"
                  required
                  className={errors.averageSaleAmount ? "input-error" : ""}
                />
                {errors.averageSaleAmount && (
                  <div className="error-message">{errors.averageSaleAmount}</div>
                )}
              </div>

              <button 
                type="submit" 
                className={`calculate-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Calculate Commission'}
              </button>
              {errors.general && (
                <div className="error-message" style={{ textAlign: 'center' }}>{errors.general}</div>
              )}
            </form>
          </div>

          <div className="results-section">
            <h3>Commission Results</h3>
            <div className="results-grid">
              <div className="result-card avalpha-card">
                <div className="result-header">
                  <h4>Avalpha Technologies</h4>
                  <span className="commission-rates">Local: 20% | Foreign: 35%</span>
                </div>
                <div className="result-amount">
                  £{results.avalphaTechnologiesCommission}
                </div>
              </div>
              
              <div className="result-card competitor-card">
                <div className="result-header">
                  <h4>Competitor</h4>
                  <span className="commission-rates">Local: 2% | Foreign: 7.55%</span>
                </div>
                <div className="result-amount">
                  £{results.competitorCommission}
                </div>
              </div>
            </div>
            
            {results.avalphaTechnologiesCommission > 0 && (
              <div className="advantage-indicator">
                <p className="advantage-text">
                  Avalpha Technologies advantage: 
                  <strong> £{(results.avalphaTechnologiesCommission - results.competitorCommission).toFixed(2)}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Avalpha Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
