// app.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight;

// Game variables
let assets = [];
let hierarchy = [];
let gameObjects = [];

// Asset import
document.getElementById('importAssets').addEventListener('change', (event) => {
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                assets.push(img);
                updateAssetList();
            };
        };
        reader.readAsDataURL(file);
    });
});

// Update asset list
function updateAssetList() {
    const assetList = document.getElementById('assetList');
    assetList.innerHTML = '';
    assets.forEach((asset, index) => {
        const li = document.createElement('li');
        li.textContent = `Asset ${index + 1}`;
        li.addEventListener('click', () => {
            updateInspector(`Selected Asset ${index + 1}`);
        });
        assetList.appendChild(li);
    });
}

// Save project
document.getElementById('saveProject').addEventListener('click', () => {
    const project = {
        assets: assets.map(img => img.src),
        hierarchy: hierarchy.map(obj => ({ name: obj.name, x: obj.x, y: obj.y })),
    };
    const blob = new Blob([JSON.stringify(project)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.vapourengineproject';
    a.click();
    URL.revokeObjectURL(url);
});

// Load project
document.getElementById('loadProject').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const project = JSON.parse(e.target.result);
        assets = project.assets.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
        hierarchy = project.hierarchy;
        updateAssetList();
        updateHierarchy();
    };
    reader.readAsText(file);
});

// Update hierarchy list
function updateHierarchy() {
    const hierarchyList = document.getElementById('hierarchyList');
    hierarchyList.innerHTML = '';
    hierarchy.forEach((obj, index) => {
        const li = document.createElement('li');
        li.textContent = obj.name;
        li.addEventListener('click', () => {
            updateInspector(`Selected Object ${index + 1}`);
        });
        hierarchyList.appendChild(li);
    });
}

// Update Inspector Panel
function updateInspector(content) {
    const inspectorContent = document.getElementById('inspectorContent');
    inspectorContent.innerHTML = content;
}

// GameObject class
class GameObject {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

// Example for adding game objects
document.getElementById('gameCanvas').addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const gameObject = new GameObject(`Object ${gameObjects.length + 1}`, x, y);
    gameObjects.push(gameObject);
    hierarchy.push(gameObject);
    updateHierarchy();
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(obj => obj.draw(ctx));
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
