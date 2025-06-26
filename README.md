# Echo – Social Media App

A lightweight, modern social platform built with **Next.js 15**, **Prisma**, **TailwindCSS**, and **Clerk**. Users can create posts, share stories, update profiles, and more — all in a responsive and real-time environment.

## Live Demo

[Visit the Live App](https://echo-two-sigma.vercel.app)

[View it on GitHub](https://github.com/DeltaT71/Echo)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & ORM**:
  - PostgreSQL (via Supabase)
  - Prisma
- **Authentication**: Clerk
- **Styling**: TailwindCSS
- **Deployment**: Vercel
- **Image Uploads**: Cloudinary
- **Type Checking**: TypeScript
- **State Management**: Server Components + React Hooks

## Features

- User authentication powered by Clerk (sign up/login)
- Story creation and expiration (24h lifecycle)
- Post creation, likes, and interactions
- Profile page with user info and posts
- Mobile-responsive UI
- Webhook integration (e.g. Clerk user.created / updated)
- Type-safe backend with Prisma and strict TypeScript

## Local Development

### 1. Clone the repo

```bash
git clone https://github.com/DeltaT71/Echo
cd echo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file based on `.env.example`, and configure your:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

DATABASE_URL=

CLERK_WEBHOOK_SIGNING_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

## Deployment

This app is deployed on [Vercel](https://vercel.com). Prisma client generation is handled during the build step.

If you're self-hosting or running locally, run:

```bash
npx prisma generate
```

## What I have learned

- Building with the App Router in Next.js 15
- Working with Prisma and relational schemas (one-to-many)
- Auth integration with Clerk (including webhooks)
- Connecting Supabase with Prisma
- Responsive UI development with TailwindCSS
- Managing types and async logic in TypeScript
- Handling image uploads via Cloudinary
- Debugging async code
- Webhooks using ngrok
- State management using React Hooks and Server Actions
- Working with optimistic UI updates
- Mistakes like pushing secrets... and how to fix them
- How to write a readme
- The value of commenting your code

## Known Issues

- Webhook retry/error handling is minimal
- No image validation on uploads
- Stories can be posted, but not viewed
- Search function is not implemented
- Mobile nav menu is non-functional
- Many UI buttons are placeholders

## Screenshots from the app

- Main Feed Authenticated:

![](/public/readme-assets/Pasted%20image%2020250626183054.png)

- Main feed Unauthenticated:

![](/public/readme-assets/Screenshot%202025-06-26%20185859.png)

- User Profile:

![](/public/readme-assets/Pasted%20image%2020250626183638.png)

### Screenshots are taken from the Live Demo please visit it!
