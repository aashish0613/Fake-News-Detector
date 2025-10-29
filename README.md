

# 📰 Fake News Detector

**A Full-Stack AI-Powered Fake News Detection Platform**

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

Detect, analyze, and understand news credibility with the power of AI. Empowering users to fight misinformation in real time.

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

Fake News Detector is a modern, full-stack web application that leverages machine learning to classify news articles as real or fake. With a sleek, responsive interface and robust backend, it empowers users to:

- 📰 Instantly analyze news articles for credibility
- 👤 Register and manage their accounts securely
- 📊 View a history of their submissions and results
- 🌙 Enjoy a seamless experience with dark mode support

The platform combines the best of web technologies and AI to help combat misinformation and promote media literacy.

---

## Features

*   User authentication (signup and login).
*   Submit news articles for analysis.
*   View a history of submitted articles and their classification.
*   Responsive user interface.
*   Dark mode support.

## Technologies Used

**Frontend:**
*   React
*   Vite
*   Tailwind CSS
*   React Router
*   Axios

**Backend:**
*   Node.js
*   Express
*   MongoDB
*   Mongoose
*   JSON Web Tokens (JWT) for authentication

**Machine Learning:**
*   Python
*   Scikit-learn
*   FastAPI (for the API)

## Project Structure

```
fake-news-detector/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   └── vite.config.js
└── ml/
    ├── main.py
    ├── model.py
    └── requirements.txt
```

## Setup and Installation

### Prerequisites

*   Node.js and npm
*   Python and pip
*   MongoDB

### 1. Backend Setup

```bash
cd backend
npm install
# Create a .env file and add your MongoDB connection string and JWT secret
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Machine Learning Model Setup

```bash
cd ml
pip install -r requirements.txt
python main.py
```

## How to Run

1.  **Start the Backend Server:** Navigate to the `backend` directory and run `npm start`. The server will start on the port specified in your configuration (e.g., port 5000).
2.  **Start the Frontend Development Server:** In a new terminal, navigate to the `frontend` directory and run `npm run dev`. The React application will be available at `http://localhost:5173` (or another port if 5173 is in use).
3.  **Start the ML API:** In another terminal, navigate to the `ml` directory and run `python main.py`. The FastAPI for the machine learning model will be running.

Now you can open your browser and access the application.

---

## � License

This project is licensed under the terms of the MIT License. See the [LICENSE](https://github.com/aashish0613/Fake-News-Detector/blob/main/LICENSE) file for details.

---

## �👤 Contact

Aashish Thakur - [LinkedIn](https://www.linkedin.com/in/aashish-thakur-11a72025a/)

Project Link: [https://github.com/aashish0613/Fake-News-Detector](https://github.com/aashish0613/Fake-News-Detector)
