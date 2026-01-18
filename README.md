# 💬 MERN Real-Time Chat Application

A full-stack real-time chat application built using the **MERN stack** with **Socket.io**.  
Supports secure authentication, real-time messaging, and online user presence.

---

## ✨ Features

- 🔐 JWT Authentication with HttpOnly Cookies
- 💬 Real-time messaging using Socket.io
- 🟢 Online / Offline user status
- 🔍 User search and conversations
- 🧠 Global state management with Zustand
- 🎨 Responsive UI using Tailwind CSS
- 🌐 Secure CORS configuration
- ☁️ Deployed on Vercel & Render

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Zustand
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Socket.io
- JWT Authentication
- Cookie-parser

---

## 📂 Project Structure
<img width="529" height="922" alt="image" src="https://github.com/user-attachments/assets/862fcf0d-b515-46ce-af75-6fd07a36da15" />



---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder using the template below:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production


⚠️ .env is not committed for security reasons.
Use .env.example as a reference.

🧪 Run Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

🧠 Key Learnings

Handling CORS & cookies in cross-origin deployments

Managing real-time communication with Socket.io

Debugging state synchronization issues in React

Using Zustand as a single source of truth

Deploying full-stack applications

📌 Future Improvements

Typing indicators

Read receipts

Group chats

File and image sharing

👨‍💻 Author

Aaditya Tripathi
Aspiring Full-Stack Developer | MERN | Real-Time Applications

⭐ Feel free to star this repository if you find it useful!


---

# 🧾 3️⃣ WHAT TO COMMIT TO GITHUB (IMPORTANT)

### ✅ SHOULD be pushed
✔ Source code  
✔ `README.md`  
✔ `.env.example`  
✔ `.gitignore`

### ❌ SHOULD NOT be pushed
❌ `.env`  
❌ `node_modules`  

---

# 🧑‍💻 4️⃣ FINAL GIT COMMANDS (SAFE)

From repo root:

```powershell
git status
git add .
git commit -m "Add README and env example for project setup"
git push origin main
