// Funktion zum Einfügen des Texts in das Eingabefeld
function insertText(text) {
    var textarea = document.getElementById('itemlore');
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;

    // Füge den Text an der Position des Cursors ein
    textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);

    // Setze den Cursor nach dem eingefügten Text
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();

    // Vorschau aktualisieren
    updatePreview();
}

// Funktion zum Aktualisieren der Tooltip-Vorschau
function updatePreview() {
    var loreText = document.getElementById('itemlore').value;
    var preview = document.getElementById('tooltip-lore-preview');
    preview.textContent = loreText;
}

// Funktion zum Kopieren des Texts in die Zwischenablage
function copyToClipboard() {
    var textarea = document.getElementById('itemlore');
    textarea.select();
    document.execCommand('copy');
}

// Initiale Vorschau anzeigen
updatePreview();
