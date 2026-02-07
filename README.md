# Simple Online Course Platform

A complete, ready-to-run Next.js project for hosting a paid video course using Google Drive and Google OAuth.

## Features
- **Next.js 14** with App Router
- **Tailwind CSS** for responsive styling
- **NextAuth.js** with Google Provider
- **Email Whitelisting**: Only authorized emails can access paid content
- **Free/Paid Lectures**: Easily mark lectures as free previews or locked content
- **Google Drive Integration**: Seamlessly embed view-only videos
- **Responsive Design**: Works perfectly on mobile and desktop

## Project Structure
- `src/data/courseData.json`: Manage your course modules and lectures here.
- `src/data/whitelist.json`: List of authorized student emails.
- `src/app/lecture/[id]`: The dynamic video player page.
- `src/middleware.ts`: Handles the security and access control logic.

## Getting Started
1. Clone this repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in your Google credentials.
4. Run `npm run dev` to start the development server.

## Deployment
For a super simple, step-by-step guide on how to deploy this project to Vercel, especially if you are new to GitHub and deployment, please refer to the [ULTRA_DETAILED_DEPLOYMENT_GUIDE.md](./ULTRA_DETAILED_DEPLOYMENT_GUIDE.md) file.
