let currentColorCodeType = "&"; // Standard: '&'
let lastGeneratedGradient = "";

// Vorschau aktualisieren
function updateTooltip() {
    const itemName = document.getElementById("itemname").value;
    const itemLore = document.getElementById("itemlore").value;

    document.getElementById("tooltip-name").innerHTML = parseMinecraftColors(itemName);
    document.getElementById("tooltip-lore").innerHTML = parseMinecraftColors(itemLore);
}

// Farben und Formatierungen umwandeln
function parseMinecraftColors(text) {
    const colorMap = {
        '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
        '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
        '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
        'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
    };

    const formatMap = {
        'l': 'font-weight: bold', 'm': 'text-decoration: line-through',
        'n': 'text-decoration: underline', 'o': 'font-style: italic', 'r': ''
    };

    return text.replace(/([&§])([0-9a-fk-or])/g, (match, code, key) => {
        if (colorMap[key]) {
            return `<span style="color: ${colorMap[key]}">`;
        } else if (formatMap[key]) {
            return `<span style="${formatMap[key]}">`;
        }
        return '</span>';
    }) + '</span>';
}

// Text einfügen
function insertText(text) {
    const loreField = document.getElementById("itemlore");
    loreField.value += text;
    updateTooltip();
}

// Farbcodetyp wechseln
function switchColorCodeType() {
    currentColorCodeType = currentColorCodeType === "&" ? "§" : "&";
    document.getElementById("color-switch").innerHTML = `Wechsel zu: ${currentColorCodeType === "&" ? "§" : "&"}`;
}

// RGB Farbverlauf generieren
function generateGradient() {
    const text = document.getElementById("gradient-text").value;
    const startColor = document.getElementById("start-color").value;
    const endColor = document.getElementById("end-color").value;

    lastGeneratedGradient = calculateGradient(text, startColor, endColor);
    alert("Gradient generiert! Vorschau in Kürze.");
}

function calculateGradient(text, startColor, endColor) {
    const steps = text.length;
    const gradient = [];
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const color = interpolateColor(startColor, endColor, ratio);
        gradient.push(`${currentColorCodeType}#${color}`);
    }
    return gradient.join("");
}

function interpolateColor(start, end, ratio) {
    const hexToRgb = (hex) => hex.match(/.{1,2}/g).map((x) => parseInt(x, 16));
    const rgbToHex = (rgb) => rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
    const startRgb = hexToRgb(start.slice(1));
    const endRgb = hexToRgb(end.slice(1));
    const interpolated = startRgb.map((start, i) => Math.round(start + ratio * (endRgb[i] - start)));
    return rgbToHex(interpolated);
}

function insertGradient() {
    insertText(lastGeneratedGradient);
}

// Gradient exportieren/importieren
function exportGradient() {
    const blob = new Blob([lastGeneratedGradient], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gradient.txt";
    link.click();
}

function importGradient() {
    const fileInput = document.getElementById("import-file");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById("itemlore").value += reader.result;
        updateTooltip();
    };
    reader.readAsText(file);
}
