const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.createEmployee = async (req, res) => {
    try {
        const { full_name, email, password, base_salary, joining_date } = req.body;
        const company_id = req.user.company_id;

        // Hash Default Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password || 'password123', salt);

        const newEmployee = await User.create({
            company_id,
            full_name,
            email,
            password_hash: hashedPassword,
            role: 'EMPLOYEE',
            base_salary,
            joining_date
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create employee' });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await User.findAll({
            where: { company_id: req.user.company_id },
            attributes: { exclude: ['password_hash'] }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch employees' });
    }
};
