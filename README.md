# 🍱 TiffinWala – Admin Panel

## 📌 Project Overview

**TiffinWala – Admin Panel** is the central management system of the TiffinWala food marketplace platform.

It is designed for the Super Admin to manage and monitor the complete platform from one place.

The Admin Panel provides centralized control over Customers, HomeChefs, Tiffins, Orders, Payments, Commission, Complaints, Reviews, Notifications, Reports, and platform settings.

The main objective of this panel is to make marketplace management easier, more organized, and efficient.

This project is currently developed as a **Frontend Demo using React.js and LocalStorage**.

---

## 🚀 Key Features

### 1. 🔐 Admin Login
- Admin login interface.
- Email and password validation.
- Show/Hide password functionality.
- Remember Me option.
- Protected routes.
- Demo authentication using LocalStorage.

### 2. 📊 Dashboard
- Overall platform statistics.
- Total customers.
- Total HomeChefs.
- Total tiffins.
- Total orders.
- Revenue overview.
- Commission overview.
- Recent orders.
- Top-performing HomeChefs.
- Order details popup.

### 3. 👥 Customer Management
- View all customers.
- Search customers.
- Filter customers.
- View customer details.
- Block and unblock customers.
- Manage customer information.

### 4. 👨‍🍳 HomeChef Management
- View registered HomeChefs.
- Search and filter HomeChefs.
- View HomeChef details.
- Approve or reject HomeChef applications.
- Activate or deactivate HomeChef accounts.

### 5. 🍱 Tiffin Management
- View all listed tiffins.
- Search and filter tiffins.
- View tiffin details.
- Approve or reject tiffin listings.
- Manage tiffin availability.

### 6. 📦 Orders Management
- View all orders.
- Search and filter orders.
- View complete order details.
- Update order status.
- Cancel orders.
- Monitor order activities.

### 7. 💰 Payments & Commission
- View payment transactions.
- Monitor total revenue.
- Track platform commission.
- View HomeChef earnings.
- Track pending payouts.
- Mark demo payouts as paid.

### 8. 🎧 Complaints & Support
- View customer complaints.
- View HomeChef complaints.
- Search and filter complaints.
- View complaint details.
- Send admin replies.
- Update complaint status.

### 9. ⭐ Reviews & Ratings
- View customer reviews.
- Monitor ratings.
- Search and filter reviews.
- Approve reviews.
- Hide or show reviews.
- Delete reviews.

### 10. 📈 Reports & Analytics
- Revenue analytics.
- Commission reports.
- Order statistics.
- Customer statistics.
- HomeChef performance.
- Popular tiffins.
- Daily, weekly, and monthly reports.
- Date-based filtering.
- Export reports in CSV format.

### 11. 🔔 Notifications & Announcements
- Create announcements.
- Send announcements to Customers.
- Send announcements to HomeChefs.
- Send announcements to everyone.
- Save announcements as drafts.
- Search and filter notifications.
- View notification details.
- Delete announcements.

### 12. 👤 Admin Profile
- View Admin profile.
- Update Admin name.
- Update email address.
- Update phone number.
- Save profile information.

### 13. ⚙️ Settings
- Manage platform name.
- Configure support email.
- Set platform commission percentage.
- Manage Customer notification preferences.
- Manage HomeChef notification preferences.
- Auto Accept Orders setting.
- Maintenance Mode setting.
- Save and reset settings.

### 14. 🔑 Forgot Password
- Enter registered email address.
- Verify email against demo Admin account.
- Set a new password.
- Confirm new password.
- Save password using LocalStorage.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| React Router DOM | Routing and navigation |
| React Icons | Icons |
| LocalStorage | Demo data storage |
| Vite | Development environment |

---

## 📂 Project Structure

```text
Admin/
│
├── public/
│
├── src/
│   │
│   ├── Components/
│   │   ├── AdminLayout.jsx
│   │   └── AdminLayout.css
│   │
│   ├── Pages/
│   │   ├── CSS/
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Customers.css
│   │   │   ├── HomeChefs.css
│   │   │   ├── Tiffins.css
│   │   │   ├── Orders.css
│   │   │   ├── Payments.css
│   │   │   ├── Complaints.css
│   │   │   ├── Reviews.css
│   │   │   ├── Reports.css
│   │   │   ├── Notifications.css
│   │   │   ├── Profile.css
│   │   │   ├── Settings.css
│   │   │   └── ForgotPassword.css
│   │   │
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Customers.jsx
│   │   ├── HomeChefs.jsx
│   │   ├── Tiffins.jsx
│   │   ├── Orders.jsx
│   │   ├── Payments.jsx
│   │   ├── Complaints.jsx
│   │   ├── Reviews.jsx
│   │   ├── Reports.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

## 💻 Installation & Setup

Follow these steps to run the Admin Panel locally.

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the Project Folder

```bash
cd Admin
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 🔑 Demo Login Credentials

Use the following credentials to access the Admin Panel:

| Field | Credentials |
|---|---|
| Email | admin@example.com |
| Password | Admin@123 |

**Note:** These are demo credentials for frontend testing. If the password has been changed through Forgot Password, use the updated password.

---

## 🎨 UI & Design

The Admin Panel uses a professional and clean dashboard interface.

- Dark Green primary theme.
- Orange accent color.
- Light background.
- Sidebar navigation.
- Responsive dashboard.
- Organized management tables.
- Search and filter functionality.
- Popup modals for detailed information.
- Responsive layouts for desktop, tablet, and mobile.

---

## 💾 Data Management

Currently, the Admin Panel uses browser **LocalStorage** for demo data management.

The following modules maintain their demo data locally:

- Customers
- HomeChefs
- Tiffins
- Orders
- Payments
- Complaints
- Reviews
- Notifications
- Admin Profile
- Settings

The Admin Panel currently operates independently of the Customer and HomeChef applications.

---

## 🔮 Future Scope

The following improvements can be implemented in future development:

- Backend integration using Node.js and Express.js.
- MongoDB database integration.
- Secure Admin authentication and authorization.
- Real-time Customer and HomeChef data synchronization.
- Real order management.
- Real payment gateway integration.
- Automated commission calculation.
- Actual HomeChef payout management.
- Email and SMS notifications.
- Secure password reset using OTP.
- Advanced analytics and reporting.

---

## ⚠️ Current Project Limitations

- This is currently a frontend-only demo project.
- Demo data is stored in browser LocalStorage.
- Customer and HomeChef data are not synchronized with their separate panels.
- Payment and payout operations are simulated.
- Announcements are saved in Admin LocalStorage and are not delivered to actual users.
- Settings do not yet control the other panels.
- Authentication is demo-based and not suitable for production security.

---

## 🎯 Project Objective

The objective of the TiffinWala Admin Panel is to provide a centralized platform for managing the entire tiffin marketplace.

It allows the Super Admin to monitor Customers, HomeChefs, food listings, orders, payments, complaints, reviews, and platform performance from a single dashboard.

---

## 👨‍💻 Developer

**Project:** TiffinWala – Tiffin Service Marketplace

**Panel:** Admin Panel

**Role:** Super Admin

---

## 📌 Project Status

**Frontend Development: Completed ✅**

**Backend Integration: Pending**

---

⭐ If you like this project, don't forget to give it a star on GitHub!
