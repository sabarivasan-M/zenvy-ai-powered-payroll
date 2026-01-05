

# ZENVY - AI Powered Payroll Platform

Zenvy is a next-generation payroll and workforce management platform designed to streamline HR operations for businesses. Built with a robust Node.js backend and a lightweight frontend, Zenvy manages companies, employees, attendance, and complex payroll calculations with ease.

## 🚀 Features

- **Company Management**: Manage multiple company entities within a single system.
- **Employee Management**: Comprehensive user profiles and role management.
- **Attendance Tracking**: Record and monitor employee attendance.
- **Payroll Processing**: Automated payroll runs and calculations.
- **Salary Slips**: Generate detailed salary slips for employees.
- **AI Integration**: (Planned) AI-driven insights for workforce analytics.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (Development), Sequelize ORM
- **Frontend**: Vanilla HTML/CSS/JS (Public directory)
- **Security**: BCrypt for password hashing, JWT (JSON Web Tokens) for authentication
- **Styling**: Modern CSS interactions

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/sabarivasan-M/zenvy-ai-powered-payroll.git
    cd zenvy-ai-powered-payroll
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Database Setup**
    The application uses SQLite. The database file `zenvy.sqlite` will be automatically creating and synced when you start the server.
    *Note: If you encounter database lock errors, you may need to reset the database.*

4.  **Start the Server**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

## 📂 Project Structure

```
zenvy-ai-powered-payroll/
├── public/                 # Static frontend files (HTML, CSS, JS)
├── server/
│   ├── config/             # Database configuration
│   ├── controllers/        # Route logic and controllers
│   ├── models/             # Sequelize database models
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── zenvy.sqlite            # SQLite Database file
└── package.json            # Project dependencies and scripts
```

## 🛡️ API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register` (TBD)
- **Employees**: `/api/employees`
- **Payroll**: `/api/payroll`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
