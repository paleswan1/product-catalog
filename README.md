# 🚀 React + TypeScript Starter Template

A modern, production-ready **React + TypeScript** starter template pre-configured with:

- **Vite** for fast development
- **TailwindCSS** for styling
- **shadcn/ui** for components
- **React Query** for server state
- **Redux Toolkit** for client state
- **React Hook Form + Zod** for forms & validation
- **Axios** for API calls
- **Lucide React** for icons
- **JS Cookie** for cookie handling
- **React Auth Kit** for authentication
- **ESLint + Prettier + Husky** for linting, formatting, and pre-commit hooks

---

## 📦 Tech Stack

| Category       | Library                      |
| -------------- | ---------------------------- |
| Framework      | React + TypeScript           |
| Dev Server     | Vite                         |
| Styling        | TailwindCSS, shadcn/ui       |
| Server State   | React Query                  |
| Client State   | Redux Toolkit                |
| Forms          | React Hook Form + Zod        |
| HTTP           | Axios                        |
| Icons          | Lucide React                 |
| Authentication | React Auth Kit               |
| Utilities      | html-react-parser, js-cookie |
| Formatting     | ESLint, Prettier             |
| Git Hooks      | Husky, lint-staged           |

---

## 📁 Folder Structure

```
src/
├── assets/ # Assets like images and videos
├── components/ # Reusable UI components
├── constants/ # Query constants and enums
├── hooks/ # Custom hooks
├── pages/ # Page-level components
├── infrastructure/ # API handlers(queries, services, repositories, types)
├── lib/ # Configs (React Query, Axios, Auth, redux)
├── styles/ # Custom css classes
├── utils/ # Helper utilities
├── App.tsx
└── main.tsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone <repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Initialize shadcn/ui

```sh
npx shadcn-ui init
```

### 4️⃣ Start Development Server

```sh
npm run dev
```

## 🧪 Available Scripts

| Script         | Description              |
| -------------- | ------------------------ |
| npm run dev    | Start development server |
| npm run build  | Build for production     |
| npm run lint   | Run ESLint               |
| npm run format | Format using Prettier    |
| npm run check  | Lint + Format            |

## 🧼 Pre-Commit Hooks (Husky)

### Install Husky

```sh
npm run prepare
```

### Pre-commit hook

```sh
npx husky add .husky/pre-commit "npm run check"
```

### lint-staged config (in package.json)

```sh
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"]
}
```
