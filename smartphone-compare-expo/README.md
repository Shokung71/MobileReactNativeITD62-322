# Smartphone Compare (Expo + JSON Server)

โปรเจกต์ตัวอย่างสำหรับแอป React Native (Expo, JavaScript) เพื่อ **เปรียบเทียบสมาร์ทโฟน 2 รุ่น** พร้อมระบบ **role** (User/Admin) และหน้า **CRUD** สำหรับ Admin โดยใช้ **JSON Server** เป็นฐานข้อมูลจำลอง

## โครงสร้างหน้าจอ (รวม 7 หน้า)
1) **Splash** – หน้าต้อนรับ (โลโก้/ชื่อแอป)  
2) **Home** – รายการมือถือทั้งหมด  
3) **Compare** – เลือก 2 รุ่น (ภายใน segment เดียวกัน) แล้วเปรียบเทียบสเปค (CPU, GPU, RAM, ROM ที่ขายจริง)  
4) **Login** – เข้าสู่ระบบ (มีปุ่ม **ลืมรหัสผ่าน**)  
5) **Register** – ลงทะเบียนผู้ใช้ใหม่ (role จะเป็น `user` เสมอ)  
6) **Admin – Products** – จัดการสินค้า (CRUD)  
7) **Admin – Users** – จัดการผู้ใช้ (แก้ไขข้อมูล/กำหนด role)  

> แถบ **Bottom Tabs**: `Home | Compare | User` แสดงทุกหน้าทั้งหมด **ยกเว้น** Splash

## การติดตั้งและรัน
1. ติดตั้งเครื่องมือพื้นฐาน
   - Node.js LTS
   - Expo CLI (อัตโนมัติผ่าน `npx`)
   - **JSON Server**: `npm i -g json-server`

2. ติดตั้ง dependencies
   ```bash
   npm install
   # หรือ
   pnpm install
   ```

3. ตั้งค่า **BASE_URL** ของ JSON Server  
   แก้ไฟล์ `src/services/config.js` ให้ชี้ไปยัง IP เครื่องที่รัน JSON Server (ตัวอย่าง: `http://192.168.1.10:3001`)
   - ถ้ารันบน **Android Emulator** ใช้ `http://10.0.2.2:3001`
   - ถ้ารันบน **iOS Simulator** ใช้ `http://127.0.0.1:3001`

4. รัน JSON Server
   ```bash
   npm run server
   # เปิดที่ http://localhost:3001
   ```

5. รันแอป Expo
   ```bash
   npm start
   ```

## บัญชีตัวอย่าง
- **Admin**: `admin / admin123`
- **User**: `user / user123`

## โครงสร้างโปรเจกต์ (ย่อ)
```
/src
  /components
  /context
  /navigation
  /screens
  /services
  /utils
App.js
db.json
```

## หมายเหตุด้านความปลอดภัย
- โปรเจกต์นี้เพื่อการเรียนรู้เท่านั้น รหัสผ่านเก็บเป็น plain text ใน JSON Server
- หากต้องใช้จริง ควรเพิ่มระบบ auth ที่ปลอดภัย (hash, JWT, backend จริง)

> ปรับแต่งต่อได้ง่าย: โค้ดแยกไฟล์ชัดเจน มี service/ctx ช่วยให้เปลี่ยนฐานข้อมูลหรือโครงหน้าจอได้ไม่ยาก
