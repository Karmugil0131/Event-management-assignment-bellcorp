# BellCorp Event Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to explore events, register for them, manage their registrations, and interact with a secure authentication system.

---


## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Persistent Login (localStorage)
- Logout Functionality

### 📅 Events
- View all available events
- Search by title
- Filter by category
- Filter by location
- View detailed event information
- Real-time seat availability tracking

### 📝 Registration System
- Register for an event
- Cancel event registration
- Prevent duplicate registrations
- Prevent registration for:
  - Full events
  - Past events
- View registered events in **My Events**

### 📊 Dashboard
- Welcome message
- Total available events
- Total user registrations

### 🎨 UI Enhancements
- Clean navigation bar
- Dynamic success/error messages
- Disabled states for closed/full events
- Centralized Axios configuration
- Environment-based API configuration

---

## 🏗️ Tech Stack

### Frontend
- React
- React Router DOM
- Axios (Centralized Instance)
- Context API (AuthContext)
- CSS (Custom Styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Middleware-based Route Protection

---

## ⚙️ Installation Guide

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Karmugil0131/Event-management-assignment-bellcorp
cd BellCorp-Event-App
```

#### 2️⃣ Backend setup

```bash
cd server
npm install
```

Create a .env file inside server/:

```ini
PORT=5000
MONGO_URI=mongodb+srv://bellcorpuser:bellcorpuser1234@cluster0.jmvithy.mongodb.net/eventdb?retryWrites=true&w=majority
JWT_SECRET=supersecretkey123
```

Start backend:

```bash
npm run dev
```

#### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create .env inside client/:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm start
```
---
## Authenticated User Credentials

<details>
<summary>Click to view</summary>

- [
    {
        "email": "belluser@test.com",
        "password": "bell1234",
    },
    {
        "email": "kesav@test.com",
        "password": "123456",
    },
    {
        "email": "santy@test.com",
        "password": "santy1234",
    }
]
</details>

---

## 🔐 Environment Variables

### Backend(server/.env)
- PORT
- MONGO_URI
- JWT_SECRET

### Frontend(client/.env)
- REACT_APP_API_URL

---

## 🛡 Security
- JWT Token Authentication
- Protected Routes Middleware
- Backend Business Rule Validation
- Secure API Access with Authorization Headers

---

## 🏁 Conclusion

This project showcases a production-ready event management workflow with:

- Secure authentication
- Clean frontend-backend separation
- Scalable architecture design
- Real-world event registration logic


