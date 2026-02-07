# 🚀 Your Super Simple Guide to Launching Your Online Course Website

This guide is made for *everyone*, even if you've never touched code before! We'll go step-by-step to get your online course website up and running.

## What You'll Need (The Basics)

Before we start, make sure you have these free accounts:

1.  **Google Account**: You probably already have one! This is for your videos and for people to log in.
2.  **GitHub Account**: This is like a special online folder where your website's files will live. It helps us keep track of changes.
    *   If you don't have one, go to [github.com](https://github.com/) and click "Sign up". Follow the easy steps.
3.  **Vercel Account**: This is the service that will make your website live on the internet, for free!
    *   If you don't have one, go to [vercel.com](https://vercel.com/) and click "Sign Up". Choose to "Continue with GitHub" – this makes things much easier later.

## Part 1: Getting Your Videos Ready on Google Drive

Your course videos are hosted on Google Drive. Here's how to make them ready for your website:

1.  **Upload Your Videos**: Make sure all your course videos are uploaded to your Google Drive.
2.  **Share Each Video**: For *each* video you want on your course:
    *   Right-click on the video file in Google Drive.
    *   Select **"Share"**.
    *   In the sharing window, look for a section that says "General access" or "Get link". It might say "Restricted" initially.
    *   Click on **"Restricted"** and change it to **"Anyone with the link"**.
    *   Make sure the role is set to **"Viewer"** (not editor).
    *   Click **"Done"**.
3.  **Get the Special Video Link (Embed Link)**:
    *   Double-click to open the video in Google Drive.
    *   Once the video is playing (or just open), click the **three vertical dots** (⋮) in the top right corner of the video player.
    *   Select **"Open in new window"**.
    *   In this *new* window, again click the **three vertical dots** (⋮) in the top right corner.
    *   Select **"Embed item..."**.
    *   A small window will pop up with some code. You only need the part that starts with `https://` and ends with `/preview`.
        *   It will look something like this: `<iframe src="**https://drive.google.com/file/d/YOUR_VIDEO_ID/preview**" width="640" height="480" allow="autoplay"></iframe>`
        *   **Copy ONLY the URL inside the `src="..."` part.** (e.g., `https://drive.google.com/file/d/YOUR_VIDEO_ID/preview`)
    *   **Repeat this for ALL your videos** and keep these links handy.

## Part 2: Setting Up Google Login (OAuth)

This allows your students to log in using their Google accounts.

