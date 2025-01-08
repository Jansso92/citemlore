const colorCodes = {
    '&0': '#000000', '&1': '#0000AA', '&2': '#00AA00', '&3': '#00AAAA',
    '&4': '#AA0000', '&5': '#AA00AA', '&6': '#FFAA00', '&7': '#AAAAAA',
    '&8': '#555555', '&9': '#5555FF', '&a': '#55FF55', '&b': '#55FFFF',
    '&c': '#FF5555', '&d': '#FF55FF', '&e': '#FFFF55', '&f': '#FFFFFF'
};

const symbols = [
    "❤", "❥", "✔", "✖", "✗", "✘", "❂", "⋆", "✢", "✣", "✤", "✥", "✦",
    // Add the rest of the symbols here
];

// Initialize tooltip preview
const tooltipPreview = document.getElementById("tooltip-preview");
const itemNamePreview = document.getElementById("item-name-preview");
const lorePreview = document.getElementById("lore-preview");

// Item name input
document.getElementById("itemname").addEventListener("input", (e) => {
    itemNamePreview.innerText = e.target.value;
});

// Lore input
const loreInput = document.getElementById("lore");
loreInput.addEventListener("input", (e) => {
    lorePreview.innerText = e.target.value;
    updateLoreButtons();
});

// Update lore buttons dynamically
function updateLoreButtons() {
    const lines = loreInput.value.split("\n");
    const loreButtons = document.getElementById("lore-buttons");
    loreButtons.innerHTML = ""; // Clear existing buttons
    lines.forEach((line, index) => {
        const button = document.createElement("button");
        button.innerText = `Copy Line ${index + 1}`;
        button.addEventListener("click", () => copyLine(line));
        loreButtons.appendChild(button);
    });
}

// Copy line to clipboard
function copyLine(line) {
    const command = document.getElementById("command").value;
    const fullText = `${command}${line}`;
    navigator.clipboard.writeText(fullText).then(() => alert("Copied: " + fullText));
}

// Add color buttons
const colorButtons = document.getElementById("color-buttons");
Object.entries(colorCodes).forEach(([code, color]) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.innerText = code;
    button.onclick = () => addColor(code);
    colorButtons.appendChild(button);
});

// Add symbol buttons
const symbolContainer = document.getElementById("symbol-container");
symbols.forEach(symbol => {
    const button = document.createElement("button");
    button.innerText = symbol;
    button.onclick = () => addSymbol(symbol);
    symbolContainer.appendChild(button);
});

// Add color or symbol to lore
function addColor(color) {
    loreInput.value += color;
    loreInput.dispatchEvent(new Event("input"));
}

function addSymbol(symbol) {
    loreInput.value += symbol;
    loreInput.dispatchEvent(new Event("input"));
}

// Add modifiers
function addModifier(modifier) {
    loreInput.value += modifier;
    loreInput.dispatchEvent(new Event("input"));
}
