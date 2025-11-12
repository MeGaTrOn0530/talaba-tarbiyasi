# 💾 MONGODB GA MA'LUMOT QO'SHISH - TO'LIQ QO'LLANMA

## 📊 QANDAY MA'LUMOTLAR QO'SHAMIZ?

Backend ishlagach, bu ma'lumotlarni qo'shishimiz kerak:

1. **Users** (Foydalanuvchilar)
2. **Tasks** (Topshiriqlar)
3. **Events** (Tadbirlar)
4. **Content** (Maqolalar, hadislar)

---

azizbekavalov132_db_user
8kxWX2zQlSjpy3G8

mongodb+srv://azizbekavalov132_db_user:8kxWX2zQlSjpy3G8@users.tst9ido.mongodb.net/?appName=Users

## 1️⃣ FOYDALANUVCHILAR (USERS)

### A. ADMIN YARATISH

**Postman orqali:**
```
POST http://localhost:5000/api/auth/register

Headers:
  Content-Type: application/json

Body:
{
  "firstName": "Admin",
  "lastName": "Tarbiya",
  "email": "admin@talaba.uz",
  "password": "admin123",
  "faculty": "Ma'muriyat",
  "group": "ADMIN",
  "course": 0
}
```

**Natija:**
```json
{
  "success": true,
  "message": "Muvaffaqiyatli ro'yxatdan o'tdingiz",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6582c1234567890abcdef012",
    "firstName": "Admin",
    "email": "admin@talaba.uz",
    "isAdmin": true
  }
}
```

⚠️ **TOKEN NI SAQLANG!** Bu token bilan boshqa ma'lumotlar qo'shamiz.

---

### B. ODDIY TALABA YARATISH

```json
POST /api/auth/register

{
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@student.uz",
  "password": "123456",
  "faculty": "Filologiya fakulteti",
  "group": "FIL-21",
  "course": 3,
  "phone": "+998901234567"
}
```

### C. KO'PROQ TALABALAR:

```json
// Talaba 1
{
  "firstName": "Bobur",
  "lastName": "Mirzayev",
  "email": "bobur@student.uz",
  "password": "123456",
  "faculty": "Tarix fakulteti",
  "group": "TRX-22",
  "course": 2
}

// Talaba 2
{
  "firstName": "Zulfiya",
  "lastName": "Karimova",
  "email": "zulfiya@student.uz",
  "password": "123456",
  "faculty": "Pedagogika fakulteti",
  "group": "PED-20",
  "course": 4
}

// Talaba 3
{
  "firstName": "Jamshid",
  "lastName": "Rahimov",
  "email": "jamshid@student.uz",
  "password": "123456",
  "faculty": "IT fakulteti",
  "group": "IT-23",
  "course": 1
}
```

---

## 2️⃣ TOPSHIRIQLAR (TASKS)

### A. MA'NAVIY TOPSHIRIQLAR

```
POST http://localhost:5000/api/tasks

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json
```

#### Topshiriq 1: Namoz
```json
{
  "title": "Besh vaqt namozni o'qish",
  "description": "Har kuni besh vaqt namozni o'z vaqtida o'qing va jamoat namoziga qatnashing. Namoz musulmonning mi'roji va Allohga yaqinlashish usulidir.",
  "category": "spirituality",
  "deadline": "2024-12-31T23:59:59.000Z"
}
```

#### Topshiriq 2: Qur'on
```json
{
  "title": "Kundalik Qur'on o'qish",
  "description": "Har kuni kamida 1 sahifa Qur'oni karim o'qing. Qur'on o'qishni unutmang va ma'nolarini o'rganishga harakat qiling.",
  "category": "spirituality",
  "deadline": "2024-12-20T00:00:00.000Z"
}
```

#### Topshiriq 3: Sadaqa
```json
{
  "title": "Xayriya ishlariga yordam berish",
  "description": "Bu oy ichida kamida bir marta muhtoj oilaga yoki yetimxonaga yordam bering. Sadaqa mol-mulkni tozalaydi va barakani oshiradi.",
  "category": "community",
  "deadline": "2024-12-25T00:00:00.000Z"
}
```

### B. AXLOQIY TOPSHIRIQLAR

#### Topshiriq 4: Ota-onaga xizmat
```json
{
  "title": "Ota-onaga xizmat qilish",
  "description": "Ota-onangizga ko'proq vaqt ajrating, ularning qo'lidan o'pib, haqlari uchun duo qiling. Ularning roziligini har kungi maqsad qiling.",
  "category": "family",
  "deadline": "2024-12-30T00:00:00.000Z"
}
```

#### Topshiriq 5: Halollik
```json
{
  "title": "To'g'ri gapirish va halol bo'lish",
  "description": "Bir hafta davomida hech kimga yolg'on gapirmang, amanat va vadasiga vafodor bo'ling. Halollik - iymon belgisidir.",
  "category": "ethics",
  "deadline": "2024-12-15T00:00:00.000Z"
}
```