1.  **Go to Google Cloud Console**: Open your web browser and go to [console.cloud.google.com](https://console.cloud.google.com/).
2.  **Create a New Project**: 
    *   At the very top of the page, next to "Google Cloud Platform" (or your current project name), click the **dropdown arrow** (▼).
    *   Click **"New Project"**.
    *   Give your project a name (e.g., "My Online Course Login") and click **"Create"**.
    *   Wait a moment for it to be created, then make sure you **select your new project** from the dropdown at the top.
3.  **Configure Consent Screen**:
    *   On the left-hand menu, find **"APIs & Services"** and click on **"OAuth consent screen"**.
    *   Choose **"External"** and click **"Create"**.
    *   Fill in:
        *   **App name**: (e.g., "My Online Course")
        *   **User support email**: Your email address.
        *   Scroll down and enter your email again for "Developer contact information".
    *   Click **"SAVE AND CONTINUE"**.
    *   On the "Scopes" page, click **"SAVE AND CONTINUE"**.
    *   On the "Test users" page, click **"ADD USERS"** and add your own Google email address. This is important for testing.
    *   Click **"SAVE AND CONTINUE"**.
    *   Review the summary and click **"BACK TO DASHBOARD"**.
4.  **Create Credentials (Client ID & Secret)**:
    *   On the left-hand menu, under "APIs & Services", click on **"Credentials"**.
    *   Click **"+ CREATE CREDENTIALS"** at the top.
    *   Select **"OAuth client ID"**.
    *   For **"Application type"**, choose **"Web application"**.
    *   Give it a **Name** (e.g., "Course Website").
    *   Under **"Authorized JavaScript origins"**, click **"+ ADD URI"** and add:
        *   `http://localhost:3000` (This is for when you test the website on your own computer).
    *   Under **"Authorized redirect URIs"**, click **"+ ADD URI"** and add:
        *   `http://localhost:3000/api/auth/callback/google` (Again, for testing).
        *   **IMPORTANT**: You will need to add another URI here *after* you deploy your website to Vercel. It will look like `https://YOUR-VERCEL-APP-NAME.vercel.app/api/auth/callback/google`. We'll come back to this later.
    *   Click **"CREATE"**.
    *   A window will pop up showing your **Client ID** and **Client Secret**. **Copy both of these down and keep them somewhere safe!** You will need them very soon.
    *   Click **"OK"**.

## Part 3: Preparing Your Website Files

Now we'll get the website files ready on your computer.

1.  **Download the Project Files**: You should have received a `.zip` file containing all the website files. Download it to your computer.
2.  **Unzip the Files**: Find the downloaded `.zip` file (it might be called `course-platform.zip` or similar). Right-click on it and choose "Extract All" or "Unzip". This will create a new folder (e.g., `course-site`).
3.  **Open the `course-site` Folder**.
4.  **Edit `src/data/courseData.json`**: This file tells your website about your course modules and lectures.
    *   Open the `course-site` folder.
    *   Navigate to `src` -> `data`.
    *   Find the file named `courseData.json` and open it with a simple text editor (like Notepad on Windows, TextEdit on Mac, or any code editor if you have one).
    *   You'll see a structure like this:
        ```json
        {
          "title": "Mastering the Craft",
          "description": "The ultimate video-only course for beginners and pros alike.",
          "modules": [
            {
              "id": "m1",
              "title": "Module 1: Introduction",
              "lectures": [
                {
                  "id": "intro-1",
                  "title": "Course Overview",
                  "videoUrl": "https://drive.google.com/file/d/1XyZ_SAMPLE_ID_1/preview",
                  "isFree": true
                },
                // ... more lectures
              ]
            }
            // ... more modules
          ]
        }
        ```
    *   **Change `title` and `description`** to match your course.
    *   **Update `videoUrl` for each lecture**: Replace the sample Google Drive video links (`https://drive.google.com/file/d/1XyZ_SAMPLE_ID_1/preview`) with the *special embed links* you copied in Part 1. Make sure to keep the quotes around the link.
    *   **Adjust `isFree`**: Set `"isFree": true` for lectures you want anyone to see without logging in. Set `"isFree": false` for lectures that require login and whitelisting.
    *   You can also change `id` and `title` for modules and lectures. Just make sure each `id` is unique.
    *   **Save the file** after making your changes.
5.  **Edit `src/data/whitelist.json`**: This file lists the email addresses of people who have paid for your course and can access the locked content.
    *   In the same `src/data` folder, open `whitelist.json`.
    *   It will look like this:
        ```json
        [
          "your-email@gmail.com",
          "student1@example.com",
          "student2@example.com"
        ]
        ```
    *   **Replace the example emails** with the actual Google email addresses of your students who have paid for the course. Make sure each email is inside quotes and separated by a comma, like in the example.
    *   **Save the file**.
6.  **Create and Edit `.env.local`**: This file holds your secret Google login details.
    *   In the main `course-site` folder, you'll see a file named `.env.example`.
    *   **Make a copy** of this file and **rename the copy** to `.env.local`.
        *   *Why?* `.env.example` is just a template. `.env.local` is where your actual secrets go, and it's kept private.
    *   Open the newly created `.env.local` file with your text editor.
    *   It will look like this:
        ```
        # NextAuth configuration
        NEXTAUTH_URL=http://localhost:3000
        NEXTAUTH_SECRET=your_random_secret_string_here

        # Google OAuth credentials
        GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        ```
    *   **Replace `your_random_secret_string_here`** with a long, random string of letters and numbers. You can generate one online by searching for "random string generator" or just type a long, complex sentence without spaces.
    *   **Replace `your_google_client_id.apps.googleusercontent.com`** with the **Client ID** you copied from Google Cloud Console in Part 2, Step 4.
    *   **Replace `your_google_client_secret`** with the **Client Secret** you copied from Google Cloud Console in Part 2, Step 4.
    *   **Save the file**.

## Part 4: Uploading Your Website to GitHub

Now we'll put your website files into your GitHub account.

1.  **Go to GitHub**: Open your web browser and go to [github.com](https://github.com/). Log in to your account.
2.  **Create a New Repository**: 
    *   On the left sidebar, click the green **"New"** button (or click your profile picture in the top right, then "Your repositories", then "New").
    *   **Repository name**: Give it a name (e.g., `my-online-course`). Keep it simple, no spaces.
    *   **Description (optional)**: Add a short description.
    *   Choose **"Public"** or **"Private"**. "Public" means anyone can see the code (but not edit it unless you invite them). "Private" means only you and people you invite can see it. For a course website, "Public" is usually fine, as your course content is protected by login, not by hiding the code.
    *   **DO NOT** check "Add a README file", "Add .gitignore", or "Choose a license". Your project already has these.
    *   Click the green **"Create repository"** button.
3.  **Upload Your Files**: After creating the repository, you'll see a page with some instructions. Look for the option that says **"uploading an existing file"** or **"upload files"**.
    *   Click on the link that says **"uploading an existing file"**.
    *   You'll see a drag-and-drop area. Open your `course-site` folder on your computer.
    *   **Select ALL the files and folders** inside `course-site` (but *not* the `course-site` folder itself). You can usually do this by pressing `Ctrl+A` (Windows) or `Cmd+A` (Mac) inside the `course-site` folder.
    *   **Drag and drop all these selected files and folders** into the drag-and-drop area on the GitHub page.
    *   Wait for all the files to upload. This might take a few minutes depending on your internet speed.
    *   Scroll down to the bottom of the page.
    *   Add a short message in the "Commit changes" box (e.g., "Initial website upload").
    *   Click the green **"Commit changes"** button.

## Part 5: Deploying Your Website to Vercel

This is the final step to make your website live!

1.  **Go to Vercel**: Open your web browser and go to [vercel.com](https://vercel.com/). Log in to your account (using GitHub is recommended).
2.  **Add New Project**: 
    *   On your Vercel dashboard, click the **"Add New..."** button, then select **"Project"**.
3.  **Import Your GitHub Project**: 
    *   Vercel will show a list of your GitHub repositories. Find the one you just created (e.g., `my-online-course`).
    *   Click the **"Import"** button next to your repository.
4.  **Configure Project**: 
    *   On the next screen, you'll see project settings. You usually don't need to change much here.
    *   **IMPORTANT: Add Environment Variables**:
        *   Scroll down to the section called **"Environment Variables"**.
        *   You need to add four variables here. These are the secrets you put in your `.env.local` file.
        *   Click **"Add New"** for each one:
            *   **Name**: `GOOGLE_CLIENT_ID`
            *   **Value**: Paste your Google Client ID here (from Part 2, Step 4).
            *   Click **"Add"**.
            *   **Name**: `GOOGLE_CLIENT_SECRET`
            *   **Value**: Paste your Google Client Secret here (from Part 2, Step 4).
            *   Click **"Add"**.
            *   **Name**: `NEXTAUTH_SECRET`
            *   **Value**: Paste the long random string you generated (from Part 3, Step 6).
            *   Click **"Add"**.
            *   **Name**: `NEXTAUTH_URL`
            *   **Value**: This will be the address of your live website. After Vercel deploys, it will give you a URL like `https://your-app-name.vercel.app`. For now, you can leave this blank or put `https://your-app-name.vercel.app` as a placeholder. **You will come back to this after the first deployment.**
5.  **Deploy!**:
    *   Click the **"Deploy"** button.
    *   Vercel will now build and deploy your website. This might take a few minutes. You'll see a progress screen.
    *   Once it's done, you'll see a "Congratulations!" message and a screenshot of your live website. Click **"Continue to Dashboard"**.
6.  **Get Your Live Website URL**: 
    *   On your project dashboard in Vercel, look for the **"Domains"** section. You'll see your live website address (e.g., `https://my-online-course.vercel.app`). **Copy this URL!**
7.  **Update Google OAuth Redirect URI (Final Step!)**:
    *   Go back to the [Google Cloud Console](https://console.cloud.google.com/) where you set up your Google OAuth (Part 2).
    *   Navigate to **"APIs & Services" > "Credentials"**.
    *   Click on the **OAuth 2.0 Client ID** you created earlier (e.g., "Course Website").
    *   Under **"Authorized redirect URIs"**, click **"+ ADD URI"**.
    *   Paste your live Vercel website URL, followed by `/api/auth/callback/google`. 
        *   Example: `https://my-online-course.vercel.app/api/auth/callback/google`
    *   Click **"SAVE"**.

    *   **One more thing for `NEXTAUTH_URL`**: Go back to your Vercel project dashboard. In the "Settings" tab, find "Environment Variables". Edit the `NEXTAUTH_URL` variable and set its value to your live Vercel URL (e.g., `https://my-online-course.vercel.app`). Save the change. Vercel will automatically redeploy your site with this updated setting.

**Congratulations! Your online course website is now live and ready for your students!**

## Part 6: Managing Your Course and Students

Making changes is easy!

*   **To add/remove students**: Edit the `src/data/whitelist.json` file on your computer, then upload the updated file to your GitHub repository (just like you did in Part 4). Vercel will automatically update your live website.
*   **To change course content (videos, titles, free/paid status)**: Edit the `src/data/courseData.json` file on your computer, then upload the updated file to your GitHub repository. Vercel will automatically update your live website.

---

**Important Notes:**

*   **Video Playback Speed**: When a student watches a video, they can click the gear icon (⚙️) in the Google Drive player to change the playback speed.
*   **Troubleshooting**: If something isn't working, double-check all the links and IDs you copied. Typos are the most common issue!
