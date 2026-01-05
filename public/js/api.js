const API_URL = 'http://localhost:3000/api';

async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
        method,
        headers,
    };

    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'API Request Failed');
    }

    return data;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
