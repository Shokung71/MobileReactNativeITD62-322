// ตัวช่วยเลือกรูป: ถ้ามี base64 ใช้ base64 ก่อน, ถ้าไม่มีก็ใช้ asset ที่แมพไว้
import { userImageMap, productImageMap } from './assetsMap';

export function getUserImageSource(user) {
    if (user?.img_profile_base64) {
        return { uri: `data:image/jpeg;base64,${user.img_profile_base64}` };
    }
    const src = userImageMap[user?.img_profile];
    return src ? src : null;
}

export function getProductImageSource(product) {
    if (product?.image_base64) {
        return { uri: `data:image/jpeg;base64,${product.image_base64}` };
    }
    const src = productImageMap[product?.image];
    return src ? src : null;
}