### C. IJTIMOIY TOPSHIRIQLAR

#### Topshiriq 6: Ko'ngillilik
```json
{
  "title": "Ijtimoiy loyihada ishtirok etish",
  "description": "Mahalla yoki universitet ko'ngillilik loyihalarida ishtirok eting. Boshqalarga yordam berish - eng yaxshi amal.",
  "category": "community",
  "deadline": "2024-12-28T00:00:00.000Z"
}
```

### D. RAQAMLI ODOB TOPSHIRIQLARI

#### Topshiriq 7: Ijtimoiy tarmoqlar
```json
{
  "title": "Foydali kontent ulashish",
  "description": "Ijtimoiy tarmoqlarda faqat foydali, ilmli va axloqiy kontentlar ulashing. Befoyda va zararsiz postlardan qoching.",
  "category": "digital",
  "deadline": "2024-12-22T00:00:00.000Z"
}
```

---

## 3️⃣ TADBIRLAR (EVENTS)

```
POST http://localhost:5000/api/events

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json
```

### Tadbir 1: Ma'naviy suhbat
```json
{
  "title": "Yoshlar bilan ma'naviy suhbat",
  "description": "Taniqli olim va ma'rifatchilar bilan suhbat. Mavzu: 'Zamonaviy yoshlarning ma'naviy muammolari va ularning yechimi'",
  "location": "Universitet majlislar zali, 2-qavat",
  "startDate": "2024-12-15T10:00:00.000Z",
  "endDate": "2024-12-15T12:00:00.000Z",
  "organizer": "Ma'naviyat va ma'rifat bo'limi",
  "category": "spiritual",
  "imageUrl": ""
}
```

### Tadbir 2: Xayriya aksiyasi
```json
{
  "title": "Yetimlar uchun xayriya aksiyasi",
  "description": "Yetim bolalar uchun kiyim-kechak va maktab buyumlari yig'ish aksiyasi. Barcha talabalar ishtirok etishlari mumkin.",
  "location": "Universitet asosiy binosi, kirish",
  "startDate": "2024-12-18T09:00:00.000Z",
  "endDate": "2024-12-18T18:00:00.000Z",
  "organizer": "Talabalar turar joyi va ijtimoiy himoya bo'limi",
  "category": "volunteer",
  "imageUrl": ""
}
```

### Tadbir 3: Ilmiy konferensiya
```json
{
  "title": "Islom sivilizatsiyasi tarixi konferensiyasi",
  "description": "Islom sivilizatsiyasining jahon taraqqiyotiga qo'shgan hissasi mavzusida ilmiy-amaliy konferensiya",
  "location": "Virtual (Zoom)",
  "startDate": "2024-12-20T14:00:00.000Z",
  "endDate": "2024-12-20T17:00:00.000Z",
  "organizer": "Tarix va madaniyatshunoslik kafedrasi",
  "category": "educational",
  "imageUrl": ""
}
```

### Tadbir 4: Sport musobaqasi
```json
{
  "title": "Fakultetlararo futbol musobaqasi",
  "description": "Barcha fakultetlar o'rtasida futbol bo'yicha do'stlik musobaqasi. G'oliblar sovg'alar bilan taqdirlanadi.",
  "location": "Universitet sport majmuasi",
  "startDate": "2024-12-22T15:00:00.000Z",
  "endDate": "2024-12-22T19:00:00.000Z",
  "organizer": "Jismoniy tarbiya kafedrasi",
  "category": "sports",
  "imageUrl": ""
}
```

### Tadbir 5: Madaniy kecha
```json
{
  "title": "Milliy an'analar kechasi",
  "description": "O'zbek milliy an'analari, qo'shiq va raqs bilan tanishish kechasi. Milliy taomlar tatib ko'riladi.",
  "location": "Universitet katta zali",
  "startDate": "2024-12-25T18:00:00.000Z",
  "endDate": "2024-12-25T21:00:00.000Z",
  "organizer": "Madaniy-ma'rifiy ishlar bo'limi",
  "category": "cultural",
  "imageUrl": ""
}
```

---

## 4️⃣ KONTENT (ARTICLES, HADITH, QUOTES)

```
POST http://localhost:5000/api/content

Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json
```

### A. HADISLAR

#### Hadis 1:
```json
{
  "title": "Sabrning fazilati",
  "body": "Payg'ambarimiz sollallohu alayhi vasallam dedilar: 'Sabr - yarmisi iymon'. Bu hadis bizga qiyinchiliklarda sabr qilishning muhimligini ko'rsatadi. Sabr - eng buyuk fazilatlardan biridir.",
  "type": "hadith",
  "author": "Abu Davud",
  "imageUrl": ""
}
```

