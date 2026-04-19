## Запуск
 
```bash
node <filename>.js <port>
```
 
Порт можна не вказувати — за замовчуванням використовується `3000`.
 
---
 
## Вправи
 
### 1. `json_object.js` — Обробка об'єкта
 
**Endpoint:** `POST /json-object`
 
```bash
node json_object.js 3000
```
 
```bash
curl -X POST http://localhost:3000/json-object \
  -H "Content-Type: application/json" \
  -d '{"name": "Anatolii", "age": 30}'
# {"greeting":"Hello Anatolii","isAdult":true}
```
 
---
 
### 2. `json_array.js` — Обробка масиву чисел
 
**Endpoint:** `POST /json-array`
 
```bash
node json_array.js 3000
```
 
```bash
curl -X POST http://localhost:3000/json-array \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4]}'
# {"count":4,"sum":10,"average":2.5}
```
 
---
 
### 3. `json_calc.js` — Математичні операції
 
**Endpoint:** `POST /json-calc`
 
Підтримувані операції: `add`, `subtract`, `multiply`, `divide`
 
```bash
node json_calc.js 3000
```
 
```bash
curl -X POST http://localhost:3000/json-calc \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 5, "operation": "multiply"}'
# {"result":50}
```
 
---
 
### 4. `json_nested.js` — Вкладені структури
 
**Endpoint:** `POST /json-nested`
 
```bash
node json_nested.js 3000
```
 
```bash
curl -X POST http://localhost:3000/json-nested \
  -H "Content-Type: application/json" \
  -d '{"user": {"name": "John", "roles": ["admin", "editor"]}}'
# {"name":"John","roleCount":2,"isAdmin":true}
```
 
---
 
## Коди відповідей
 
| Код | Опис |
|-----|------|
| `200` | Успішна відповідь |
| `400` | Некоректний JSON або невідома операція |
| `422` | Невалідні або відсутні поля |
| `404` | Маршрут не знайдено |
