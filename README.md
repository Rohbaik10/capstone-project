# Smart Financial Assistant

Smart Financial Assistant is a web-based personal finance management application that helps users record income and expenses, monitor financial conditions, manage savings goals, and automatically categorize transactions using Artificial Intelligence (AI).

---

## Live Demo

### Frontend (Vercel)

https://capstone-project-five-fawn.vercel.app/

### Backend API (Railway)

https://capstone-project-production-9c31.up.railway.app/

### GitHub Repository

https://github.com/Rohbaik10/capstone-project

---

## Features

* User Authentication (Login & Register)
* Financial Dashboard
* Transaction Management
* Cashflow Monitoring
* Savings Target Management
* Financial Notifications
* Financial Recommendations
* AI-Based Transaction Categorization
* User Profile Management

---

## System Architecture

Users interact through the React.js Frontend application which communicates with the Node.js + Express.js Backend. The Backend manages data stored in Neon PostgreSQL and communicates with the AI Service built using Flask + TensorFlow to automatically categorize transactions.

### Architecture Diagram

![Architecture](screenshots/Diagram_Arsitektur_Drawio_Style.png)

---

## Application Screenshots

### Home Page

![Home](screenshots/home.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Transaction Management

![Transaction](screenshots/transaksi.png)

### Savings Management

![Savings](screenshots/tabungan.png)

### Cashflow Monitoring

![Cashflow](screenshots/cashflow.png)

### Financial Analysis

![Analysis](screenshots/analisis.png)

### Financial Recommendation

![Recommendation](screenshots/rekomendasi.png)

### Notification Center

![Notification](screenshots/notifikasi.png)

### User Profile

![Profile](screenshots/profile.png)

---

## Technology Stack

### Frontend

* React.js
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* Neon PostgreSQL

### Artificial Intelligence & Data Science

* Python
* Flask
* TensorFlow
* Keras
* Machine Learning Classification Model
* Transaction Categorization System
* Natural Language Processing (NLP)

---

## Data Science Implementation

This project implements Machine Learning to automatically classify transaction categories based on transaction descriptions entered by users.

### AI Workflow

```text
User Input
    ↓
Frontend React
    ↓
Backend Express
    ↓
AI Service Flask
    ↓
TensorFlow/Keras Model
    ↓
Predicted Category
    ↓
Neon PostgreSQL Database
```

### Supported Categories

* makanan
* minuman
* transportasi
* tagihan
* hiburan
* belanja
* topup
* lainnya

### Prediction Example

| Transaction Input | Predicted Category |
| ----------------- | ------------------ |
| beli nasi goreng  | makanan            |
| bayar listrik     | tagihan            |
| isi bensin        | transportasi       |
| topup dana        | topup              |
| beli kopi         | minuman            |

---

## Project Structure

```text
capstone-project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── ai-service/
│   │   ├── app.py
│   │   └── model_final.keras
│   └── package.json
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Rohbaik10/capstone-project.git
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
```

---

## Running the Application

### Run AI Service

```bash
cd backend/ai-service
python app.py
```

AI Service:

```text
http://localhost:5001
```

### Run Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Run Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Deployment

| Service  | Platform        |
| -------- | --------------- |
| Frontend | Vercel          |
| Backend  | Railway         |
| Database | Neon PostgreSQL |

---

## Team

**CC26-PSU189**

Coding Camp 2026 Capstone Project

---

## Release

Current Stable Version:

```text
v1.0
```

---

## License

This project was developed for educational purposes as part of the Coding Camp 2026 Capstone Project.
