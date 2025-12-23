📚 OpenLecture

OpenLecture is a web application that helps university students find empty lecture halls and quiet study spaces in real time.
Starting with York University, OpenLecture aims to expand to multiple campuses.

🚀 Features

🎓 University-specific access (York University supported)

🔍 Search for empty lecture halls by time and building

🧭 Clean, modern landing page UI

🔐 Authentication system

Login

Sign up

🎨 Consistent purple-themed design system

📱 Responsive layout (desktop & mobile friendly)

🛠 Tech Stack
Frontend

React

React Router

CSS (custom design system)

Modern UI patterns (cards, pills, grid layout)

Backend

Spring Boot

REST API for authentication & room availability

PostgreSQL (planned / in progress)

📂 Project Structure
src/
├── assets/
│   └── brand-icon.png
├── pages/
│   ├── LandingPage.jsx
│   ├── SearchPage.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── App.js
├── App.css
└── index.js

🔐 Authentication Flow

Users can sign up using their university email

Users can log in

Auth state is stored in localStorage

Navbar updates dynamically based on login state

🎨 Design System

Primary Color: Purple #6D5BD0

Neutral background: Light gray

Rounded pill buttons

Card-based layouts

Minimalist, university-friendly UI

🧪 Running the Project Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/openlecture.git
cd openlecture

2️⃣ Install dependencies
npm install

3️⃣ Start the frontend
npm start


Frontend runs at:

http://localhost:3000

🌱 Roadmap

 Expand to more universities

 Real-time occupancy updates

 Building & room filters

 Admin dashboard

 OAuth login (Google / GitHub)

 Mobile optimization

 Dark mode

👨‍💻 Contributors

Meem Morshed — Founder & Developer

Open to contributors 🚀

📄 License

© 2025 OpenLecture. All rights reserved.

If you want, I can:

tailor this README for GitHub stars

add screenshots / GIFs

write a pitch-style README for recruiters

add API documentation

Just tell me 👍