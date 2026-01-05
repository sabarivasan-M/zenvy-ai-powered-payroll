const user = JSON.parse(localStorage.getItem('user'));

if (!user) window.location.href = 'index.html';
document.getElementById('userInfo').textContent = `${user.name} (${user.role})`;

// State
let currentView = 'home';

// Initial Load
loadView('home');

function loadView(view) {
    currentView = view;
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    // rudimentary active state toggle based on text content matching view name roughly
    // skipping distinct ID for nav items for brevity

    const container = document.getElementById('viewContainer');
    const title = document.getElementById('pageTitle');

    if (view === 'home') {
        title.textContent = 'Company Overview';
        container.innerHTML = `
            <div class="stat-grid">
                <div class="stat-card">
                    <h3>Total Employees</h3>
                    <div class="stat-value" id="totalEmps">-</div>
                </div>
                <div class="stat-card">
                    <h3>Last Payroll</h3>
                    <div class="stat-value" id="lastPayrollDate">-</div>
                </div>
            </div>
        `;
        fetchStats();
    } else if (view === 'employees') {
        title.textContent = 'Employee Management';
        container.innerHTML = `
            <button class="cta-btn" style="width: auto; margin-bottom: 1rem;" onclick="openAddEmpModal()">+ Add Employee</button>
            <div class="glass-card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody id="empTableBody"></tbody>
                </table>
            </div>
        `;
        fetchEmployees();
    } else if (view === 'payroll') {
        title.textContent = 'Payroll & AI Insights';
        container.innerHTML = `
            <div class="glass-card" style="margin-bottom: 2rem;">
                <h3>Action</h3>
                <br>
                <div style="display: flex; gap: 1rem; align-items: flex-end;">
                     <div class="input-group" style="margin-bottom:0; flex: 1;">
                        <label>Month</label>
                        <select id="runMonth" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid rgba(255,255,255,0.1);">
                            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                    </div>
                    <div class="input-group" style="margin-bottom:0; flex: 1;">
                        <label>Year</label>
                        <input type="number" id="runYear" value="2024">
                    </div>
                    <button class="cta-btn" onclick="runPayroll()">Run AI Payroll</button>
                </div>
            </div>

            <div id="aiStart" class="glass-card hidden" style="border-color: var(--accent);">
                <h3 style="color: var(--accent)">✦ AI Insights</h3>
                <div id="aiContent" style="margin-top: 1rem; line-height: 1.6;"></div>
            </div>
            <br>

             <div class="glass-card">
                <h3>History</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date Run</th>
                            <th>Month/Year</th>
                            <th>Total Payout</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="payrollTableBody"></tbody>
                </table>
            </div>
        `;
        fetchPayrollHistory();
    }
}

// Data Fetchers
async function fetchStats() {
    try {
        const emps = await apiRequest('/employees');
        document.getElementById('totalEmps').textContent = emps.length;
    } catch (e) { }
}

async function fetchEmployees() {
    try {
        const emps = await apiRequest('/employees');
        const tbody = document.getElementById('empTableBody');
        tbody.innerHTML = emps.map(e => `
            <tr>
                <td>${e.full_name}</td>
                <td>${e.email}</td>
                <td><span class="badge" style="background: ${e.role === 'ADMIN' ? 'var(--danger)' : 'var(--success)'}">${e.role}</span></td>
                <td>${e.joining_date}</td>
            </tr>
        `).join('');
    } catch (e) { console.error(e); }
}

async function fetchPayrollHistory() {
    try {
        const runs = await apiRequest('/payroll/runs');
        const tbody = document.getElementById('payrollTableBody');
        tbody.innerHTML = runs.map(r => `
            <tr>
                <td>${new Date(r.createdAt).toLocaleDateString()}</td>
                <td>${r.month}/${r.year}</td>
                <td>$${r.total_payout}</td>
                <td>${r.status}</td>
            </tr>
        `).join('');
    } catch (e) { }
}

async function runPayroll() {
    const month = document.getElementById('runMonth').value;
    const year = document.getElementById('runYear').value;
    const btn = document.querySelector('button[onclick="runPayroll()"]');

    try {
        btn.textContent = 'Processing...';
        const res = await apiRequest('/payroll/run', 'POST', { month, year });

        // Show AI Insights
        const aiDiv = document.getElementById('aiStart');
        const aiContent = document.getElementById('aiContent');
        aiDiv.classList.remove('hidden');

        let anomaliesHtml = res.ai_insights.anomalies.hasAnomalies
            ? `<span style="color: var(--danger)">⚠ Detected ${res.ai_insights.anomalies.details.length} salary anomalies.</span>`
            : `<span style="color: var(--success)">✓ No anomalies detected.</span>`;

        aiContent.innerHTML = `
            ${anomaliesHtml}<br>
            <strong>Forecast:</strong> Next month's payroll is predicted to be <strong>$${res.ai_insights.forecast.nextMonthPrediction}</strong>
            (Confidence: ${res.ai_insights.forecast.confidence}).
        `;

        fetchPayrollHistory(); // refresh list
    } catch (e) {
        alert(e.message);
    } finally {
        btn.textContent = 'Run AI Payroll';
    }
}

// Modal Logic
function openAddEmpModal() { document.getElementById('addEmployeeModal').style.display = 'block'; }
function closeModal() { document.getElementById('addEmployeeModal').style.display = 'none'; }

document.getElementById('addEmpForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('empName').value;
    const email = document.getElementById('empEmail').value;
    const base_salary = document.getElementById('empSalary').value;

    try {
        await apiRequest('/employees', 'POST', { full_name, email, base_salary, joining_date: new Date().toISOString().split('T')[0] });
        closeModal();
        fetchEmployees();
    } catch (e) {
        alert(e.message);
    }
});
