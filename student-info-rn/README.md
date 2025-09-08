แอปตัวอย่าง "ข้อมูลนักศึกษา" 2 หน้า ที่แสดงข้อมูลนักศึกษา และรายวิชาที่ลงทะเบียนในแต่ละภาคการศึกษา
จุดเด่น: ธีม MD3 ที่สม่ำเสมอ, โครงสร้างข้อมูลชัดเจน และการแสดงรายวิชาแบบแยกตามภาคการศึกษาด้วย Accordion

สิ่งที่แอปรองรับ
หน้า Home: รูปโปรไฟล์ + ชื่อ–นามสกุล + รหัส + หลักสูตร + สำนักวิชา + มหาวิทยาลัย และปุ่มไปหน้า Registration
(โหลดรูปจาก URL จริงด้วย Avatar.Image) 

หน้า Registration: แยกรายวิชา “ตามภาคการศึกษา” ด้วย List.Accordion และภายในใช้ List.Item แสดงรูปแบบ รหัส – ชื่อวิชา ทีละบรรทัด 

ธีม Material Design 3 (React Native Paper) และโทนสีสม่ำเสมอทั้งแอป 

นำทางด้วย @react-navigation/native + @react-navigation/native-stack 

วิธีติดตั้งและรัน
# 1) สร้าง/โคลนโปรเจกต์ แล้วติดตั้งแพ็กเกจ
npm install

# 2) รันแอป
npx expo start
# เลือกเปิดบน Android emulator หรืออุปกรณ์จริง


ตามใบงาน ต้องมีคำอธิบายวิธีติดตั้งและรันชัดเจน พร้อมคำสั่ง npm install และ npx expo start ใน README ด้วยเสมอ. 

เวอร์ชันที่ใช้ (ตัวอย่าง – ปรับเป็นเวอร์ชันจริงของโปรเจกต์คุณ)

Expo SDK: (เช่น 51.x)

React Native: (เช่น 0.74.x)

React Native Paper: (เช่น 5.x)

React Navigation / native-stack: (เช่น 6.x)

ใบงานระบุให้บอก “เวอร์ชันของ Expo / React Native / React Native Paper / React Navigation ที่ใช้” ใน README. 

โครงสร้างข้อมูล & mock data

แบบแผนข้อมูลที่ใช้ในการบ้านนี้ (อ้างอิงใบงาน):

Course — { code: string, name: string }

SemesterRegistration — { term: string, courses: Course[] }

Student — { firstName, lastName, studentId, major, school, imageUrl, registrations } 

ตัวอย่าง mock data ของโปรเจกต์อยู่ที่ src/data/mock.js (มีข้อมูลนักศึกษาพร้อมภาคการศึกษาอย่างน้อย 2 เทอม) 

ภายในมีโครงสร้างนักศึกษาและรายการรายวิชาตามภาคเรียน เช่น

export const student = {
  studentId: "66106030",
  firstName: "…",
  lastName: "…",
  imageUrl: "https://…",
  registrations: [
    { term: "1/2567", courses: [ { code: "GEN64-124", name: "English Conversation Skills" }, … ] },
    { term: "2/2567", courses: [ … ] },
    { term: "3/2567", courses: [ … ] }
  ]
};


(ดูไฟล์จริงเพื่อรายละเอียดรายวิชาทั้งหมด) 

โครงสร้างไฟล์หลัก (สรุปสั้น)
.
├── App.js                // หน้าจอ Home และ Registration + ธีม MD3
└── src/
    └── data/
        └── mock.js       // ข้อมูลนักศึกษา + ภาคการศึกษา + รายวิชา (mock)

การใช้งาน
หน้า Home: ดูข้อมูลนักศึกษาและกดปุ่ม “ดูรายวิชาที่ลงทะเบียน” เพื่อไปหน้า Registration (เป็นการ navigate ไปอีกหน้าด้วย native-stack). 

หน้า Registration: แตะหัวข้อ “ภาคการศึกษาที่ …” เพื่อกาง/พับรายวิชาในภาคนั้น ๆ รายวิชาจะแสดงเป็น รหัส – ชื่อวิชา (ไอคอนสมุด, ตัวอักษรอ่านง่ายบนพื้นหลังที่ตั้งค่าไว้)

ไลบรารีหลักที่ใช้:
@react-navigation/native, @react-navigation/native-stack
react-native-paper
react-native-safe-area-context, react-native-screens

วิธีเริ่มโปรเจกต์ใหม่:
npx create-expo-app student-info-rn --template blank
cd student-info-rn
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-paper
npm install react-native-safe-area-context react-native-screens