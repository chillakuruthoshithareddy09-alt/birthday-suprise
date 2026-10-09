# Our Little Universe — Birthday Website

A responsive, cinematic birthday scrapbook for your best friend. Built with plain HTML, CSS, and JavaScript so it is easy to edit and deploy as a static site.

## What's included

- Password opening screen with accepted date formats: `26 8 2025`, `26 08 2025`, and `26082025`
- Responsive hero, memory wall, birthday wish, apology letter, and closing section
- Eleven included photo slots, with lazy-loaded images and editable captions
- Keyboard focus styles and reduced-motion support
- No build step or framework required
- Ready for GitHub and Render Static Site deployment

## Folder structure

```text
favourite_human_birthday/
├── index.html
├── styles.css
├── script.js
├── memories.js
├── README.md
└── assets/
    └── photos/
        └── (put your own JPG, PNG, or WebP photos here)
```

## Preview locally

### Easiest option
Double-click `index.html` to open it in your browser. Most features work directly from the file.

### Recommended option
If Python is installed:
1. Open a terminal/command prompt in this folder.
2. Run `python -m http.server 8000`
3. Visit `http://localhost:8000`

This local server is only for previewing. The deployed website will have its own public HTTPS URL.

## Add your photographs

1. Copy your photos into `assets/photos/`. Use simple filenames such as `first-memory.jpg` (avoid spaces and unusual characters).
2. Open `memories.js` in a text editor.
3. For a slot, replace `image: ""` with a relative path, for example:

   ```js
   { title: "Where it began", caption: "Our first favourite memory.", image: "assets/photos/first-memory.jpg", alt: "The two of us on our first day out" }
   ```

4. Edit the `title`, `caption`, and `alt` text to fit your memory.
5. Save and refresh the page. To add more slots, duplicate one object inside the `window.MEMORIES` array and update its values.

Use JPG/JPEG, PNG, or WebP. For performance, resize large phone photos to roughly 1600 pixels on the longest side and compress them before uploading. Do not add private images unless you are comfortable with them being publicly accessible.

## Test the password

Accepted inputs include:
- `26 8 2025`
- `26 08 2025`
- `26082025`

The current password gate is **client-side only**. It is a friendly reveal screen, not genuine security. Anyone with access to the deployed source can inspect the JavaScript, and static-hosted images can be accessed directly by URL. Do not use this version to protect sensitive content. For genuine privacy, implement server-side authentication and store photos behind authenticated access.

## Deploy to GitHub + Render

### A. Upload the project to GitHub
1. Sign in to GitHub and create a new repository, for example `our-little-universe`.
2. Keep it public if you want the simplest static deployment workflow. (A private repository can also be connected if your Render account supports access to it.)
3. Upload `index.html`, `styles.css`, `script.js`, `memories.js`, `README.md`, and the `assets` folder. You can use GitHub's web upload interface or Git:
   ```bash
   git init
   git add .
   git commit -m "Create birthday scrapbook"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/our-little-universe.git
   git push -u origin main
   ```
   Replace the example repository URL with your own.

### B. Create a Render Static Site
1. Sign in to Render.
2. Choose **New +** → **Static Site**.
3. Connect GitHub and select your `our-little-universe` repository.
4. Set **Build Command** to blank / none (if the form permits) or leave it empty.
5. Set **Publish Directory** to `.` (the repository root).
6. Click **Deploy Static Site**.
7. Wait for the deploy to finish. Render will provide a public URL ending in `onrender.com` and serve the site over HTTPS.
8. Open that URL on your phone and on a computer. Test the password, incorrect-password message, photos, navigation, and lock button.
9. Share the deployed HTTPS URL with your best friend.

### C. Update it later
Whenever you change `memories.js`, add photos, or update the text, upload/commit the changes to GitHub. Render automatically redeploys from the connected repository.

## Final checks

- [ ] Review the 11 imported photographs and personalise their captions
- [ ] Test correct and incorrect password attempts
- [ ] Check all six images load on mobile and desktop
- [ ] Check that the apology letter is readable on a phone
- [ ] Test the deployed HTTPS link in a private/incognito window
- [ ] Confirm that you are comfortable with all deployed content being public

## Notes

- Google Fonts are loaded from Google Fonts when online; system fallback fonts are included.
- The optional music feature is intentionally omitted because no music file was supplied. If you want music, use a file you have rights to use and add an accessible play/pause control.
- A birthday countdown is omitted because the page is designed as a keepsake and should not display a misleading countdown outside the birthday date.
- The project is static: it does not upload photos through the website. To add images, update the files and redeploy.
# birthday-suprise
# birthday-suprise
