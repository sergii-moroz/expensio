
# Project Overview

This project follows the tutorial from [TubeGuruji on YouTube](https://www.youtube.com/watch?v=pQoHvx0SoiA).

## Built with

- Next.js for the frontend,
- Tailwind CSS for styling,
- Dirzzle ORM and Neon for managing Postgresql database.

## Getting Started

To get the development server running, follow these steps:

1. Install the necessary dependencies (if you haven't already):

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## Environment Setup

To configure your environment, follow these steps:

1. Rename the file ```_env.local_``` to ```.env.local```.

2. Provide the necessary API keys and database URL in the .env.local file:

```bash
 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk...
CLERK_SECRET_KEY=sk...
NEXT_PUBLIC_DATABASE_URL=postgresql://...
```

## Demo

This project is deployed on [Vercel]().

## Screenshots

Take a look at some snapshots of the dashboard:

![Dashboard-1](./public/Dashboard-1)
![Dashboard-2](./public/Dashboard-2)
![Dashboard-3](./public/Dashboard-3)
