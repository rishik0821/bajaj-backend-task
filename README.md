# 🚀 BFHL API — Bajaj Finserv  Task (VIT)

A tiny REST API built with **Node.js + Express** and deployed on **Vercel**.  
It ingests an array and returns categorized data (odd/even/alphabet/special), total **sum (as string)**, and a **reverse alternating-caps** concatenation of all letters — exactly per the BFHL spec.

<p align="left">
  <a href="https://nodejs.org/"><img alt="Node 18.x" src="https://img.shields.io/badge/node-18.x-339933?logo=node.js&logoColor=white"></a>
  <a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/express-5.x-black?logo=express&logoColor=white"></a>
  <a href="https://vercel.com/"><img alt="Vercel" src="https://img.shields.io/badge/deploy-vercel-000000?logo=vercel&logoColor=white"></a>
</p>

---

## 🔗 Live API
Base URL: `https://bajaj-backend-task.vercel.app`

- `GET /bfhl` → returns `{ "operation_code": 1 }`
- `POST /bfhl` → processes the array and returns categorized output

Submission URL to share:  
`https://bajaj-backend-task.vercel.app/bfhl`

---

## 👤 User Details (hardcoded)
```json
{
  "user_id": "sai_rishik_21082005",
  "email": "sairishik589@gmail.com",
  "roll_number": "22BCE7710"
}
```

---

## 📦 Tech Stack
- **Runtime:** Node.js 18.x  
- **Framework:** Express 5  
- **Hosting:** Vercel (Serverless)  
- **Tooling:** npm, nodemon

---

## ▶️ Quick Start (Local)
```bash
git clone https://github.com/rishik0821/bajaj-backend-task
cd bajaj-backend-task
npm install
npm run dev
```

---

## 🛣️ Endpoints

### GET `/bfhl`
Returns a simple JSON for health check.

**Response**
```json
{ "operation_code": 1 }
```

---

### POST `/bfhl`
Send a JSON body with a `data` array of strings (numbers, letters, or symbols).

**Request**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response**
```json
{
  "is_success": true,
  "user_id": "sai_rishik_21082005",
  "email": "sairishik589@gmail.com",
  "roll_number": "22BCE7710",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

---

## 🔁 Examples

**Request**
```json
{ "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"] }
```

**Response**
```json
{
  "is_success": true,
  "user_id": "sai_rishik_21082005",
  "email": "sairishik589@gmail.com",
  "roll_number": "22BCE7710",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

---

## ✅ Validations & Errors
- Missing `data` field:
```json
{ "is_success": false, "error": "Missing 'data' field in request body" }
```

- Non-array `data`:
```json
{ "is_success": false, "error": "'data' must be an array" }
```

- Empty array:
```json
{ "is_success": false, "error": "'data' array cannot be empty" }
```

- Invalid route:
```json
{ "is_success": false, "error": "Endpoint not found" }
```

---

## 🧪 Test via cURL

**GET**
```bash
curl https://bajaj-backend-task.vercel.app/bfhl
```

**POST**
```bash
curl -X POST https://bajaj-backend-task.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

---

## 🗂 Project Structure
```
.
├── index.js         # Express server logic
├── package.json     # Dependencies and scripts
├── vercel.json      # Deployment config
└── README.md        # You’re reading this
```

---

### 🧠 Bonus Features

- ✅ Dynamically generates `user_id` from full name and DOB
- ✅ Supports deeply nested arrays via automatic flattening
- ✅ Includes `/health` endpoint with uptime and timestamp



