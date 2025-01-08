// Vorschau aktualisieren
function updatePreview() {
    const itemName = document.getElementById("itemname").value;
    const lore = document.getElementById("lore").value;
    const preview = document.getElementById("preview");
    preview.innerHTML = formatMinecraftText(itemName + "\n" + lore);
}

// Text in das Lore-Feld einfügen
function insertText(text) {
    const loreField = document.getElementById("lore");
    const cursorPosition = loreField.selectionStart;
    const textBefore = loreField.value.substring(0, cursorPosition);
    const textAfter = loreField.value.substring(cursorPosition);
    loreField.value = textBefore + text + textAfter;
    loreField.focus();
    updatePreview();
}

// Minecraft Text formatieren
function formatMinecraftText(text) {
    return text
        .replace(/&([0-9a-fk-or])/g, "<span class='mc-color-$1'>")
        .replace(/§([0-9a-fk-or])/g, "<span class='mc-color-$1'>")
        .replace(/\n/g, "<br>") + "</span>".repeat((text.match(/&[0-9a-fk-or]/g) || []).length);
}

// RGB Farbverlauf erstellen
function generateRGB() {
    const text = document.getElementById("rgb-text").value;
    const startColor = document.getElementById("start-color").value;
    const endColor = document.getElementById("end-color").value;

    const gradient = createGradient(text, startColor, endColor);
    const preview = document.getElementById("preview");
    preview.innerHTML = gradient;
}

// RGB Farbverlauf generieren
function createGradient(text, startColor, endColor) {
    const steps = text.length;
    const startRGB = hexToRgb(startColor);
    const endRGB = hexToRgb(endColor);

    let gradientText = "";
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const r = Math.round(startRGB.r + ratio * (endRGB.r - startRGB.r));
        const g = Math.round(startRGB.g + ratio * (endRGB.g - startRGB.g));
        const b = Math.round(startRGB.b + ratio * (endRGB.b - startRGB.b));
        gradientText += `<span style="color: rgb(${r},${g},${b})">${text[i]}</span>`;
    }
    return gradientText;
}

// HEX zu RGB konvertieren
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

// Gradient in Lore-Feld einfügen
function insertGradient() {
    const preview = document.getElementById("preview");
    const loreField = document.getElementById("lore");
    loreField.value += preview.innerHTML.replace(/<[^>]*>/g, "");
    updatePreview();
}

// Gradient exportieren
function exportGradient() {
    const text = document.getElementById("rgb-text").value;
    const startColor = document.getElementById("start-color").value;
    const endColor = document.getElementById("end-color").value;
    const gradientData = JSON.stringify({ text, startColor, endColor });

    const blob = new Blob([gradientData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gradient.json";
    link.click();
    URL.revokeObjectURL(url);
}

// Gradient importieren
function importGradient() {
    const file = document.getElementById("import-file").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        document.getElementById("rgb-text").value = data.text;
        document.getElementById("start-color").value = data.startColor;
        document.getElementById("end-color").value = data.endColor;
        generateRGB();
    };
    reader.readAsText(file);
}
