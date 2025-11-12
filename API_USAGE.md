# 📱 FLUTTER GA ULASH - TO'LIQ QO'LLANMA

## 1️⃣ FLUTTER DA API SERVICE YARATISH

```dart
// lib/services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // BACKEND URL (deploy qilganingizdan keyin yangilang)
  static const String baseUrl = 'http://localhost:5000';
  // Production: static const String baseUrl = 'https://your-app.railway.app';

  static String? _token;

  // Token ni yuklash
  static Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
  }

  // Token ni saqlash
  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
    _token = token;
  }

  // Token ni o'chirish
  static Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    _token = null;
  }

  // Headers
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };

  // ==================== AUTH ====================

  // REGISTER
  static Future<Map<String, dynamic>> register({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
    String? faculty,
    String? group,
    int? course,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password,
          'faculty': faculty,
          'group': group,
          'course': course,
        }),
      );

      final data = json.decode(response.body);
      
      if (response.statusCode == 200 && data['success']) {
        await saveToken(data['token']);
        return data;
      } else {
        throw Exception(data['message'] ?? 'Ro\'yxatdan o\'tishda xatolik');
      }
    } catch (e) {
      throw Exception('Server bilan bog\'lanishda xatolik: $e');
    }
  }

  // LOGIN
  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      final data = json.decode(response.body);
      
      if (response.statusCode == 200 && data['success']) {
        await saveToken(data['token']);
        return data;
      } else {
        throw Exception(data['message'] ?? 'Login xatosi');
      }
    } catch (e) {
      throw Exception('Server bilan bog\'lanishda xatolik: $e');
    }
  }

  // GET CURRENT USER
  static Future<Map<String, dynamic>> getCurrentUser() async {
    await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl/api/auth/me'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('User ma\'lumotlarini olishda xatolik');
    }
  }

  // ==================== TASKS ====================

  // GET TASKS
  static Future<List<dynamic>> getTasks() async {
    await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl/api/tasks'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data['tasks'];
    } else {
      throw Exception('Topshiriqlarni olishda xatolik');
    }
  }

  // CREATE TASK (Admin)
  static Future<Map<String, dynamic>> createTask({
    required String title,
    required String description,
    required String category,
    required DateTime deadline,
  }) async {
    await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl/api/tasks'),
      headers: headers,
      body: json.encode({
        'title': title,
        'description': description,
        'category': category,
        'deadline': deadline.toIso8601String(),
      }),
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception(data['message'] ?? 'Topshiriq qo\'shishda xatolik');
    }
  }

  // UPDATE TASK (Admin)
  static Future<Map<String, dynamic>> updateTask(String id, Map<String, dynamic> taskData) async {
    await loadToken();
    
    final response = await http.put(
      Uri.parse('$baseUrl/api/tasks/$id'),
      headers: headers,
      body: json.encode(taskData),
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('Topshiriqni yangilashda xatolik');
    }
  }

  // DELETE TASK (Admin)
  static Future<void> deleteTask(String id) async {
    await loadToken();
    
    final response = await http.delete(
      Uri.parse('$baseUrl/api/tasks/$id'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode != 200 || !data['success']) {
      throw Exception('Topshiriqni o\'chirishda xatolik');
    }
  }

  // COMPLETE TASK (Talaba)
  static Future<Map<String, dynamic>> completeTask(String id, {String? note}) async {
    await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl/api/tasks/$id/complete'),
      headers: headers,
      body: json.encode({
        'completionNote': note,
      }),
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('Topshiriqni bajarishda xatolik');
    }
  }

  // ==================== EVENTS ====================

  // GET EVENTS
  static Future<List<dynamic>> getEvents() async {
    await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl/api/events'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data['events'];
    } else {
      throw Exception('Tadbirlarni olishda xatolik');
    }
  }

  // CREATE EVENT (Admin)
  static Future<Map<String, dynamic>> createEvent(Map<String, dynamic> eventData) async {
    await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl/api/events'),
      headers: headers,
      body: json.encode(eventData),
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('Tadbir qo\'shishda xatolik');
    }
  }

  // REGISTER FOR EVENT
  static Future<Map<String, dynamic>> registerForEvent(String id) async {
    await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl/api/events/$id/register'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('Ro\'yxatdan o\'tishda xatolik');
    }
  }

  // ==================== CONTENT ====================

  // GET CONTENT
  static Future<List<dynamic>> getContent() async {
    await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl/api/content'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data['content'];
    } else {
      throw Exception('Kontentni olishda xatolik');
    }
  }

  // LIKE CONTENT
  static Future<Map<String, dynamic>> likeContent(String id) async {
    await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl/api/content/$id/like'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data;
    } else {
      throw Exception('Like qilishda xatolik');
    }
  }

  // ==================== STATS ====================

  // GET STATS
  static Future<Map<String, dynamic>> getStats() async {
    await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl/api/stats'),
      headers: headers,
    );

    final data = json.decode(response.body);
    
    if (response.statusCode == 200 && data['success']) {
      return data['stats'];
    } else {
      throw Exception('Statistikani olishda xatolik');
    }
  }
}
```

## 2️⃣ DATASERVICE NI YANGILASH

```dart
// lib/services/data_service.dart
import '../models/models.dart';
import 'api_service.dart';

class DataService {
  // Topshiriqlarni olish (Backend dan)
  Future<List<Task>> getTasks() async {
    try {
      final data = await ApiService.getTasks();
      return data.map((json) => Task.fromJson(json)).toList();
    } catch (e) {
      print('Error loading tasks: $e');
      // Agar backend ishlamasa, bo'sh list qaytarish
      return [];
    }
  }

  // Topshiriq qo'shish (Admin)
  Future<void> createTask(Task task) async {
    await ApiService.createTask(
      title: task.title,
      description: task.description,
      category: task.category.name,
      deadline: task.deadline,
    );
  }

  // Topshiriqni bajarish
  Future<void> completeTask(String taskId, {String? note}) async {
    await ApiService.completeTask(taskId, note: note);
  }
}
```

## 3️⃣ AUTH SERVICE NI YANGILASH

```dart
// lib/services/auth_service.dart
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  Future<bool> login(String email, String password) async {
    try {
      final result = await ApiService.login(email, password);
      return result['success'] == true;
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }

  Future<bool> register({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
  }) async {
    try {
      final result = await ApiService.register(
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      );
      return result['success'] == true;
    } catch (e) {
      print('Register error: $e');
      return false;
    }
  }

  Future<void> logout() async {
    await ApiService.clearToken();
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }

  Future<bool> isLoggedIn() async {
    await ApiService.loadToken();
    return ApiService._token != null;
  }
}
```

## 4️⃣ ISHLATISH MISOLI

```dart
// Login screen da
final result = await ApiService.login('email@example.com', 'password');
if (result['success']) {
  // Kirish muvaffaqiyatli
  Navigator.pushReplacement(...);
}

// Topshiriqlarni olish
final tasks = await ApiService.getTasks();

// Admin topshiriq qo'shadi
await ApiService.createTask(
  title: 'Yangi topshiriq',
  description: 'Tavsif...',
  category: 'spirituality',
  deadline: DateTime.now().add(Duration(days: 7)),
);

// Talaba topshiriqni bajaradi
await ApiService.completeTask('task_id', note: 'Bajarildi!');
```

## 5️⃣ ERROR HANDLING

```dart
try {
  final tasks = await ApiService.getTasks();
  // Success
} catch (e) {
  // Error
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Xatolik'),
      content: Text(e.toString()),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('OK'),
        ),
      ],
    ),
  );
}
```

---

**Backend bilan Flutter to'liq ulandi! 🎉**
