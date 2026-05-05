const state = {
    profile: null,
    activeProjectCategory: "All",
    activeSkillIndex: 0,
    darkMode: false,
    projectAnimationId: null,
};

const selectors = {
    heroMeta: document.querySelector("#heroMeta"),
    statsGrid: document.querySelector("#statsGrid"),
    projectFilters: document.querySelector("#projectFilters"),
    projectGrid: document.querySelector("#projectGrid"),
    skillTabs: document.querySelector("#skillTabs"),
    skillPanel: document.querySelector("#skillPanel"),
    experienceTimeline: document.querySelector("#experienceTimeline"),
    researchGrid: document.querySelector("#researchGrid"),
    educationGrid: document.querySelector("#educationGrid"),
    certificateTrack: document.querySelector("#certificateTrack"),
    contactActions: document.querySelector("#contactActions"),
    modeToggle: document.querySelector("#modeToggle"),
};

async function loadProfile() {
    const response = await fetch("/api/profile");
    if (!response.ok) {
        throw new Error("Profile data could not be loaded.");
    }
    state.profile = await response.json();
    renderPortfolio();
    startRobotCanvas();
}

function renderPortfolio() {
    renderHeroMeta();
    renderStats();
    renderProjects();
    renderSkills();
    renderExperience();
    renderResearch();
    renderEducation();
    renderCertificates();
    renderContact();
}

function renderHeroMeta() {
    const { role, location, email } = state.profile;
    selectors.heroMeta.innerHTML = [
        ["Role", role],
        ["Base", location],
        ["Email", email],
    ]
        .map(([label, value]) => `
            <div class="meta-item">
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
        `)
        .join("");
}

function renderStats() {
    selectors.statsGrid.innerHTML = state.profile.stats
        .map((stat) => `
            <article class="stat-card">
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
            </article>
        `)
        .join("");
}

function renderProjects() {
    const categories = ["All", ...new Set(state.profile.projects.map((project) => project.category))];

    selectors.projectFilters.innerHTML = categories
        .map((category) => `
            <button
                class="${category === state.activeProjectCategory ? "is-active" : ""}"
                type="button"
                data-category="${category}"
            >
                ${category}
            </button>
        `)
        .join("");

    selectors.projectFilters.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            state.activeProjectCategory = button.dataset.category;
            renderProjects();
        });
    });

    const visibleProjects = state.profile.projects.filter((project) => {
        return state.activeProjectCategory === "All" || project.category === state.activeProjectCategory;
    });

    selectors.projectGrid.innerHTML = visibleProjects
        .map((project, index) => `
            <article class="project-card">
                <canvas class="project-canvas" width="460" height="260" data-visual="${project.visual}" data-index="${index}"></canvas>
                <div class="project-content">
                    <div class="project-kicker">
                        <span>${project.type}</span>
                        <span>${project.category}</span>
                    </div>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <strong>${project.impact}</strong>
                    <div class="tag-list">
                        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
                    </div>
                </div>
            </article>
        `)
        .join("");

    startProjectCanvases();
}

function renderSkills() {
    selectors.skillTabs.innerHTML = state.profile.skills
        .map((skill, index) => `
            <button class="${index === state.activeSkillIndex ? "is-active" : ""}" type="button" data-index="${index}">
                ${skill.domain}
            </button>
        `)
        .join("");

    selectors.skillTabs.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            state.activeSkillIndex = Number(button.dataset.index);
            renderSkills();
        });
    });

    const activeSkill = state.profile.skills[state.activeSkillIndex];
    selectors.skillPanel.innerHTML = `
        <div class="skill-signal" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="skill-copy">
            <h3>${activeSkill.domain}</h3>
            <p class="skill-focus">${activeSkill.focus}</p>
            <div class="skill-proof-grid">
                <article>
                    <span>Portfolio Proof</span>
                    <strong>${activeSkill.proof}</strong>
                </article>
                <article>
                    <span>Engineering Output</span>
                    <strong>${activeSkill.output}</strong>
                </article>
            </div>
            <div class="skill-list">
                ${activeSkill.items.map((item) => `<span>${item}</span>`).join("")}
            </div>
        </div>
    `;
}

function renderExperience() {
    selectors.experienceTimeline.innerHTML = state.profile.experience
        .map((item) => `
            <article class="timeline-item">
                <div class="timeline-stamp">
                    <span>${item.period}</span>
                </div>
                <div class="timeline-copy">
                    <p>${item.organization}</p>
                    <h3>${item.title}</h3>
                    <strong>${item.focus}</strong>
                    <ul>
                        ${item.details.map((detail) => `<li>${detail}</li>`).join("")}
                    </ul>
                </div>
            </article>
        `)
        .join("");
}

