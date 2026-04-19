# RentFriend

**RentFriend – A premium, high-impact P2P rental ecosystem for professional gear and community assets.**

---

## 🚀 Overview
RentFriend is a modern peer-to-peer rental platform that allows users to rent high-value items such as professional gear, electronics, and event equipment for short-term use. The platform focuses on security, usability, and a premium user experience, enabling both renters and lenders to interact in a trusted ecosystem.

---

## ✨ Features

### 🔐 Authentication System
- Custom Login & Signup UI
- Role-based registration (Renter / Lender)
- NID upload interface (UI-based verification)

### 🛍️ Product System
- Browse products with responsive UI
- Dynamic pricing (1-day, 2-day, 7-day)
- Detailed product pages
- Login required before booking
- Smart redirect after login

### 🧠 Booking System
- Only one active booking allowed per user
- Animated warning modal (Framer Motion)
- Checkout includes:
  - Rental cost
  - Refundable deposit (৳1500)
  - Service fee

### 📊 Dashboard
- Real-time gear tracking (no hardcoded data)
- Profile management
- Logout system

### 💾 State & Persistence
- Global state using Context API
- Data persistence using localStorage
- Ready for backend integration (MongoDB)

---

## 🛠️ Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: React Icons
- State Management: Context API
- Storage: LocalStorage

---

## 📁 Folder Structure
/src
├── components # UI components (Navbar, Sidebar, Modals)
├── context # Global state (AppContext)
├── pages # Pages (Home, Browse, Dashboard, Auth)
├── data # Mock data


---

## ⚙️ Installation

# Clone repository
git clone [repository-link]

# Go to project folder
cd rentfriend

# Install dependencies
npm install

# Run project
npm run dev
👥 Team Members
MD Safin Elahi – Full-stack Developer
MD Monirul Islam
MD Alfaz Hosain
📌 Current Status

🚧 Project is under development.
Frontend and core system logic are implemented. Backend and deployment are in progress.

🔮 Future Plans
Backend integration (Node.js + Express)
Database (MongoDB / PostgreSQL)
Payment integration (bKash, Nagad, etc.)
Real-time booking system
Advanced verification & security
