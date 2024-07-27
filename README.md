# Project Management Application 🛠️

A comprehensive project management application developed using the MERN stack. This app allows users to create, edit, delete, and manage their tasks privately. Each user can only access and modify their own tasks. The application uses JSON Web Tokens (JWT) for authentication and Bcrypt for password hashing, ensuring secure access and data protection.

## 🌟 Features

- User Authentication: Secure login and registration using JWT and Bcrypt.
- Task Management: Users can create, edit, delete, and view their tasks.
- Private Data: Each user's data is private and secure.
- RESTful API: Backend built with Express and MongoDB for efficient data handling.
  

## 🚀 Tech Stack

### Frontend
- React.js
- HTML
- CSS
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (jsonwebtoken) for authentication
- Bcrypt.js for password hashing


🗂️ Folder Structure

## Backend
      backend/
      ├── node_modules/
      ├── middleware/
      │   └── authMiddleware.js
      ├── models/
      │   ├── task.model.js
      │   └── user.model.js
      ├── routes/
      │   ├── adminRoutes.js
      │   ├── taskRoutes.js
      │   └── userRoutes.js
      ├── index.js
      └── .env

## Frontend
      frontend/
      ├── node_modules/
      ├── src/
      │   ├── assets/
      │   ├── components/
      │   │   ├── PrivateRoutes.jsx
      │   │   └── Spinner.jsx
      │   ├── pages/
      │   │   ├── Login.jsx
      │   │   ├── Signup.jsx
      │   │   ├── AdminDashboard.jsx
      │   │   ├── Dashboard.jsx
      │   │   ├── TaskForm.jsx
      │   │   ├── AdminLogin.jsx
      │   │   └── AllTask.jsx
      │   ├── context/
      │   │   └── AuthContext.jsx
      │   ├── routes/
      │   │   └── AllRoutes.jsx
      │   ├── App.jsx
      │   └── main.jsx
      └── package.json

## 🖼️ Images
![task2](https://github.com/user-attachments/assets/fd4887c7-1358-49d9-9728-50f5c2dc7c32)
![task1](https://github.com/user-attachments/assets/e12e0460-a53b-4b1f-b932-1e5c5d95ec0b)


## 📄 License
This project is licensed under the MIT License.

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Md-abdul/Task_manager.git
