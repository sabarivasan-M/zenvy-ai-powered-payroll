// Mock AI Service for ZENVY
// In a real app, this would call Python/Flask APIs or OpenAI/Gemini endpoints.

exports.detectAnomalies = async (salarySlips, history) => {
    // Logic: If any salary is > 10% deviation from average, flag it.
    const anomalies = [];

    // Simple mock logic
    salarySlips.forEach(slip => {
        if (slip.net_pay > 100000) { // Arbitrary threshold for demo
            anomalies.push({ user_id: slip.user_id, reason: 'High Salary Alert' });
        }
    });

    return {
        hasAnomalies: anomalies.length > 0,
        details: anomalies
    };
};

exports.forecastPayroll = async (companyId, currentTotal) => {
    // Random fluctuation between -1% and +5%
    const growthFactor = 1 + (Math.random() * 0.06 - 0.01);
    const predicted = Math.round(currentTotal * growthFactor);

    return {
        nextMonthPrediction: predicted,
        confidence: 'High'
    };
};