function renderResearch() {
    selectors.researchGrid.innerHTML = state.profile.research
        .map((item) => `
            <article class="research-card">
                <span>${item.kind}</span>
                <h3>${item.title}</h3>
                <strong>${item.status}</strong>
                <p>${item.detail}</p>
            </article>
        `)
        .join("");
}

function renderEducation() {
    selectors.educationGrid.innerHTML = state.profile.education
        .map((item) => `
            <article class="education-card">
                <span>${item.period}</span>
                <h3>${item.school}</h3>
                <p>${item.program}</p>
                <strong>${item.location}</strong>
            </article>
        `)
        .join("");
}

function renderCertificates() {
    selectors.certificateTrack.innerHTML = state.profile.certificates
        .map((certificate) => `<span>${certificate}</span>`)
        .join("");
}

function renderContact() {
    const cvUrl = document.body.dataset.cvUrl;
    const { email, linkedin, phone } = state.profile;

    selectors.contactActions.innerHTML = `
        <a class="primary-action" href="mailto:${email}">Email</a>
        <a class="secondary-action" href="${linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
        <a class="secondary-action" href="${cvUrl}" download>Download CV</a>
        <span class="phone-pill">${phone}</span>
    `;
}

function startRobotCanvas() {
    const canvas = document.querySelector("#robotCanvas");
    const ctx = canvas.getContext("2d");
    let frame = 0;

    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        frame += 0.012;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = getCssColor("--canvas-bg");
        ctx.fillRect(0, 0, width, height);

        drawGrid(ctx, width, height, frame);
        drawDockingPath(ctx, width, height, frame);
        drawRobot(ctx, width * 0.5 + Math.sin(frame * 1.8) * 34, height * 0.48 + Math.cos(frame) * 18, frame);
        drawDock(ctx, width, height, frame);

        requestAnimationFrame(draw);
    }

    draw();
}

function drawGrid(ctx, width, height, frame) {
    ctx.save();
    ctx.strokeStyle = getCssColor("--canvas-grid");
    ctx.lineWidth = 1;

    for (let x = 40; x < width; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(frame + x) * 2, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = 40; y < height; y += 44) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.cos(frame + y) * 2);
        ctx.stroke();
    }

    ctx.restore();
}

function drawDockingPath(ctx, width, height, frame) {
    ctx.save();
    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 4;
    ctx.setLineDash([14, 18]);
    ctx.lineDashOffset = -frame * 90;
    ctx.beginPath();
    ctx.moveTo(width * 0.16, height * 0.76);
    ctx.bezierCurveTo(width * 0.24, height * 0.2, width * 0.75, height * 0.23, width * 0.82, height * 0.66);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = getCssColor("--hot");
    for (let i = 0; i < 5; i += 1) {
        const phase = frame * 2 + i * 1.25;
        const x = width * (0.22 + i * 0.13) + Math.sin(phase) * 11;
        const y = height * (0.34 + Math.sin(i) * 0.12) + Math.cos(phase) * 10;
        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(phase) * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawRobot(ctx, x, y, frame) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(frame) * 0.08);

    ctx.fillStyle = getCssColor("--robot-body");
    roundRect(ctx, -92, -68, 184, 136, 24);
    ctx.fill();

    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 5;
    ctx.stroke();

    const wheelPositions = [
        [-96, -58, -0.6],
        [96, -58, 0.6],
        [-96, 58, 0.6],
        [96, 58, -0.6],
    ];

    wheelPositions.forEach(([wx, wy, rotation]) => {
        ctx.save();
        ctx.translate(wx, wy);
        ctx.rotate(rotation + frame * 3);
        ctx.fillStyle = getCssColor("--wheel");
        roundRect(ctx, -11, -31, 22, 62, 8);
        ctx.fill();
        ctx.restore();
    });

    ctx.fillStyle = getCssColor("--accent");
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = getCssColor("--paper");
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = getCssColor("--hot");
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(0, 0, 70 + i * 18 + Math.sin(frame * 3 + i) * 4, 0.2, Math.PI - 0.2);
        ctx.stroke();
    }

    ctx.restore();
}

