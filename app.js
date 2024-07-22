// app.js

// Initialize panels
document.addEventListener('DOMContentLoaded', () => {
    // Example data
    const assets = ['Asset1', 'Asset2', 'Asset3'];
    const hierarchy = ['Object1', 'Object2', 'Object3'];

    // Populate Asset Panel
    const assetList = document.getElementById('assetList');
    assets.forEach(asset => {
        const li = document.createElement('li');
        li.textContent = asset;
        li.addEventListener('click', () => {
            updateInspector(`Selected Asset: ${asset}`);
        });
        assetList.appendChild(li);
    });

    // Populate Hierarchy Panel
    const hierarchyList = document.getElementById('hierarchyList');
    hierarchy.forEach(obj => {
        const li = document.createElement('li');
        li.textContent = obj;
        li.addEventListener('click', () => {
            updateInspector(`Selected Object: ${obj}`);
        });
        hierarchyList.appendChild(li);
    });

    // Update Inspector Panel
    function updateInspector(content) {
        const inspectorContent = document.getElementById('inspectorContent');
        inspectorContent.innerHTML = content;
    }
});
