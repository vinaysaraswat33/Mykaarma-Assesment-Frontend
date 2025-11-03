# 💬 MyKaarma Assessment – Frontend (React + Vite)

This is the frontend for the **MyKaarma Assessment Project**, providing a clean, conversational UI where users can chat with an AI assistant to get smartphone recommendations and comparisons.

---

## 🚀 Tech Stack

* **Framework:** React (Vite)
* **Language:** JavaScript / JSX
* **Styling:** Tailwind CSS
* **Hosting:** Vercel
* **Backend API:** FastAPI (Groq powered)

---

## 📂 Project Structure

```
frontend/
│
├── src/
│   ├── components/
            ├── Comparison.jsx
            ├── Product Card.jsx             # UI components
│   ├── App.jsx                # Main app entry
│   ├── main.jsx               # Root rendering
│   ├── App.css                   # API service files
│
├── Index.html
│
├── .env                       # API URLs, etc.
├── vite.config.js             # Vite configuration
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/MyKaarma-Assesment-Frontend.git
cd MyKaarma-Assesment-Frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

```
VITE_API_URL=https://my-kaarma-assesment-backend.onrender.com
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
```

---

## 🌐 Deployment

Deployed on **Vercel** — make sure backend CORS allows:

```
https://mykaarma-assesment-frontend.vercel.app
```

---

## 🧠 Features

✅ AI-powered chat interface
✅ Dynamic phone cards and comparisons
✅ Context-aware queries (“tell me more”, “compare Pixel 8a vs OnePlus 12R”)
✅ Responsive Tailwind UI
✅ Real-time backend integration

---

## 🧩 Architecture Overview

```
          ┌───────────────────────────┐
          │    React Frontend (Vite)  │
          │───────────────────────────│
          │  • Chat UI                │
          │  • API calls via fetch()  │
          │  • Product cards          │
          └───────────┬───────────────┘
                      │
                      ▼
          ┌───────────────────────────┐
          │ FastAPI Backend (Render)  │
          │ • /chat endpoint          │
          │ • Groq + LLaMA-3.3        │
          └───────────────────────────┘
```

---

## 🧾 License

This project is for educational and assessment purposes only.
