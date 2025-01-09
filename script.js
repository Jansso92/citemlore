const preview = document.getElementById('preview');
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
    { code: '&5', color: '#AA00AA' }, // Standardfarbe
    { code: '&6', color: '#FFAA00' },
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

// Format Codes
const formatCodes = [
    { code: '&l', text: 'Fett' },
    { code: '&o', text: 'Kursiv' },
    { code: '&n', text: 'Unterstrichen' },
    { code: '&m', text: 'Durchgestrichen' },
    { code: '&r', text: 'Reset' }
];

// Buttons dynamisch hinzufügen
colorCodes.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color.color;
    button.textContent = color.code;
    button.onclick = () => insertCode(color.code);
    colorButtons.appendChild(button);
});

formatCodes.forEach(format => {
    const button = document.createElement('button');
    button.textContent = format.text;
    button.onclick = () => insertCode(format.code);
    formatButtons.appendChild(button);
});

// Funktion für das Einfügen von Farbcodes oder Formatierungen
function insertCode(code) {
    const start = itemLoreInput.selectionStart;
    const end = itemLoreInput.selectionEnd;
    const text = itemLoreInput.value;
    itemLoreInput.value = text.substring(0, start) + code + text.substring(end);
    updatePreview();
}

// Funktion für das Einfügen von Symbolen
function insertSymbol(symbol) {
    const start = itemLoreInput.selectionStart;
    const end = itemLoreInput.selectionEnd;
    const text = itemLoreInput.value;
    itemLoreInput.value = text.substring(0, start) + symbol + text.substring(end);
    updatePreview();
}

// Vorschau aktualisieren
function updatePreview() {
    const name = formatText(itemNameInput.value);
    const lore = formatText(itemLoreInput.value).split('\n').join('<br>');
    preview.innerHTML = `<span style="color:#AA00AA">${name}</span><br>${lore}`;
}

// Farbcodes in HTML-Format umwandeln
function formatText(text) {
    return text
        .replace(/&([0-9a-f])/g, (_, color) => `<span style="color:${colorCodes.find(c => c.code === '&' + color).color}">`)
        .replace(/&([lomnr])/g, (_, format) => `<span style="${getFormatStyle(format)}">`)
        .replace(/&r/g, '</span>')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;') + '</span>'.repeat((text.match(/&r/g) || []).length);
}

// Formatstile für Text
function getFormatStyle(format) {
    switch (format) {
        case 'l': return 'font-weight:bold';
        case 'o': return 'font-style:italic';
        case 'n': return 'text-decoration:underline';
        case 'm': return 'text-decoration:line-through';
        default: return '';
    }
}

// Events für Live-Vorschau
itemNameInput.addEventListener('input', updatePreview);
itemLoreInput.addEventListener('input', updatePreview);
