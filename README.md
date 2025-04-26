## express-vercel-postgres-starter

A starter kit to build serverless APIs on Vercel with Express, TypeScript and Drizzle.

## Installation

### 0. Clone this repository and install all dependencies

```sh
git clone https://github.com/savashn/express-vercel-postgres-starter.git
cd express-vercel-postgres-starter
npm install
```

### 1. Add your environment variables

Create a `.env` file in the root directory and add the `POSTGRES_URI` key of your Neon Vercel Postgres to connect your database. Don't forget to add `CORS_ORIGIN` too for your frontend app and `JWT_SECRET` for authentication.

### 2. Install Vercel CLI globaly

```sh
npm i -g vercel
```

### 3. Login to your Vercel account

```sh
vercel login
```

### 4. Finally, RUN:

```sh
vercel dev
```

OR

```sh
npm start
```
