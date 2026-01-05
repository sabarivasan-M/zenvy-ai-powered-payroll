const sequelize = require('../config/database');
const { Company, User } = require('./BaseModels');
const { Attendance, PayrollRun, SalarySlip } = require('./PayrollModels');

// Associations

// Company <-> Users
Company.hasMany(User, { foreignKey: 'company_id' });
User.belongsTo(Company, { foreignKey: 'company_id' });

// User <-> Attendance
User.hasMany(Attendance, { foreignKey: 'user_id' });
Attendance.belongsTo(User, { foreignKey: 'user_id' });

// Company <-> PayrollRuns
Company.hasMany(PayrollRun, { foreignKey: 'company_id' });
PayrollRun.belongsTo(Company, { foreignKey: 'company_id' });

// PayrollRun <-> SalarySlips
PayrollRun.hasMany(SalarySlip, { foreignKey: 'payroll_run_id' });
SalarySlip.belongsTo(PayrollRun, { foreignKey: 'payroll_run_id' });

// User <-> SalarySlips
User.hasMany(SalarySlip, { foreignKey: 'user_id' });
SalarySlip.belongsTo(User, { foreignKey: 'user_id' });


module.exports = {
    sequelize,
    Company,
    User,
    Attendance,
    PayrollRun,
    SalarySlip
};
