export let BASE_URL = 'https://backend-prototype-x8en.onrender.com'; // set to your FastAPI URL

export const setBaseUrl = (url) => { BASE_URL = url; };

async function req(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Request failed');
  }
  return res.json();
}

export async function login(email, password) {
  return req(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export async function getParentChild(token, student_id) {
  return req(`/parent/child/current?student_id=${encodeURIComponent(student_id)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getParentAlerts(token, student_id) {
  return req(`/parent/alerts?student_id=${encodeURIComponent(student_id)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getStaffStudents(token) {
  return req(`/staff/students`, { headers: { Authorization: `Bearer ${token}` } });
}

export async function getStaffZones(token) {
  return req(`/staff/zones`, { headers: { Authorization: `Bearer ${token}` } });
}
