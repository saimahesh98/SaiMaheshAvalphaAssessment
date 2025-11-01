# Commission Calculator – Avalpha Technologies

## Overview
This project implements a Commission Calculator for Avalpha Technologies, connecting a React frontend with a .NET backend.  
It calculates and compares Avalpha and competitor commissions for local and foreign sales based on given business rules.

---

## Business Rules

| Type | Avalpha Commission | Competitor Commission |
|------|--------------------|-----------------------|
| Local | 20% | 2% |
| Foreign | 35% | 7.55% |

### Formula:

Commission = CommissionRate × SalesCount × AverageSaleAmount


### Example:
For Local = 10, Foreign = 10, Average Sale = £100:
- Avalpha Local = 20% × 10 × 100 = £200  
- Avalpha Foreign = 35% × 10 × 100 = £350  
- Avalpha Total = £550 

- Competitor Local = 2% × 10 × 100 = £20  
- Competitor Foreign = 7.55% × 10 × 100 = £75.5  
- Competitor Total = £95.5

---

## Implementation Decisions

1. Backend
   - Built using .NET 8 Web API.
   - Exposes `POST /api/commission`.
   - Input validation ensures:
     - All fields are numeric.
     - Values ≥ 0.
     - Prevents unrealistic input values.
   - Returns structured JSON (Avalpha and Competitor commissions).

2. Frontend
   - Built using React (JavaScript, not converted to TypeScript as original scaffold uses JS).
   - Uses fetch for API communication.
   - Displays results with proper currency formatting.
   - Shows inline warnings for invalid or empty input.
   - Handles backend errors gracefully with user-friendly messages.

3. CORS
   - Configured to allow all for now
     

4. Validation
   - Frontend prevents submission if inputs are empty or invalid.
   - Backend double-validates requests for safety.

---

## How to Run

### Backend (.NET API)

dotnet run


### Frontend (React)


npm install
npm run dev

App runs at `http://localhost:3000`.

Ensure backend is running before testing.

---

##  Testing

### Backend

dotnet test

### Frontend

npm test


---

## Trade-offs & Improvements

- Kept code concise and readable within the time limit (4 hours).
- Skipped advanced TypeScript migration since scaffold used plain JS.
- Could later add:
  - Configurable commission rates from DB or config file.
  - Unit tests for edge cases.
  - Form validation library (e.g., React Hook Form).
  - CI/CD setup for automated builds.

---