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

    // Ersetze Minecraft-Farbcodes und Effekte durch HTML-Tags
    var formattedText = loreText
        .replace(/&0/g, '<span style="color: #000000">') // Schwarz
        .replace(/&1/g, '<span style="color: #0000AA">') // Dunkelblau
        .replace(/&2/g, '<span style="color: #00AA00">') // Dunkelgrün
        .replace(/&3/g, '<span style="color: #00AAAA">') // Dunkelaqua
        .replace(/&4/g, '<span style="color: #AA0000">') // Dunkelrot
        .replace(/&5/g, '<span style="color: #AA00AA">') // Lila
        .replace(/&6/g, '<span style="color: #FFAA00">') // Gold
        .replace(/&7/g, '<span style="color: #AAAAAA">') // Grau
        .replace(/&8/g, '<span style="color: #555555">') // Dunkelgrau
        .replace(/&9/g, '<span style="color: #5555FF">') // Blau
        .replace(/&a/g, '<span style="color: #00FF00">') // Grün
        .replace(/&b/g, '<span style="color: #55FFFF">') // Aqua
        .replace(/&c/g, '<span style="color: #FF5555">') // Rot
        .replace(/&d/g, '<span style="color: #FF55FF">') // Rosa
        .replace(/&e/g, '<span style="color: #FFFF55">') // Gelb
        .replace(/&f/g, '<span style="color: #FFFFFF">') // Weiß
        .replace(/&l/g, '<span style="font-weight: bold">') // Fett
        .replace(/&o/g, '<span style="font-style: italic">') // Kursiv
        .replace(/&n/g, '<span style="text-decoration: underline">') // Unterstrichen
        .replace(/&m/g, '<span style="text-decoration: line-through">') // Durchgestrichen
        .replace(/&r/g, '<span>'); // Reset

    // Setze das HTML der Vorschau
    preview.innerHTML = formattedText + '</span>';
}

// Funktion zum Kopieren des Texts in die Zwischenablage
function copyToClipboard() {
    var textarea = document.getElementById('itemlore');
    textarea.select();
    document.execCommand('copy');
}

// Initiale Vorschau anzeigen
updatePreview();
