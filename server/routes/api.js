const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');
const payrollController = require('../controllers/payrollController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Auth
router.post('/auth/register', authController.registerCompany);
router.post('/auth/login', authController.login);

// Employees (HR/Admin)
router.post('/employees', authenticateToken, authorizeRoles('ADMIN', 'HR'), employeeController.createEmployee);
router.get('/employees', authenticateToken, employeeController.getEmployees);

// Attendance
router.post('/attendance', authenticateToken, payrollController.markAttendance);
router.get('/attendance', authenticateToken, payrollController.getAttendance);

// Payroll (HR/Admin)
router.post('/payroll/run', authenticateToken, authorizeRoles('ADMIN', 'HR'), payrollController.runPayroll);
router.get('/payroll/runs', authenticateToken, authorizeRoles('ADMIN', 'HR'), payrollController.getPayrollRuns);

// Employee View
router.get('/salary-slips', authenticateToken, payrollController.getSalarySlip);

module.exports = router;
