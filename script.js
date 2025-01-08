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
let colors = ["#ff0000"]; // Standardfarbschema

// Vorschau aktualisieren
function updateRGBPreview() {
    const text = document.getElementById("rgb-text").value;
    const preview = document.getElementById("rgb-preview");

    if (!text || colors.length === 0) {
        preview.textContent = "Gib Text und Farben ein.";
        return;
    }

    preview.innerHTML = applyGradient(text, colors);
}

// Farbverlauf anwenden
function applyGradient(text, colors) {
    const steps = text.length;
    const gradientSteps = colors.length - 1;
    let gradientText = "";

    for (let i = 0; i < steps; i++) {
        const char = text[i];
        const ratio = i / (steps - 1);

        // Farbinterpolation
        const startColorIndex = Math.floor(ratio * gradientSteps);
        const endColorIndex = startColorIndex + 1;
        const innerRatio = (ratio * gradientSteps) - startColorIndex;

        const startColor = hexToRgb(colors[startColorIndex]);
        const endColor = hexToRgb(colors[endColorIndex] || startColor);

        const r = Math.round(startColor.r + innerRatio * (endColor.r - startColor.r));
        const g = Math.round(startColor.g + innerRatio * (endColor.g - startColor.g));
        const b = Math.round(startColor.b + innerRatio * (endColor.b - startColor.b));

        gradientText += `<span style="color: rgb(${r},${g},${b})">${char}</span>`;
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

// Farbe hinzufügen
document.getElementById("add-color").addEventListener("click", () => {
    const colorContainer = document.getElementById("color-container");
    const newColor = document.createElement("input");
    newColor.type = "color";
    newColor.value = "#0000ff";
    newColor.addEventListener("input", updateRGBPreview);

    colors.push(newColor.value);
    newColor.addEventListener("change", (e) => {
        const index = Array.from(colorContainer.children).indexOf(e.target) - 1;
        colors[index] = e.target.value;
        updateRGBPreview();
    });

    colorContainer.appendChild(newColor);
    updateRGBPreview();
});

// RGB Vorschau aktualisieren
document.getElementById("rgb-text").addEventListener("input", updateRGBPreview);

// Exportieren
document.getElementById("export-scheme").addEventListener("click", () => {
    const scheme = { text: document.getElementById("rgb-text").value, colors };
    const blob = new Blob([JSON.stringify(scheme, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rgb-scheme.json";
    a.click();
    URL.revokeObjectURL(url);
});

// Importieren
document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const scheme = JSON.parse(event.target.result);
        document.getElementById("rgb-text").value = scheme.text;
        colors = scheme.colors;

        const colorContainer = document.getElementById("color-container");
        colorContainer.innerHTML = '<label for="color1">Farbe 1:</label>';
        colors.forEach((color) => {
            const colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.value = color;
            colorInput.addEventListener("input", updateRGBPreview);

            colorInput.addEventListener("change", (e) => {
                const index = Array.from(colorContainer.children).indexOf(e.target) - 1;
                colors[index] = e.target.value;
                updateRGBPreview();
            });

            colorContainer.appendChild(colorInput);
        });

        updateRGBPreview();
    };

    reader.readAsText(file);
});
// Liste aller Symbole
const symbols = [
    "❤", "❥", "✔", "✖", "✗", "✘", "❂", "⋆", "✢", "✣", "✤", "✥", "✦", "✩", "✪", "✫", "✬", "✭", "✮", "✯", 
    "✰", "★", "✱", "✲", "✳", "✴", "✵", "✶", "✷", "✸", "✹", "✺", "✻", "✼", "❄", "❅", "❆", "❇", "❈", "❉", 
    "❊", "❋", "☆", "✡", "✽", "✾", "✿", "❀", "❁", "❃", "✌", "♼", "♽", "✂", "✄", "✈", "➡", "⬅", "⬆", "⬇", 
    "➟", "➢", "➣", "➤", "➥", "➦", "➧", "➨", "➚", "➘", "➙", "➛", "➜", "➝", "➞", "➸", "➲", "➳", "➴", "➵", 
    "➶", "➷", "➹", "➺", "➻", "➼", "➽", "Ⓜ", "⬛", "⬜", "█", "▛", "▀", "▜", "▆", "▄", "▌", "☕", "ℹ", "™", 
    "⚑", "⚐", "☃", "⚠", "⚔", "⚖", "⚒", "⚙", "⚜", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅", "⚊", "⚋", "⚌", "⚍", "⚎", 
    "⚏", "☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷", "⚆", "⚇", "⚈", "⚉", "♿", "♩", "♪", "♫", "♬", "♭", "♮", 
    "♯", "♠", "♡", "♢", "♣", "♤", "♥", "♦", "♧", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", 
    "♟", "⚪", "⚫", "☯", "☮", "☣", "☏", "➀", "➁", "➂", "➃", "➄", "➅", "➆", "➇", "➈", "➉", "➊", "➋", "➌", 
    "➍", "➎", "➏", "➐", "➑", "➒", "➓", "ⓐ", "ⓑ", "ⓒ", "ⓓ", "ⓔ", "ⓕ", "ⓖ", "ⓗ", "ⓘ", "ⓙ", "ⓚ", "ⓛ", 
    "ⓜ", "ⓝ", "ⓞ", "ⓟ", "ⓠ", "ⓡ", "ⓢ", "ⓣ", "ⓤ", "ⓥ", "ⓦ", "ⓧ", "ⓨ", "ⓩ", "웃", "유", "♋", "☢", "☠", 
    "☑", "▲", "⌚", "¿", "❣", "♂", "♀", "☿", "Ⓐ", "✍", "✉", "☤", "☒", "▼", "⌘", "⌛", "¡", "ღ", "ツ", "☼", 
    "☁", "♒", "✎", "©", "®", "Σ", "☭", "✞", "℃", "℉", "ϟ", "☂", "¢", "£", "∞", "½", "☪", "☺", "☻", "☹", 
    "⌇", "⚛", "⌨", "✆", "☎", "⌥", "⇧", "↩", "←", "→", "↑", "↓", "➫", "☜", "☞", "☝", "☟", "♺", "⌲", "⚢", 
    "⚣", "❑", "❒", "◈", "◐", "◑", "«", "»", "‹", "›", "–", "—", "⁄", "¶", "‽", "⁂", "※", "±", "×", "≈", 
    "÷", "≠", "π", "†", "‡", "¥", "€", "‰", "…", "·", "•", "●", "⊗", "Ω", "☄", "☾", "☽", "☀", "۞", "۩", 
    "✧", "❦", "❧", "▢", "△", "▽", "◆", "◇", "○", "◎", "◯", "Δ", "◕", "◔", "ʊ", "回", "₪", "✓", "✕", "☥", 
    "☦", "☧", "☨", "☩", "☫", "☬", "⅓", "⅔", "¼", "¾", "⅛", "⅜", "⅝", "⅞", "℅", "№", "⇨", "❝", "❞", "∃"
    // (Liste kann bei Bedarf fortgesetzt werden)
];

// Elemente für die Anzeige
const symbolList = document.getElementById('symbolList');

// Funktion zum Anzeigen der Symbole
function displaySymbols() {
    symbolList.innerHTML = ''; // Liste zurücksetzen
    symbols.forEach(symbol => {
        const symbolCard = document.createElement('div');
        symbolCard.className = 'symbol-card';
        symbolCard.textContent = symbol;
        symbolCard.onclick = () => copyToClipboard(symbol);
        symbolList.appendChild(symbolCard);
    });
}

// Funktion zum Kopieren eines Symbols
function copyToClipboard(symbol) {
    navigator.clipboard.writeText(symbol).then(() => {
        alert(`Symbol "${symbol}" wurde kopiert!`);
    });
}

// Symbole anzeigen
displaySymbols();

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
