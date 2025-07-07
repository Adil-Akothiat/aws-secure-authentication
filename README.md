# 🔐 AWS Cognito Auth + React (OIDC) + AOS

This is a React app using **AWS Cognito** for secure authentication via **OAuth2/OpenID Connect**, enhanced with route protection, scroll animations via **AOS**, and Tailwind styling.

---

## ✨ Features

- ✅ **Login / Register** via Cognito Hosted UI
- ✅ Email verification, password reset (handled by Cognito)
- ✅ Route protection for authenticated pages
- ✅ Sign-out with redirect
- ✅ Get logged-in user info (email, name, etc.)
- ✅ Animated page content using [AOS](https://michalsnik.github.io/aos/)
- ✅ Uses `react-oidc-context` for auth state

---

## 🔧 Tech Stack

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🔐 AWS Cognito Hosted UI
- 🧠 [react-oidc-context](https://www.npmjs.com/package/react-oidc-context)
- 💨 [AOS (Animate on Scroll)](https://github.com/michalsnik/aos)
- 🛡️ Vite (fast dev environment)

---

## 🚀 Setup Instructions

### 1. Clone and install

```bash
git clone https://github.com/your-username/aws-cognito-react-auth.git
cd aws-cognito-react-auth
npm install