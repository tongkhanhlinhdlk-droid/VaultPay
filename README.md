# 🚀 VaultPay

## Web3 Payments Made Simple

VaultPay is a Web3 payment platform that enables secure USDC payments through wallet management and blockchain-based escrow.

Users can sign in with Google, create a wallet, manage USDC payments, and create secure escrow transactions powered by smart contracts on Arc Testnet.

## 🌐 Live Demo

https://vaultpay-beta.vercel.app

## 🎥 Demo Video

(Add your demo video link here)

---

## ✨ Features

### 🔐 Authentication

* Google login with Clerk
* Secure user onboarding
* Seamless Web3 user experience without requiring seed phrases

### 👛 Wallet Management

* Automatically create VaultPay wallet
* Securely store wallet information
* Receive USDC payments
* View wallet address and balance

### 💵 USDC Payments

* Send USDC transactions
* Track transaction history
* View blockchain transaction details
* Support Arc Testnet USDC payments

### 🤝 Escrow System

* Create escrow deals
* Lock payments securely through smart contracts
* Complete transactions after agreement
* Refund transactions when needed
* Track escrow status

---

## 🏗 Architecture

VaultPay combines Web2 authentication with Web3 infrastructure:

```
User
 │
 ▼
Google Login (Clerk)
 │
 ▼
VaultPay Dashboard
 │
 ├── Embedded Wallet Creation
 │
 ├── USDC Management
 │
 └── Escrow Transactions
          │
          ▼
   Smart Contract
          │
          ▼
     Arc Testnet
```

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* shadcn/ui

### Authentication

* Clerk

### Database

* PostgreSQL
* Prisma ORM

### Blockchain

* Arc Testnet
* Solidity Smart Contract
* Wagmi
* Viem

### Deployment

* Vercel
* GitHub

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/tongkhanhlinhdlk-droid/VaultPay.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔗 Network Information

**Network:** Arc Testnet

**Purpose:**
VaultPay uses Arc Testnet to process USDC payments and execute escrow transactions through smart contracts.

---

## 📌 Project Status

VaultPay is an MVP demonstrating:

* Embedded wallet creation
* USDC payment flow
* Smart contract escrow
* Web3 payment infrastructure

Built for Web3 builders and decentralized payment experiences.
