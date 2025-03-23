# 🏆 **Parko – Smart Parking, Smarter Travel** 🚗  
## Deployed [HERE 🔗](https://parko-user.vercel.app/)
### **Developed by Team 20 | SolVIT Hackathon Submission**  

🔗 **Forked from** [devankit57/parko](https://github.com/devankit57/parko)  

---

## 🚀 **Overview**  

**Parko** is an **AI-powered smart parking and travel management system** designed to revolutionize urban mobility. It provides:  

✅ **Real-time parking availability** 📍  
✅ **Automated reservation & payments** 💳  
✅ **QR-based entry/exit verification** 🔑  
✅ **AI-generated travel plans** 🗺️  
✅ **Seamless user experience** 📱  

By integrating **Next.js, MongoDB, Razorpay, and AI**, Parko makes urban travel more **efficient, secure, and sustainable.** 🌱  

---

## 🎯 **Problem Statement**  

🚦 **Urban parking is inefficient** – Finding a spot is time-consuming, leading to congestion.  
🕵️ **Manual systems are slow & error-prone** – Traditional parking lacks automation.  
⏳ **Travel planning is chaotic** – Poor route management wastes time & fuel.  

### ✅ **Parko solves this by providing:**  
✔️ **Smart parking management** with live updates.  
✔️ **AI-powered travel planning** for optimal routes.  
✔️ **Automated, secure payments** & digital invoicing.  
✔️ **Scalability for smart cities, events & corporate spaces.**  

---

## 🔥 **Key Features**  

### 🚗 **Smart Parking Management**  
✔️ **Find & reserve parking** in real-time.  
✔️ **QR-based verification** for secure entry/exit.  
✔️ **View invoices & make instant payments.**  

### 🤖 **AI-Powered Travel Planning**  
✔️ **Generate optimized itineraries** based on user inputs.  
✔️ **Reduce travel time & fuel consumption.**  
✔️ **Store & retrieve past travel plans.**  

### 💳 **Seamless Digital Payments**  
✔️ **Integrated with Razorpay** for smooth transactions.  
✔️ **Instant invoice generation** for a hassle-free experience.  
✔️ **Secure and automated checkout process.**  

### 📱 **User-Friendly Dashboard**  
✔️ **Intuitive UI** with easy navigation.  
✔️ **Real-time notifications & updates.**  
✔️ **Mobile-first design for accessibility.**  

---

## 🏗️ **System Architecture**  

### **Frontend (Next.js & React)**  
🚀 **Built with:**  
- Next.js for **SSR & performance optimization.**  
- Tailwind CSS for **fast, responsive design.**  
- Framer Motion for **smooth animations.**  
- React-QR-Code for **QR-based security.**  

### **Backend (Node.js & MongoDB)**  
🛠️ **Tech stack includes:**  
- **Next.js API routes** for handling user requests.  
- **MongoDB with Mongoose** for efficient data storage.  
- **Next-Auth for authentication** (Google Sign-In).  

### **Payments (Razorpay Integration)**  
💰 **Payment flow:**  
1. User generates an **invoice** for parking.  
2. Payment is processed via **Razorpay checkout.**  
3. **QR Code is generated** for exit verification.  

### **AI Module (Travel Planning)**  
🧠 **AI-Generated Plans**  
- Accepts user input (destination, duration, notes).  
- Returns **optimized routes & travel schedules.**  
- Plans are **stored & retrieved for future reference.**  

---

## 🛠️ **Technology Stack**  

| **Component**      | **Technology Used**                        |  
|-------------------|--------------------------------------|  
| **Frontend**      | Next.js, React, Tailwind CSS, Framer Motion  |  
| **Backend**       | Node.js, Next.js API Routes, MongoDB (Mongoose)  |  
| **Authentication**| Next-Auth (Google Sign-In)  |  
| **Database**      | MongoDB (Mongoose ORM)  |  
| **Payments**      | Razorpay API  |  
| **AI Module**     | AI-based travel planning integration |  

---

## 📥 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/TechieSamosa/parko.git
cd parko
```

### **2️⃣ Install Dependencies**  
```sh
npm install
# or
yarn install
```

### **3️⃣ Setup Environment Variables**  
Create a `.env.local` file and add:  
```ini
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
```

### **4️⃣ Run the Application**  
```sh
npm run dev
# or
yarn dev
```
🔗 Open **http://localhost:3000** in your browser.  

---

## 📝 **Usage Guide**  

### **📌 Login & Dashboard**  
- Sign in using **Google** authentication.  
- Navigate through **Home, Plan Trip, Parking & Settings.**  

### **🔍 Parking Management**  
- Search & **reserve parking spots.**  
- View & pay for **invoices digitally.**  
- **QR code verification** for smooth entry/exit.  

### **🧠 AI Travel Planning**  
- Enter destination & trip details.  
- Receive an **AI-generated travel plan.**  
- Store & retrieve previous plans.  

### **💰 Payments & Invoicing**  
- **Razorpay checkout** for seamless transactions.  
- View invoices & generate **QR codes for verification.**  

---

## 🌍 **Impact & Benefits**  

✅ **Efficiency:** Reduces parking search time.  
✅ **Security:** QR-based entry prevents unauthorized access.  
✅ **Cost Savings:** Optimized routes cut fuel usage.  
✅ **User Experience:** Transparent invoicing & easy payments.  
✅ **Scalability:** Adaptable for **cities, corporate spaces & events.**  
✅ **Sustainability:** Supports **eco-friendly urban mobility.**  

---

## 👨‍💻 **Team 20 – SolVIT Hackathon**  

**Developed by:**  
👨‍💻 **[Ankit](https://www.github.com/devankit57)** – 22MIM100771  
👩‍💻 **[Shreya Raj Gupta](https://github.com/Shreya-Raj-Gupta)** – 22BHI101432  
👨‍💻 **[Aditya Sachin Khamitkar](https://www.github.com/TechieSamosa)** – 22MIP100063  
👨‍💻 **[Vatsal Mahajan](https://www.github.com/VatsalCodes44)** – 24BCE102564  

🔗 **Forked from:** [devankit57/parko](https://github.com/devankit57/parko)  

---

## 🏆 **Why Parko Should Win?**  

🔥 **AI + Smart Parking = Innovation** – A unique blend of AI-driven travel planning & real-time parking.  
💰 **Digital Transformation** – Automating payments, reservations & verification.  
🚀 **Scalable & Future-Ready** – Usable by **governments, corporations & smart cities.**  
🌱 **Sustainability Impact** – Reducing **fuel waste & emissions.**  

💡 **Smart Parking, Smarter Travel – Parko is ready to transform urban mobility!** 🚀  

---

## 📜 **License**  

🔓 **MIT License** – Free to use, modify & distribute. See the [LICENSE](LICENSE) file for details.  

---

### **📢 Final Thoughts**  
> 🚀 **Parko is not just an idea; it’s a revolution in smart mobility.**  
> **Vote for innovation. Vote for impact. Vote for Parko!** 🌍🏆  

---
