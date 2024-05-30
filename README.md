# Paytm Clone
## Description
 This project is a full-stack application that enable user to register, sign-in, and transfer money between accounts. It features a React frintend, Express.js and Node.js backend utilizes MongoDB for data storage.

 ## Table of Contents
 - [Installation](#installation) 
 - [Usage](#Usage) 
 - [Features](#Features) 
 - [Technologies Used](#Technologies-used)

 ## Installation
 1. Clone the repositry
 ```sh 
 git clone http://github.com 
 ``` 
 2. navigate to project directory
 ```sh
 cd paytm/frontend
 cd paytm/backend
 ```
 3. Install the dependencies in both the frontend and backend folders
```sh
npm install
```
4. Run the project
```sh
npm run dev 
npm run start
```

# Features
## Frontend
- React-App : Built with React for a dynamic user interface.
- Routing : Using React Router DOM for navigating between pages.
- Notification : Integrated React Hot Toast for user notification.
- State Management : Managed using Recoil
- Form Handling : Handled using React Hook Form.

## Frontend Functionality
- User Sign-in : Users can sign-in into existing account.
- User Register : User can register to create a new account.
- Notification : User notifications using react-hot-toast.
- From Handling : Efficient form handling with React-Hook-Form.
- Backend Interaction : Dynamic interface querying the backend usign axios.

# Backend 
- Express.js and Node.js : Used for backend development.
- MongoDb : Database for storing user data.
- Mongoose : ORM for MongoDB.
- Zod : Input validation.
- JsonWebTokens : For user authentication.
- CORS : Allowing request from different origins.

## Backend Functionality
- User Authentication : Controllers for login.
- Money Trasfer: Controllers for transfering money between user accounts usign session functionality of mongoose.

# Technologies Used
## Frontend:
- React
- React Router Dom
- React Hot Toast
- Recoil
- React Hook Form 
- Axios

## Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- JWT
- CORS