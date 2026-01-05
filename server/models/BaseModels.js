const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plan: {
        type: DataTypes.STRING, // 'FREE', 'PRO', 'ENTERPRISE'
        defaultValue: 'FREE'
    }
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false // Every user must belong to a company
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
        // Unique constraint is composite with company_id usually, but simple email unique is fine for now
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'HR', 'EMPLOYEE'),
        defaultValue: 'EMPLOYEE'
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    base_salary: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
});

module.exports = { Company, User };
