// Funktion zum Einfügen von Text an der aktuellen Cursorposition im Textarea
function insertText(text) {
    const textarea = document.getElementById('itemlore');
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);
    textarea.value = textBefore + text + textAfter;
    // Cursor nach dem eingefügten Text positionieren
    textarea.selectionStart = textarea.selectionEnd = cursorPos + text.length;
    textarea.focus();
    updatePreview();
}

// Funktion zum Aktualisieren der Tooltip-Vorschau
function updatePreview() {
    const loreText = document.getElementById('itemlore').value;
    // Text mit Farbcodes und Effekten für die Vorschau formatieren
    const formattedText = formatText(loreText);
    document.getElementById('tooltip-lore-preview').innerHTML = formattedText;
}

// Funktion zum Formatieren des Textes (unterstützt Minecraft Farbcodes und Effekte)
function formatText(text) {
    const colorCodeMap = {
        '&0': '<span style="color: #000000">', '&1': '<span style="color: #0000AA">',
        '&2': '<span style="color: #00AA00">', '&3': '<span style="color: #00AAAA">',
        '&4': '<span style="color: #AA0000">', '&5': '<span style="color: #AA00AA">',
        '&6': '<span style="color: #FFAA00">', '&7': '<span style="color: #AAAAAA">',
        '&8': '<span style="color: #555555">', '&9': '<span style="color: #5555FF">',
        '&a': '<span style="color: #55FF55">', '&b': '<span style="color: #55FFFF">',
        '&c': '<span style="color: #FF5555">', '&d': '<span style="color: #FF55FF">',
        '&e': '<span style="color: #FFFF55">', '&f': '<span style="color: #FFFFFF">',
        '&l': '<span style="font-weight: bold">', '&o': '<span style="font-style: italic">',
        '&n': '<span style="text-decoration: underline">', '&m': '<span style="text-decoration: line-through">',
        '&r': '<span style="font-weight: normal; font-style: normal; text-decoration: none">'
    };

    // Ersetze Farbcodes & Effekte
    let formattedText = text;
    Object.keys(colorCodeMap).forEach(code => {
        const regex = new RegExp(code, 'g');
        formattedText = formattedText.replace(regex, colorCodeMap[code] + '$&</span>');
    });

    return formattedText;
}

// Funktion zum Kopieren des Textes in die Zwischenablage
function copyToClipboard() {
    const loreText = document.getElementById('itemlore').value;
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = loreText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    alert("Text in die Zwischenablage kopiert!");
}
