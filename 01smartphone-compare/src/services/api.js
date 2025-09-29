// Service เรียก API ไปยัง JSON Server
// *** สำคัญ: แก้ BASE_URL ให้เป็น IP เครื่องคุณในวงแลนเมื่อรันบนมือถือจริง (ห้ามใช้ localhost) ***
const BASE_URL = 'http://192.168.1.10:3001'; // ตัวอย่าง: http://192.168.x.x:3001

export const api = {
    async get(path) {
        const res = await fetch(`${BASE_URL}${path}`);
        return res.json();
    },
    async post(path, body) {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res.json();
    },
    async patch(path, body) {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res.json();
    },
    async del(path) {
        const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' });
        return res.ok;
    }
};
