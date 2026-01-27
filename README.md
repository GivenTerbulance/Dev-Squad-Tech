# Dev Squad Tech - Elite Software Engineering Solutions

A premium, production-ready SaaS platform built with elite engineering standards. This project serves as the flagship digital product for Dev Squad Tech, featuring a professional project hub, sleek UI/UX, and robust backend services.

## 🚀 Built With

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: Custom JWT-based Auth with Middleware
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Email**: Integration ready for transactional emails

## 📦 Project Structure

```bash
Dev-Squad-Tech/
├── startup-web/        # Main Next.js Web Application
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # High-fidelity UI Components
│   ├── features/       # Business Logic & Services
│   ├── lib/            # Shared Utilities (DB, API, Auth)
│   ├── prisma/         # Database Schema & Migrations
│   └── public/         # Static Assets
└── README.md           # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL instance

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/GivenTerbulance/Dev-Squad-Tech.git
    cd Dev-Squad-Tech/startup-web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the `startup-web` directory and add your connection string:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/dev_squad_db"
    JWT_SECRET="your-super-secret-key"
    ```

4.  **Database Migration**:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing

Run the full test suite with:
```bash
npm test
```

## 📄 Documentation

Detailed API documentation can be found in [startup-web/API_REFERENCE.md](file:///c:/Users/admin-thebe/Downloads/dev/Dev-Squad-Tech/startup-web/API_REFERENCE.md).

## 🛡️ License

Private - All rights reserved. Dev Squad Tech.
