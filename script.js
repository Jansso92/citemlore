const previewName = document.getElementById('preview-name');
const previewLore = document.getElementById('preview-lore');
const itemNameInput = document.getElementById('item-name');
const itemLoreInput = document.getElementById('item-lore');
const colorButtons = document.getElementById('color-code-buttons');
const formatButtons = document.getElementById('format-buttons');

// Minecraft Farbcodes
const colorCodes = [
    { code: '&0', color: '#000000' },
    { code: '&1', color: '#0000AA' },
    { code: '&2', color: '#00AA00' },
    { code: '&3', color: '#00AAAA' },
    { code: '&4', color: '#AA0000' },
    { code: '&5', color: '#AA00AA' }, // Standardfarbe für Lore
    { code: '&6', color: '#FFAA00' }, // Standardfarbe für Name
    { code: '&7', color: '#AAAAAA' },
    { code: '&8', color: '#555555' },
    { code: '&9', color: '#5555FF' },
    { code: '&a', color: '#55FF55' },
    { code: '&b', color: '#55FFFF' },
    { code: '&c', color: '#FF5555' },
    { code: '&d', color: '#FF55FF' },
    { code: '&e', color: '#FFFF55' },
    { code: '&f', color: '#FFFFFF' }
];

// Formatierungen
const formatCodes = [
    { code: '&l', label: 'Fett' },
    { code: '&o', label: 'Kursiv' },
    { code: '&n', label: 'Unterstrichen' },
    { code: '&m', label: 'Durchgestrichen' },
    { code: '&r', label: 'Reset' }
];

// Buttons für Farbcodes generieren
colorCodes.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color.color;
    button.textContent = color.code;
    button.addEventListener('click', () => insertCode(color.code));
    colorButtons.appendChild(button);
});

// Buttons für Formatierungen generieren
formatCodes.forEach(format => {
    const button = document.createElement('button');
    button.textContent = format.label;
    button.addEventListener('click', () => insertCode(format.code));
    formatButtons.appendChild(button);
});

// Vorschau aktualisieren
function updatePreview() {
    previewName.innerHTML = formatText(itemNameInput.value, '&6'); // Standardfarbe Gold
    previewLore.innerHTML = formatText(itemLoreInput.value, '&5'); // Standardfarbe Lila
}

// Text formatieren (ohne Farbcodes in Vorschau)
function formatText(text, defaultColor) {
    let formattedText = `<span style="color:${getColorFromCode(defaultColor)}">`;
    formattedText += text
        .replace(/&([0-9a-f])/g, (_, color) => `</span><span style="color:${getColorFromCode('&' + color)}">`)
        .replace(/&r/g, '</span><span style="color:' + getColorFromCode(defaultColor) + '">');
    formattedText += '</span>';
    return formattedText;
}

// Farbe aus Farbcodes holen
function getColorFromCode(code) {
    return colorCodes.find(c => c.code === code)?.color || '#FFFFFF';
}

// Code ins Item Lore einfügen
function insertCode(code) {
    const cursorPos = itemLoreInput.selectionStart;
    const textBefore = itemLoreInput.value.substring(0, cursorPos);
    const textAfter = itemLoreInput.value.substring(cursorPos);
    itemLoreInput.value = textBefore + code + textAfter;
    updatePreview();
}

// Symbol ins Item Lore einfügen
function insertSymbol(symbol) {
    const cursorPos = itemLoreInput.selectionStart;
    const textBefore = itemLoreInput.value.substring(0, cursorPos);
    const textAfter = itemLoreInput.value.substring(cursorPos);
    itemLoreInput.value = textBefore + symbol + textAfter;
    updatePreview();
}

// Events für Live-Vorschau
itemNameInput.addEventListener('input', updatePreview);
itemLoreInput.addEventListener('input', updatePreview);
