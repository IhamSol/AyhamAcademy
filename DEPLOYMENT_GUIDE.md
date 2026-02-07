# 🚀 Deployment Guide for Your Online Course

This guide will help you set up and deploy your online course website even if you're not a developer.

## 1. Prerequisites
- A **Google Account** (for authentication and hosting videos)
- A **GitHub Account** (to store your code)
- A **Vercel Account** (to host your website for free)

## 2. Google Drive Setup (Videos)
1. Upload your videos to a folder in Google Drive.
2. Right-click each video -> **Share** -> Change access to **"Anyone with the link"**.
3. Open the video, click the three dots (top right) -> **Open in new window**.
4. In the new window, click the three dots -> **Embed item**.
5. Copy the URL inside the `src="..."` attribute. It should look like: `https://drive.google.com/file/d/YOUR_VIDEO_ID/preview`.
6. Put these URLs into `src/data/courseData.json`.

## 3. Google OAuth Setup (Login)
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Go to **APIs & Services > OAuth consent screen**. Choose "External" and fill in the app name and your email.
4. Go to **APIs & Services > Credentials**.
5. Click **Create Credentials > OAuth client ID**.
6. Select **Web application**.
7. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google` (for testing)
   - `https://your-app-name.vercel.app/api/auth/callback/google` (replace with your Vercel URL later)
8. Copy your **Client ID** and **Client Secret**.

## 4. Deployment to Vercel
1. Upload this project to a new repository on your GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add the following:
   - `GOOGLE_CLIENT_ID`: (Your Google Client ID)
   - `GOOGLE_CLIENT_SECRET`: (Your Google Client Secret)
   - `NEXTAUTH_SECRET`: (Any random long string, e.g., `y0ur_rand0m_s3cr3t_123`)
   - `NEXTAUTH_URL`: `https://your-app-name.vercel.app`
5. Click **Deploy**.

## 5. Managing Access
- To add or remove students, simply edit the `src/data/whitelist.json` file in your GitHub repository.
- To add or remove course content, edit the `src/data/courseData.json` file.
- Vercel will automatically update your website whenever you save changes to these files on GitHub.

## 6. Video Controls
The Google Drive player includes built-in controls for:
- Play/Pause
- Volume
- Fullscreen
- Playback speed (click the gear icon ⚙️ in the player)
- Quality settings

---
**Note:** For the best experience, ensure your videos are fully processed by Google Drive before sharing the links.
