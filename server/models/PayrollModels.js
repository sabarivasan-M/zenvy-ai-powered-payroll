const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PRESENT', 'ABSENT', 'LEAVE', 'HALF_DAY'),
        defaultValue: 'PRESENT'
    },
    check_in: {
        type: DataTypes.TIME
    },
    check_out: {
        type: DataTypes.TIME
    }
});

const PayrollRun = sequelize.define('PayrollRun', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    month: {
        type: DataTypes.INTEGER, // 1-12
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'FINALIZED', 'PAID'),
        defaultValue: 'DRAFT'
    },
    total_payout: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
    }
});

const SalarySlip = sequelize.define('SalarySlip', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    payroll_run_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    basic_pay: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    allowances: {
        type: DataTypes.JSON, // Stores HRA, DA, etc.
        defaultValue: {}
    },
    deductions: {
        type: DataTypes.JSON, // Stores Tax, PF, etc.
        defaultValue: {}
    },
    net_pay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = { Attendance, PayrollRun, SalarySlip };
