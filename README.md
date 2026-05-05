# Adarsh Anand Karan | Robotics Portfolio

An interactive Flask portfolio for Adarsh Anand Karan, focused on robotics, AI, autonomous systems, simulation, CAD, embedded systems, and computer vision.

The site turns a robotics CV into a dynamic web experience with animated robot visuals, selected project cards, a capability map, experience timeline, research output, certificates, contact links, and a downloadable CV.

## Live Portfolio

Add your deployed Render URL here after deployment:

```text
https://your-render-service-name.onrender.com
```

## Features

- Animated robotics hero section
- Moving project visuals for selected work
- Filterable project gallery
- Capability map with portfolio proof and engineering output
- Experience timeline
- Patent and publication section
- Education and certificates
- Contact actions and downloadable CV
- Responsive layout for desktop and mobile
- Light/dark mode toggle

## Tech Stack

- Python
- Flask
- HTML
- CSS
- JavaScript
- Canvas animations
- Gunicorn for production deployment

## Project Structure

```text
Portfolio/
├── app.py
├── requirements.txt
├── README.md
├── LICENSE
├── .gitignore
├── static/
│   ├── script.js
│   ├── styles.css
│   └── CV_Adarsh_Anand_Karan_Robotics.pdf
└── templates/
    └── index.html
```

## Run Locally

Open PowerShell:

```powershell
cd "C:\Users\Adarsh\Desktop\Portfolio"
python -m pip install -r requirements.txt
python app.py
```

Then open:

```text
http://127.0.0.1:5000/
```

## Deploy On Render

Use these Render settings:

```text
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

After connecting the GitHub repo to Render, every push to the main branch can trigger a redeploy.

## Updating The Portfolio

Most content lives inside `app.py` in the `PROFILE` dictionary.

Common edits:

- Update personal details: `app.py`
- Update projects or skills: `app.py`
- Update layout: `templates/index.html`
- Update animations/interactions: `static/script.js`
- Update visual design: `static/styles.css`
- Replace the CV: `static/CV_Adarsh_Anand_Karan_Robotics.pdf`

After editing:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

Render should redeploy the latest version automatically.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
