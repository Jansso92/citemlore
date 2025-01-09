// Funktion zum Einfügen von Text (Farben, Effekte etc.)
function insertText(text) {
    const loreText = document.getElementById('lore');
    const caretPos = loreText.selectionStart;
    const textBefore = loreText.value.substring(0, caretPos);
    const textAfter = loreText.value.substring(caretPos);
    loreText.value = textBefore + text + textAfter;
    loreText.focus();
    loreText.selectionStart = caretPos + text.length;
    loreText.selectionEnd = caretPos + text.length;
    updatePreview();
}

// Funktion zur Aktualisierung der Tooltip-Vorschau
function updatePreview() {
    const itemName = document.getElementById('itemname').value;
    const loreText = document.getElementById('lore').value;

    // Itemname: Zeigt den Text mit den Farbcodes an, aber ohne die Farben
    document.getElementById('preview-itemname').textContent = itemName;

    // Lore: Zeigt den Text mit den Farbcodes an, aber ohne die Farben
    document.getElementById('preview-lore').textContent = loreText;

    // Vorschau: Farbcodes werden entfernt, aber die Farben werden angezeigt
    document.getElementById('preview-itemname').innerHTML = formatTextWithColors(itemName);
    document.getElementById('preview-lore').innerHTML = formatTextWithColors(loreText);
}

// Funktion zur Formatierung von Text mit Farbcodes und Effekten
function formatTextWithColors(text) {
    let formattedText = text;

    // Ersetze Minecraft Farbcodes mit HTML-Äquivalenten
    const colorCodes = {
        '&0': 'black', '&1': 'darkblue', '&2': 'darkgreen', '&3': 'darkaqua', '&4': 'darkred', '&5': 'darkviolet',
        '&6': 'gold', '&7': 'gray', '&8': 'darkgray', '&9': 'blue', '&a': 'green', '&b': 'aqua', '&c': 'red',
        '&d': 'pink', '&e': 'yellow', '&f': 'white'
    };

    for (let code in colorCodes) {
        const regex = new RegExp(code, 'g');
        formattedText = formattedText.replace(regex, `<span style="color:${colorCodes[code]}">`);
    }

    // Ersetze Text-Effekte mit HTML-Tags
    formattedText = formattedText.replace(/&l/g, '<b>').replace(/&o/g, '<i>')
                                 .replace(/&n/g, '<u>').replace(/&m/g, '<strike>')
                                 .replace(/&r/g, '</span>');

    return formattedText;
}
