# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

**BazarDor** is a Bangla-first web app that shows today's market prices of everyday essentials: rice, lentils, oil, vegetables, fish, meat, dairy and spices. You can see how prices changed since yesterday, compare prices across markets in different divisions, and get the lowest, highest and average price of every product.

🔗 **Live Link:** https://bazardor-indol.vercel.app/ <br>
📦 **GitHub Repository:** https://github.com/sakibrafi2002/bazardor

## ✨ Key Features

1. **Live price ticker** — an infinite scrolling strip showing every product's price and change (▲ / ▼ / —) right under the navbar.
2. **Daily risers and fallers** — the top 6 products whose price went up and the top 6 whose price went down today.
3. **Category pages with sorting** — browse each category and sort by default order, price low to high, or price high to low. Sorting uses real numeric values, so Bengali numerals (৯৯, ১৪৮) are ordered correctly.
4. **Product details with market comparison** — lowest, highest and average price, plus a market-by-market table that becomes stacked cards on mobile.
5. **Secure authentication** — email/password, Google and GitHub login using Better Auth, with toast notifications for every success and error.
6. **Protected routes** — product details and profile pages require login; after signing in, users return to the page they originally wanted.
7. **Profile management** — view account info and update your name.
8. **Polished UX** — skeleton loaders, friendly 404 pages, error boundaries and a fully responsive layout for mobile, tablet and desktop.
9. **Bangla-first interface** — Bengali digits, Bangla dates and Bangla unit labels throughout.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) (App Router) | UI, routing, server components |
| TypeScript | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling and responsiveness |
| [HeroUI](https://www.heroui.com) | UI component library |
| [Better Auth](https://better-auth.com) | Authentication (email/password, Google, GitHub) |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database for users and sessions |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons |
| [Vercel](https://vercel.com) | Deployment |

## 🗺️ Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home: hero, risers, fallers, all products | Public |
| `/category/[slug]` | Products of one category with sorting | Public |
| `/product/[slug]` | Product details and market prices | 🔒 Login required |
| `/signin`, `/signup` | Authentication pages | Public |
| `/profile` | Account information | 🔒 Login required |
| `/profile/update` | Update your name | 🔒 Login required |

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd bazardor

# 2. Install dependencies
npm install

# 3. Create your environment file and fill in the values
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [`.env.example`](./.env.example). You need a MongoDB Atlas connection string and a Better Auth secret. Google and GitHub keys are optional: each social login button works only when its keys are set.

## 📡 Data Source

Prices come from the BazarDor API:

- `GET /products`, `GET /products?category=chal`, `GET /products/1`
- `GET /categories`, `GET /categories/chal`

## 📁 Project Structure

```
src/
├── app/            # Pages and routes (App Router)
├── components/     # Reusable UI (layout, product, auth, profile)
├── lib/            # API layer, formatting helpers, auth config
├── types/          # TypeScript types
└── assets/         # Static images
```

## 📄 License

Made for learning purposes.
