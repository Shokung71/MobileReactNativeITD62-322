// แมพชื่อไฟล์ -> require(local asset)
// เพื่อให้สามารถ fallback รูปจาก assets ได้ เมื่อไม่มี base64 ที่ฝั่งเซิร์ฟเวอร์
export const userImageMap = {
    'admin.png': require('../../assets/users/admin.png'),
    'alice.png': require('../../assets/users/capoo.png'),
    // 'bob.png': require('../../assets/users/bob.png')
};

export const productImageMap = {
    'phone_a.png': require('../../assets/products/phone_a.png'),
    'phone_b.png': require('../../assets/products/phone_b.png'),
    'phone_c.png': require('../../assets/products/phone_c.png')
};
