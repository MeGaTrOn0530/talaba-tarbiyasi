// server.js - BARCHA API'LAR BIR FAYLDA
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// ============================================
// 1. MIDDLEWARE (SOZLAMALAR)
// ============================================
app.use(cors()); // Flutter dan so'rovlarga ruxsat
app.use(express.json()); // JSON ma'lumotlarni o'qish

// ============================================
// 2. MA'LUMOTLAR BAZASI MODELLARI
// ============================================
// ============================================
// 2. MA'LUMOTLAR BAZASI MODELLARI
// ============================================

// USER SCHEMA
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faculty: String,
  group: String,
  course: Number,
  phone: String,
  imageUrl: String,
  isAdmin: { type: Boolean, default: false },
  completedTasks: { type: Number, default: 0 },
  totalTasks: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// TASK SCHEMA
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['spirituality', 'ethics', 'community', 'digital', 'family', 'other'],
    required: true
  },
  deadline: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  completionNote: String,
  completedAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// EVENT SCHEMA
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: { type: String, required: true },
  category: {
    type: String,
    enum: ['spiritual', 'educational', 'cultural', 'sports', 'volunteer', 'other'],
    required: true
  },
  attendeesCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// CONTENT SCHEMA
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: String,
  type: {
    type: String,
    enum: ['article', 'hadith', 'quote', 'video', 'podcast'],
    required: true
  },
  author: { type: String, required: true },
  viewsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  publishedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);

// ============================================
// 3. AUTH MIDDLEWARE (Token tekshirish)
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token topilmadi' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'talaba_tarbiya_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token yaroqsiz' });
    }
    req.user = user;
    next();
  });
};

// Admin tekshirish
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Admin huquqi kerak' });
  }
  next();
};

// ============================================
// 4. AUTH API'LAR
// ============================================

// RO'YXATDAN O'TISH
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, faculty, group, course, phone } = req.body;

    // Email tekshirish
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bu email allaqachon ro\'yxatdan o\'tgan' 
      });
    }

    // Parolni shifrlash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yangi foydalanuvchi
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      faculty,
      group,
      course,
      phone,
      isAdmin: email === 'admin@talaba.uz' // Admin email
    });

    await user.save();

    // Token yaratish
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'talaba_tarbiya_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// KIRISH (LOGIN)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Foydalanuvchini topish
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email yoki parol noto\'g\'ri' 
      });
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email yoki parol noto\'g\'ri' 
      });
    }

    // Token yaratish
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'talaba_tarbiya_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Muvaffaqiyatli kirdingiz',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        faculty: user.faculty,
        group: user.group,
        course: user.course,
        isAdmin: user.isAdmin,
        rating: user.rating,
        completedTasks: user.completedTasks,
        totalTasks: user.totalTasks
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// CURRENT USER
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ============================================
// 5. TASKS API'LAR
// ============================================

// BARCHA TOPSHIRIQLARNI OLISH
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// BITTA TOPSHIRIQNI OLISH
app.get('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Topshiriq topilmadi' });
    }
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// YANGI TOPSHIRIQ QO'SHISH (Admin)
app.post('/api/tasks', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, category, deadline } = req.body;

    const task = new Task({
      title,
      description,
      category,
      deadline,
      createdBy: req.user.userId
    });

    await task.save();

    // Barcha foydalanuvchilarning totalTasks ni oshirish
    await User.updateMany({}, { $inc: { totalTasks: 1 } });

    res.json({ success: true, message: 'Topshiriq qo\'shildi', task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TOPSHIRIQNI YANGILASH (Admin)
app.put('/api/tasks/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Topshiriq topilmadi' });
    }

    res.json({ success: true, message: 'Topshiriq yangilandi', task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TOPSHIRIQNI O'CHIRISH (Admin)
app.delete('/api/tasks/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Topshiriq topilmadi' });
    }

    // Barcha foydalanuvchilarning totalTasks ni kamaytirish
    await User.updateMany({}, { $inc: { totalTasks: -1 } });

    res.json({ success: true, message: 'Topshiriq o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TOPSHIRIQNI BAJARISH (Talaba)
app.post('/api/tasks/:id/complete', authenticateToken, async (req, res) => {
  try {
    const { completionNote } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: true,
        completionNote,
        completedAt: new Date()
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Topshiriq topilmadi' });
    }

    // Foydalanuvchining completedTasks ni oshirish
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { completedTasks: 1 }
    });

    res.json({ success: true, message: 'Topshiriq bajarildi!', task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ============================================
// 6. EVENTS API'LAR
// ============================================

// BARCHA TADBIRLARNI OLISH
app.get('/api/events', authenticateToken, async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// YANGI TADBIR QO'SHISH (Admin)
app.post('/api/events', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.userId
    });

    await event.save();
    res.json({ success: true, message: 'Tadbir qo\'shildi', event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TADBIRNI YANGILASH (Admin)
app.put('/api/events/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Tadbir topilmadi' });
    }

    res.json({ success: true, message: 'Tadbir yangilandi', event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TADBIRNI O'CHIRISH (Admin)
app.delete('/api/events/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Tadbir o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// TADBIRGA RO'YXATDAN O'TISH
app.post('/api/events/:id/register', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { attendeesCount: 1 } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Tadbir topilmadi' });
    }

    res.json({ success: true, message: 'Ro\'yxatdan o\'tdingiz!', event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ============================================
// 7. CONTENT API'LAR
// ============================================

// BARCHA KONTENTLARNI OLISH
app.get('/api/content', authenticateToken, async (req, res) => {
  try {
    const content = await Content.find().sort({ publishedAt: -1 });
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// YANGI KONTENT QO'SHISH (Admin)
app.post('/api/content', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      createdBy: req.user.userId
    });

    await content.save();
    res.json({ success: true, message: 'Kontent qo\'shildi', content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// KONTENTNI YANGILASH (Admin)
app.put('/api/content/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ success: false, message: 'Kontent topilmadi' });
    }

    res.json({ success: true, message: 'Kontent yangilandi', content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// KONTENTNI O'CHIRISH (Admin)
app.delete('/api/content/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Kontent o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// KONTENTNI LIKE QILISH
app.post('/api/content/:id/like', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { likesCount: 1 } },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ success: false, message: 'Kontent topilmadi' });
    }

    res.json({ success: true, message: 'Yoqtirdingiz!', content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// KONTENT KO'RISHLAR SONINI OSHIRISH
app.post('/api/content/:id/view', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ============================================
// 8. STATISTIKA API
// ============================================
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const tasksCount = await Task.countDocuments();
    const eventsCount = await Event.countDocuments();
    const contentCount = await Content.countDocuments();
    const usersCount = await User.countDocuments();

    res.json({
      success: true,
      stats: {
        tasks: tasksCount,
        events: eventsCount,
        content: contentCount,
        users: usersCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ============================================
// 9. TEST ROUTE
// ============================================
app.get('/', (req, res) => {
  res.json({ 
    message: '🎓 Talaba Tarbiya API ishlamoqda!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/*',
      tasks: '/api/tasks',
      events: '/api/events',
      content: '/api/content',
      stats: '/api/stats'
    }
  });
});

// ============================================
// 10. DATABASE CONNECTION VA SERVER START
// ============================================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talaba-tarbiya';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB ga ulandi');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portda ishlamoqda`);
      console.log(`📍 URL: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB ga ulanishda xatolik:', err);
  });
