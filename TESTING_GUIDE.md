# 🚀 BACKEND NI TEKSHIRISH - BOSQICHMA-BOSQICH

## QADAM 1: BACKEND NI ISHGA TUSHIRISH

```bash
# Backend papkasiga kiring
cd talaba-backend

# Paketlarni o'rnating (birinchi marta)
npm install

# Serverni ishga tushiring
npm run dev
```

### ✅ MUVAFFAQIYATLI BO'LSA:
```
✅ MongoDB ga ulandi
🚀 Server 5000 portda ishlamoqda
📍 URL: http://localhost:5000
```

### ❌ XATOLIK BO'LSA:
```
❌ MongoDB ga ulanishda xatolik
```
**Yechim:** MongoDB Atlas sozlang (pastda ko'rsatilgan)

---

## QADAM 2: BACKEND ISHLAYOTGANINI TEKSHIRISH

### A. Browser orqali:

**1. Browser oching (Chrome, Firefox, Safari)**

**2. Manzilga kiring:**
```
http://localhost:5000
```

**3. Ko'rasiz:**
```json
{
  "message": "🎓 Talaba Tarbiya API ishlamoqda!",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth/*",
    "tasks": "/api/tasks",
    "events": "/api/events",
    "content": "/api/content",
    "stats": "/api/stats"
  }
}
```

✅ **Bu ko'rinsangiz = Backend ishlayapti!**

---

### B. Postman orqali (Professional usul):

**1. Postman yuklab oling:**
https://www.postman.com/downloads/

**2. Test qilish:**

#### TEST 1: Server ishlayaptimi?
```
GET http://localhost:5000
```
**Natija:** ✅ 200 OK - JSON qaytadi

#### TEST 2: Register (Ro'yxatdan o'tish)
```
POST http://localhost:5000/api/auth/register

Headers:
  Content-Type: application/json

Body (JSON):
{
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@test.uz",
  "password": "123456"
}
```

**Natija:**
```json
{
  "success": true,
  "message": "Muvaffaqiyatli ro'yxatdan o'tdingiz",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstName": "Alisher",
    "lastName": "Navoiy",
    "email": "alisher@test.uz",
    "isAdmin": false
  }
}
```

✅ **Token olsangiz = Register ishlayapti!**

#### TEST 3: Login (Kirish)
```
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "alisher@test.uz",
  "password": "123456"
}
```

✅ **Token olsangiz = Login ishlayapti!**

#### TEST 4: Topshiriqlarni olish
```
GET http://localhost:5000/api/tasks

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

✅ **Bo'sh array [] yoki topshiriqlar qaytsa = Ishlayapti!**

---

### C. cURL orqali (Terminal/CMD):

```bash
# Server tekshirish
curl http://localhost:5000

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@mail.uz","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@mail.uz","password":"123456"}'
```

---

## QADAM 3: MONGODB ATLAS SOZLASH

### 1. MongoDB Atlas ga kirish
```
https://www.mongodb.com/cloud/atlas
```

### 2. Ro'yxatdan o'tish
- "Try Free" tugmasini bosing
- Email yoki Google bilan ro'yxatdan o'ting

### 3. Cluster yaratish

**A. "Create a Deployment" ni bosing**

**B. Plan tanlang:**
- ✅ **M0** (FREE Forever)
- Cloud: AWS
- Region: **Frankfurt (eu-central-1)** yoki **Ireland (eu-west-1)**

**C. Cluster Name:** `Cluster0` (default)

**D. "Create" ni bosing**

⏰ **Kutish:** 3-5 daqiqa (Cluster yaratilmoqda)

### 4. Database User yaratish

**A. Security → Database Access**

**B. "Add New Database User"**

**C. Ma'lumotlar:**
- Username: `talaba_admin`
- Password: `TalabaPass123` (yoki o'zingiz o'ylang)
- Database User Privileges: **Read and write to any database**

**D. "Add User"**

### 5. Network Access sozlash

**A. Security → Network Access**

**B. "Add IP Address"**

**C. "Allow Access from Anywhere"**
- IP: `0.0.0.0/0`

**D. "Confirm"**

### 6. Connection String olish

**A. Database → Connect**

**B. "Connect your application"**

**C. Driver: Node.js, Version: 5.5 or later**

**D. Connection string ko'chirib oling:**
```
mongodb+srv://talaba_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**E. <password> o'rniga parolingizni yozing:**
```
mongodb+srv://talaba_admin:TalabaPass123@cluster0.xxxxx.mongodb.net/talaba-tarbiya?retryWrites=true&w=majority
```

### 7. .env fayliga qo'yish

**talaba-backend/.env:**
```env
MONGO_URI=mongodb+srv://talaba_admin:TalabaPass123@cluster0.xxxxx.mongodb.net/talaba-tarbiya?retryWrites=true&w=majority
JWT_SECRET=talaba_tarbiya_maxfiy_kalit_2024
PORT=5000
```

### 8. Serverni qayta ishga tushiring

```bash
# Terminal da (Ctrl+C keyin)
npm run dev
```

**Ko'rasiz:**
```
✅ MongoDB ga ulandi
🚀 Server 5000 portda ishlamoqda
```

---

## QADAM 4: MA'LUMOTLAR QO'SHISH

### Postman orqali ma'lumot qo'shish:

#### 1. Admin Yaratish
```
POST http://localhost:5000/api/auth/register

Body:
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@talaba.uz",
  "password": "admin123"
}
```

**Natija:** Token oling va saqlang!

#### 2. Topshiriq qo'shish (Admin token bilan)
```
POST http://localhost:5000/api/tasks

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json

Body:
{
  "title": "Bomdod namozini o'qish",
  "description": "Har kuni bomdod namozini jamoat bilan o'qing",
  "category": "spirituality",
  "deadline": "2024-12-31T00:00:00.000Z"
}
```

#### 3. Tadbir qo'shish
```
POST http://localhost:5000/api/events

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json

Body:
{
  "title": "Ma'naviy suhbat",
  "description": "Yoshlar bilan ma'naviy suhbat",
  "location": "Universitet majlislar zali",
  "startDate": "2024-12-15T10:00:00.000Z",
  "endDate": "2024-12-15T12:00:00.000Z",
  "organizer": "Ma'naviyat va ma'rifat bo'limi",
  "category": "spiritual"
}
```

#### 4. Kontent qo'shish
```
POST http://localhost:5000/api/content

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json

Body:
{
  "title": "Sabrning fazilati",
  "body": "Sabr - yarmisi iymon...",
  "type": "hadith",
  "author": "Abu Davud"
}
```

---

## QADAM 5: MONGODB ATLAS DA MA'LUMOTLARNI KO'RISH

### 1. Atlas Dashboard ga kiring

### 2. Database → Browse Collections

### 3. Ko'rasiz:
```
talaba-tarbiya
  ├── users          (foydalanuvchilar)
  ├── tasks          (topshiriqlar)
  ├── events         (tadbirlar)
  └── contents       (kontentlar)
```

### 4. Har bir collection ga bosib ma'lumotlarni ko'ring

---

## ✅ TEKSHIRISH JADVALI

### Backend:
- [ ] Node.js o'rnatildi (`node --version`)
- [ ] npm install bajarildi
- [ ] npm run dev ishlayapti
- [ ] http://localhost:5000 ochiladi
- [ ] JSON javob qaytadi

### MongoDB:
- [ ] Atlas ga ro'yxatdan o'tdim
- [ ] Cluster yaratdim (M0 FREE)
- [ ] Database user yaratdim
- [ ] IP Address whitelist (0.0.0.0/0)
- [ ] Connection string oldim
- [ ] .env fayliga qo'ydim
- [ ] "✅ MongoDB ga ulandi" ko'rindi

### API Test:
- [ ] Register ishlayapti
- [ ] Login ishlayapti
- [ ] Token olayman
- [ ] Tasks API ishlayapti
- [ ] Ma'lumot qo'shish mumkin

---

## 🐛 MUAMMOLAR VA YECHIMLAR

### "Cannot find module"
```bash
npm install
```

### "MongoDB connection failed"
```bash
# .env faylni tekshiring
# Connection string to'g'rimi?
# Password to'g'rimi?
# IP whitelist qo'shilganmi?
```

### "Port 5000 already in use"
```bash
# PORT ni o'zgartiring (.env da):
PORT=3000

# Yoki eski process ni to'xtating:
# Linux/Mac:
kill -9 $(lsof -t -i:5000)

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### "Token is not valid"
```bash
# Yangi token oling (login qiling)
# Authorization header to'g'ri yozilganini tekshiring:
# Authorization: Bearer YOUR_TOKEN
```

---

## 📹 VIDEO YORDAM

YouTube da qidiring:
- "Node.js REST API tutorial"
- "MongoDB Atlas setup"
- "Postman API testing"
- "Express.js backend tutorial"

---

## 🎉 HAMMASI TAYYOR!

✅ Backend ishlayapti
✅ MongoDB ulandi
✅ API'lar javob qaytaradi
✅ Ma'lumot qo'shish mumkin
✅ Keyingi qadam: Flutter ga ulash!
