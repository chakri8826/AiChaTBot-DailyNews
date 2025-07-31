# 🤖 AI ChatBot + 📰 Daily News App

A full-stack AI-powered chatbot integrated with live daily news. Built using the **MERN stack** with **Azure Cognitive Search**, **GitHub Token Integration**, and **News API**, this project combines intelligent conversation and real-time news in a seamless interface.

---

## 🚀 Features

- 💬 **Smart AI ChatBot** — Context-aware responses powered by Azure Search.
- 🔍 **Semantic Search via Azure** — Precise, intelligent results.
- 📰 **Live Daily News Feed** — Powered by News API.
- 🌗 **Dark/Light Mode** — Built-in theme toggle.
- ⚡ **Global State with Zustand** — Lightweight and scalable state management.

---

## 🛠️ Tech Stack

| Layer         | Tech                            |
|---------------|----------------------------------|
| **Frontend**  | React.js, Vite, Tailwind CSS     |
| **Backend**   | Node.js, Express.js              |
| **Database**  | MongoDB (Mongoose ODM)           |
| **APIs**      | Azure Cognitive Search, News API |
| **Auth**      | JWT                              |
| **State**     | Zustand                          |

---

## 📂 Project Structure

### Backend

```
backend/
├── config/           # Config files (.env, DB)
├── controllers/      # Request handlers
├── middleware/       # Auth, error handling
├── models/           # Mongoose models
├── routes/           # Express route files
├── services/         # Search Service
├── utils/            # generateToken
└── server.js         # Backend entry point
```

### Frontend

```
Frontend/
├── components/       # Reusable UI components
├── config/           # API URLs
├── contexts/         # Theme Context
├── pages/            # Main views/pages
├── services/         # Axios calls to backend
├── store/            # Zustand state store
└── App.jsx           # Main React entry
```

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/` with the following:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_token
NEWS_API_KEY=your_news_api_key
```

> ⚠️ Don’t forget to list `.env` in your `.gitignore` to keep secrets safe.

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AiChatBot-DailyNews.git
cd AiChatBot-DailyNews
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🧠 How It Works

- Frontend allows users to chat with the AI and view news articles.
- Backend handles requests, connects with Azure for search, and News API for articles.
- MongoDB stores user sessions, chat history, and settings.
- Zustand handles frontend state like theme, user info, and cached responses.
- JWT tokens are used for authentication and route protection.

---

## 📸 Screenshots

### 🔍 Search Page
![Search Page](https://github.com/chakri8826/AiChaTBot-DailyNews/blob/ed5e986071f55b871487a145382c610c4fef9aba/Search%20Page.png)

### 📄 Search Results Page
![Search Results Page](https://github.com/chakri8826/AiChaTBot-DailyNews/blob/ed5e986071f55b871487a145382c610c4fef9aba/Search%20Result.png)

### 📰 News Page
![News Page](https://github.com/chakri8826/AiChaTBot-DailyNews/blob/3a1c3f62e634d0ed1151ae0594a75b0c7f92f0c8/News%20Page.png)

### 📖 News Details Page
![News Details Page](https://github.com/chakri8826/AiChaTBot-DailyNews/blob/ed5e986071f55b871487a145382c610c4fef9aba/News%20Details%20Page.png)


---

## 📦 APIs & Services Used

- [Azure Cognitive Search](https://learn.microsoft.com/en-us/azure/search/)
- [News API](https://newsapi.org/)
- [GitHub REST API](https://docs.github.com/en/rest)

---

## 🔮 Future Enhancements

- 🧠 OpenAI/GPT-powered chatbot
- 🌍 Multilingual support
- 📲 PWA/mobile optimization
- 🔐 Social login with Google/GitHub

---
 