#### Hadis 2:
```json
{
  "title": "Ilmning ahamiyati",
  "body": "Rasululloh sollallohu alayhi vasallam dedilar: 'Ilm olish har bir musulmon erkak va ayolga farzdir'. Ilm olish faqat maktabda tugamaydi, balki butun umr davom etadi.",
  "type": "hadith",
  "author": "Ibn Mojah",
  "imageUrl": ""
}
```

### B. MAQOLALAR

#### Maqola 1:
```json
{
  "title": "Namozning ma'naviy ta'siri",
  "body": "Namoz musulmonning Alloh bilan aloqasidir. Namoz odamni gunohlardan saqlaydi, qalbni tinchlantirib, ruhiy tinchlik beradi. Ilmiy tadqiqotlar ham namozning sog'liqqa ijobiy ta'sirini tasdiqlagan.\n\nBesh vaqt namoz kunning turli vaqtlarida o'qiladi va bu insonning hayotini tartibga soladi. Namoz jamoat bilan o'qish esa musulmonlar o'rtasidagi birodarlikni mustahkamlaydi.",
  "type": "article",
  "author": "Shayx Muhammad Ali",
  "imageUrl": ""
}
```

#### Maqola 2:
```json
{
  "title": "Yoshlarning ma'naviy kamoloti",
  "body": "Bugungi kunda yoshlar ko'plab imkoniyatlarga ega. Lekin bu imkoniyatlar faqat materialistik maqsadlarga yo'naltirilsa, ruhiy bo'shliq paydo bo'ladi.\n\nMa'naviyat - bu faqat diniy bilim emas, balki axloq, odob, insoniy qadriyatlar va jamiyatga foyda keltirish istagi. Yoshlar o'z vaqtini to'g'ri taqsimlab, ilm olish, sport bilan shug'ullanish va xayriya ishlariga vaqt ajratishlari kerak.",
  "type": "article",
  "author": "Prof. Karimov A.B.",
  "imageUrl": ""
}
```

### C. HIKMATLI SO'ZLAR

#### Quote 1:
```json
{
  "title": "Alisher Navoiy hikmati",
  "body": "Ilm - zulmatdan nurg'a, johillikdan hidoyatga olib chiqadigan yo'l. Ilmsiz inson go'yo ko'zi ojiz kishiga o'xshaydi.",
  "type": "quote",
  "author": "Alisher Navoiy",
  "imageUrl": ""
}
```

#### Quote 2:
```json
{
  "title": "Islom Karimov",
  "body": "Ma'naviyat - bu millat taqdir-taqdiri, uning kelgusi, buyuk kelajagi, xalqimizning asrlar davomida shakllangan madaniyati, tarixi, qadr-qadriyatlaridir.",
  "type": "quote",
  "author": "Islom Karimov",
  "imageUrl": ""
}
```

---

## 5️⃣ QANDAY QO'SHAMIZ? (3 USUL)

### A. POSTMAN orqali (ENG OSON)

1. Postman oching
2. Collection yarating: "Talaba Tarbiya"
3. Har bir API uchun request yarating
4. Admin token bilan yuborish

### B. MongoDB Compass orqali

1. MongoDB Compass yuklab oling
2. Connection string bilan ulanish
3. Database: `talaba-tarbiya`
4. Collection yaratish va to'g'ridan-to'g'ri document qo'shish

### C. Terminal orqali (cURL)

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@talaba.uz","password":"admin123"}'

# Token oling, keyin:

# Topshiriq qo'shish
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test topshiriq","description":"Tavsif","category":"spirituality","deadline":"2024-12-31"}'
```

---

## 6️⃣ MONGODB ATLAS DA KO'RISH

### 1. Atlas ga kiring
https://cloud.mongodb.com

### 2. Cluster → Browse Collections

### 3. Database: `talaba-tarbiya`

### 4. Collections:
- **users** - barcha foydalanuvchilar
- **tasks** - barcha topshiriqlar
- **events** - barcha tadbirlar
- **contents** - barcha kontentlar

### 5. Document'larni ko'rish va tahrirlash mumkin

---

## ✅ TAYYOR MA'LUMOTLAR TO'PLAMI

Agar vaqtingiz bo'lmasa, **seed script** yaratamiz:

**seed.js** fayl:
```javascript
// Bir marta ishga tushirib, barcha ma'lumotlarni qo'shadi
```

---

## 📊 MINIMAL MA'LUMOTLAR (Boshlash uchun)

1. **1 ta Admin** ✅
2. **5 ta Topshiriq** ✅
3. **3 ta Tadbir** ✅
4. **5 ta Kontent** ✅
5. **3-5 ta Talaba** (test uchun) ✅

Bu yetarli Flutter da test qilish uchun!

---

## 🎉 XULOSA

✅ Backend ishlayapti
✅ MongoDB ulandi
✅ API'lar javob qaytaradi
✅ Ma'lumotlar qo'shish mumkin
✅ Keyingi qadam: Flutter dan test qiling!
