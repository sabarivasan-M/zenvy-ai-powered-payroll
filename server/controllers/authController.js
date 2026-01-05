const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Company } = require('../models');
const { SECRET_KEY } = require('../middleware/auth');

exports.registerCompany = async (req, res) => {
    try {
        const { companyName, adminName, email, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        // Create Company
        const company = await Company.create({ name: companyName });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create Admin User
        const user = await User.create({
            company_id: company.id,
            full_name: adminName,
            email,
            password_hash: hashedPassword,
            role: 'ADMIN'
        });

        res.status(201).json({ message: 'Company and Admin registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user.id, company_id: user.company_id, role: user.role, email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, name: user.full_name, role: user.role } });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
