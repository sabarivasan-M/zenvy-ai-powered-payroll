function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));

    if (tab === 'login') {
        document.querySelector('button[onclick="switchTab(\'login\')"]').classList.add('active');
        document.getElementById('loginForm').classList.remove('hidden');
    } else {
        document.querySelector('button[onclick="switchTab(\'register\')"]').classList.add('active');
        document.getElementById('registerForm').classList.remove('hidden');
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('message');

    try {
        const res = await apiRequest('/auth/login', 'POST', { email, password });
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        window.location.href = 'dashboard.html';
    } catch (err) {
        msg.textContent = err.message;
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const companyName = document.getElementById('regCompany').value;
    const adminName = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const msg = document.getElementById('message');

    try {
        await apiRequest('/auth/register', 'POST', { companyName, adminName, email, password });
        msg.style.color = 'var(--success)';
        msg.textContent = 'Registration Successful! Please login.';
        setTimeout(() => switchTab('login'), 1500);
    } catch (err) {
        msg.style.color = 'var(--danger)';
        msg.textContent = err.message;
    }
});
