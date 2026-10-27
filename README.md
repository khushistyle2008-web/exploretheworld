# Pattern Lab

A small interactive learning website about printing number patterns with nested loops in C. Choose one of four patterns, adjust its size, view the output, and copy the corresponding C program.

## Run locally

Open `index.html` in a modern web browser. No installation or build step is needed.

## Publish with GitHub Pages

1. Create a new empty repository on GitHub.
2. Open PowerShell in this project folder.
3. Run these commands, replacing `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub details:

```powershell
git init
git add index.html style.css script.js README.md
git commit -m "Create Pattern Lab C learning website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

4. On GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. GitHub Pages will show the published website link in the Pages settings after it deploys.

## Customize

Edit the title, descriptions, or learning notes in `index.html`. Pattern output and matching C examples are generated in `script.js`; visual styling is in `style.css`.