function drawDock(ctx, width, height, frame) {
    ctx.save();
    ctx.translate(width * 0.82, height * 0.66);
    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 4;
    ctx.fillStyle = getCssColor("--paper");
    roundRect(ctx, -74, -38, 148, 76, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = getCssColor("--green");
    for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.arc(-42 + i * 28, -2, 5 + Math.sin(frame * 4 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function startProjectCanvases() {
    if (state.projectAnimationId) {
        cancelAnimationFrame(state.projectAnimationId);
    }

    let frame = 0;

    function animateProjects() {
        frame += 0.018;
        drawProjectCanvases(frame);
        state.projectAnimationId = requestAnimationFrame(animateProjects);
    }

    animateProjects();
}

function drawProjectCanvases(frame = 0) {
    document.querySelectorAll(".project-canvas").forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        const visual = canvas.dataset.visual;
        const index = Number(canvas.dataset.index);
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = getCssColor("--canvas-bg");
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = getCssColor("--canvas-grid");
        ctx.lineWidth = 1;
        ctx.setLineDash([]);

        for (let x = 28; x < width; x += 34) {
            ctx.beginPath();
            ctx.moveTo(x + Math.sin(frame + index) * 2, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 24; y < height; y += 34) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y + Math.cos(frame + index) * 2);
            ctx.stroke();
        }

        const drawMap = {
            docking: drawMiniDocking,
            pipe: drawMiniPipe,
            kiosk: drawMiniKiosk,
            quadruped: drawMiniQuadruped,
            navigation: drawMiniNavigation,
            arm: drawMiniArm,
            vision: drawMiniVision,
        };

        drawMap[visual](ctx, width, height, index, frame);
    });
}

function drawMiniDocking(ctx, width, height, index, frame) {
    const pulse = Math.sin(frame * 3 + index);
    const robotX = width * 0.27 + Math.sin(frame * 1.8 + index) * 24;
    const robotY = height * 0.55 + Math.cos(frame * 1.4 + index) * 9;

    ctx.save();
    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 12]);
    ctx.lineDashOffset = -frame * 80;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.72);
    ctx.bezierCurveTo(width * 0.34, height * 0.18, width * 0.64, height * 0.24, width * 0.78, height * 0.52);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(width * 0.36, height * 0.54, 52 + pulse * 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = getCssColor("--hot");
    roundRect(ctx, width * 0.62, height * 0.36, 88, 74, 8);
    ctx.fill();

    ctx.fillStyle = getCssColor("--ink");
    roundRect(ctx, robotX, robotY, 54, 44, 8);
    ctx.fill();

    ctx.fillStyle = getCssColor("--green");
    for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(width * 0.66 + i * 24, height * 0.5, 5 + Math.sin(frame * 4 + i) * 1.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawMiniPipe(ctx, width, height, index, frame) {
    const angle = frame * 1.6 + index;
    const roverX = width * 0.5 + Math.cos(angle) * 56;
    const roverY = height * 0.5 + Math.sin(angle) * 56;

    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, 78, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, 46 + Math.sin(frame * 2) * 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = getCssColor("--robot-body");
    ctx.beginPath();
    ctx.arc(roverX, roverY, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = getCssColor("--hot");
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, 4 + Math.sin(frame * 5) * 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawMiniKiosk(ctx, width, height, index, frame) {
    const scanY = height * 0.28 + ((frame * 36 + index * 20) % 48);

    ctx.fillStyle = getCssColor("--paper");
    roundRect(ctx, width * 0.34, height * 0.16, 132, 168, 8);
    ctx.fill();

    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 3;
    roundRect(ctx, width * 0.34, height * 0.16, 132, 168, 8);
    ctx.stroke();

    ctx.fillStyle = getCssColor("--accent");
    ctx.fillRect(width * 0.39, height * 0.25, 88, 48);

    ctx.fillStyle = colorWithAlpha("--paper", 0.72);
    ctx.fillRect(width * 0.39, scanY, 88, 3);

    ctx.fillStyle = getCssColor("--green");
    ctx.fillRect(width * 0.43, height * 0.55, 52, 14);

    ctx.strokeStyle = getCssColor("--hot");
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.42, 28 + i * 18 + Math.sin(frame * 2 + i) * 3, -0.8, 0.8);
        ctx.stroke();
    }
}

function drawMiniQuadruped(ctx, width, height, index, frame) {
    const bob = Math.sin(frame * 6 + index) * 5;

    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 8;
    roundRect(ctx, width * 0.35, height * 0.36 + bob, 120, 42, 8);
    ctx.stroke();

    for (let i = 0; i < 4; i += 1) {
        const x = width * 0.38 + i * 34;
        const stride = Math.sin(frame * 8 + i * 1.7) * 18;
        ctx.beginPath();
        ctx.moveTo(x, height * 0.52 + bob);
        ctx.lineTo(x + (i % 2 ? 16 : -16) + stride, height * 0.76);
        ctx.stroke();
    }

    ctx.fillStyle = getCssColor("--hot");
    ctx.beginPath();
    ctx.arc(width * 0.68, height * 0.36 + bob, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.78);
    ctx.lineTo(width * 0.86, height * 0.78);
    ctx.stroke();
}

function drawMiniNavigation(ctx, width, height, index, frame) {
    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 14]);
    ctx.lineDashOffset = -frame * 90;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.72);
    ctx.bezierCurveTo(width * 0.4, height * 0.2, width * 0.62, height * 0.82, width * 0.83, height * 0.3);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = getCssColor("--green");
    for (let i = 0; i < 7; i += 1) {
        const pulse = 1 + Math.sin(frame * 4 + i + index) * 0.4;
        ctx.beginPath();
        ctx.arc(width * (0.22 + i * 0.1), height * (0.36 + Math.sin(i) * 0.18), 6 * pulse, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = getCssColor("--hot");
    ctx.beginPath();
    ctx.arc(width * (0.2 + ((frame * 0.15 + index * 0.1) % 0.62)), height * 0.55, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawMiniArm(ctx, width, height, index, frame) {
    const shoulder = Math.sin(frame * 2.2 + index) * 18;
    const elbow = Math.cos(frame * 2.7 + index) * 20;
    const base = { x: width * 0.25, y: height * 0.76 };
    const jointA = { x: width * 0.42, y: height * 0.48 + shoulder };
    const jointB = { x: width * 0.62, y: height * 0.38 + elbow };
    const claw = { x: width * 0.74, y: height * 0.24 + shoulder * 0.25 };

    ctx.strokeStyle = getCssColor("--ink");
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(jointA.x, jointA.y);
    ctx.lineTo(jointB.x, jointB.y);
    ctx.lineTo(claw.x, claw.y);
    ctx.stroke();

    ctx.fillStyle = getCssColor("--accent");
    [base, jointA, jointB].forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 14, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.strokeStyle = getCssColor("--hot");
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(claw.x, claw.y);
    ctx.lineTo(claw.x + 20, claw.y - 10 - Math.sin(frame * 4) * 6);
    ctx.moveTo(claw.x, claw.y);
    ctx.lineTo(claw.x + 20, claw.y + 10 + Math.sin(frame * 4) * 6);
    ctx.stroke();
}

function drawMiniVision(ctx, width, height, index, frame) {
    const targetX = width * 0.4 + Math.sin(frame * 2 + index) * 22;
    const targetY = height * 0.42 + Math.cos(frame * 1.5 + index) * 12;
    const circleX = width * 0.64 + Math.cos(frame * 1.8 + index) * 20;
    const circleY = height * 0.48 + Math.sin(frame * 2.4 + index) * 12;

    ctx.strokeStyle = getCssColor("--accent");
    ctx.lineWidth = 5;
    ctx.strokeRect(width * 0.3, height * 0.24, 168, 118);

    ctx.strokeStyle = getCssColor("--hot");
    ctx.strokeRect(targetX, targetY, 54, 42);

    ctx.strokeStyle = getCssColor("--green");
    ctx.beginPath();
    ctx.arc(circleX, circleY, 26 + Math.sin(frame * 4) * 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = colorWithAlpha("--paper", 0.65);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.3, height * (0.3 + ((frame * 0.18) % 0.34)));
    ctx.lineTo(width * 0.665, height * (0.3 + ((frame * 0.18) % 0.34)));
    ctx.stroke();
}

function roundRect(ctx, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + safeRadius, y);
    ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
    ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
    ctx.arcTo(x, y + height, x, y, safeRadius);
    ctx.arcTo(x, y, x + width, y, safeRadius);
    ctx.closePath();
}

function getCssColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function colorWithAlpha(name, alpha) {
    const color = getCssColor(name);
    if (color.startsWith("#")) {
        const hex = color.slice(1);
        const value = hex.length === 3
            ? hex.split("").map((part) => part + part).join("")
            : hex;
        const red = parseInt(value.slice(0, 2), 16);
        const green = parseInt(value.slice(2, 4), 16);
        const blue = parseInt(value.slice(4, 6), 16);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    return color;
}

selectors.modeToggle.addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle("dark-mode", state.darkMode);
    selectors.modeToggle.textContent = state.darkMode ? "Light" : "Mode";
});

loadProfile().catch((error) => {
    document.body.innerHTML = `
        <main class="load-error">
            <h1>Portfolio data unavailable</h1>
            <p>${error.message}</p>
        </main>
    `;
});
