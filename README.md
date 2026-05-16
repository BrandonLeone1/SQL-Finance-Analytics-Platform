# Personal Finance Analytics Platform

A full-stack financial tracking and analytics application with with React, Node.js, Express, and PostgreSQL, designed to help users track income, expenses, and budgets with real-time aggregated insights.

## Features
- Secure user authentication (JWT-based)
- Full CRUD for transactions (income & expenses)
- Budget creation and category-based tracking
- Real-time budget utilization percentage
- Category-level spending breakdowns
- Weekly and monthly financial summaries
- Previous period comparisons (week/month)
- Interactive charts and analytics dashboard

## Technical Highlights
- PostgreSQL relational schema with normalized data structure
- Complex SQL aggregation using:
    - GROUP BY
    - JOIN
    - DATE_TRUNC
    - window/period time filtering
- Server-side financial computations reducing client-side processing
- JWT authentication with protected backend and frontend routes
- REST API architecture with modular route design
- Derived-state calculations instead of redundant stored values

## Tech Stack
- Frontend
    - React
    - Tailwind CSS
    - Recharts
    - Vite

- Backend
    - Node.js
    - Express
    - PostgreSQL
    - bcrypt
    - JWT

## What I Learned
- Designing normalized relational database schemas
- Swriting performant SQL aggregation queries
- Structuring scalable REST APIs with authentication
- Moving financial/calculation logic from frontend to backend
- Building analytics-driven dashboards

## Future Improvements
- Recurring transactions (salary, monthly subscriptions, etc)
- Budget alerts and notifications when reaching limit
- Ability to export data and charts (PDF)
- Multi-currency support

## Setup Locally
1. Clone the repo: 
```bash
git clone https://github.com/BrandonLeone1/SQL-Finance-Analytics-Platform.git
```

2. Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

3. Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

4. Create a .env file and add DB_STRING=your_postgres_url and JWT_SECRET=YOUR_SECRET: 

5. Run the backend:
```bash
tsx backend/server.js
```

6. Run the frontend:
```bash
cd frontend
npm run dev
```

7. Usage:
Navigate to http://localhost:5173 in your browser. Sign in to track your finances and see analytics.
