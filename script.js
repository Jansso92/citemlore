// Funktion zur Aktualisierung der Tooltip-Vorschau
function updatePreview() {
    var itemname = document.getElementById('itemname').value;
    var lore = document.getElementById('itemlore').value;
    
    document.getElementById('itemname-preview').textContent = itemname;
    document.getElementById('lore-preview').innerHTML = lore.replace(/\n/g, '<div></div>');
}

// Event-Listener für das Eingabefeld, um die Vorschau in Echtzeit zu aktualisieren
document.getElementById('itemname').addEventListener('input', updatePreview);
document.getElementById('itemlore').addEventListener('input', updatePreview);

// Textformatierungsfunktionen
function applyBold() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "**" + textarea.value + "**"; // Füge "**" hinzu, um fett darzustellen
    updatePreview();
}

function applyItalic() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "*" + textarea.value + "*"; // Füge "*" hinzu, um kursiv darzustellen
    updatePreview();
}

function applyUnderline() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "_" + textarea.value + "_"; // Füge "_" hinzu, um unterstrichen darzustellen
    updatePreview();
}

function applyColor() {
    var textarea = document.getElementById('itemlore');
    var color = prompt("Gib einen Farbcode ein (Hex oder Farbnamen):", "#ff0000");
    textarea.value = "<font color='" + color + "'>" + textarea.value + "</font>"; // Setze die Schriftfarbe
    updatePreview();
}

// Kopieren der Tooltip-Vorschau
function copyTooltip() {
    var tooltip = document.getElementById('tooltip-preview');
    var range = document.createRange();
    range.selectNode(tooltip);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Tooltip kopiert!');
}
