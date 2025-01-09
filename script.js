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

// Events für Live-Vorschau
itemNameInput.addEventListener('input', updatePreview);
itemLoreInput.addEventListener('input', updatePreview);
