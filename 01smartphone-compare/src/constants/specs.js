// นิยามฟิลด์สเปค (ใช้วาดตารางเทียบ)
// และรายการ segment ที่ใช้ในฟิลเตอร์
export const SPEC_FIELDS = [
    { key: 'cpu', label: 'CPU' },
    { key: 'gpu', label: 'GPU' },
    { key: 'display_size', label: 'ขนาดหน้าจอ' },
    { key: 'display_type', label: 'ประเภทจอ' },
    { key: 'ram', label: 'RAM' },
    { key: 'rom', label: 'ROM (วางขายจริง)' },
    { key: 'battery', label: 'แบตเตอรี่' }
];

export const SEGMENTS = [
    { key: 'budget', label: 'ประหยัด' },
    { key: 'midrange', label: 'ระดับกลาง' },
    { key: 'flagship', label: 'เรือธง' }
];
