// Funktion zur Aktualisierung der Tooltip-Vorschau
function updatePreview() {
    var itemname = document.getElementById('itemname').value;
    var lore = document.getElementById('itemlore').value;
    
    // Minecraft Farbcodes ersetzen
    lore = lore.replace(/&([0-9a-fk-or])/g, function(match, p1) {
        var colorCodes = {
            '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
            '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
            '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
            'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
            'k': 'font-family: "Courier New", Courier, monospace; font-style: italic;', // Magic (obfuscated)
            'l': 'font-weight: bold;', // Bold
            'm': 'text-decoration: line-through;', // Strike-through
            'n': 'text-decoration: underline;', // Underline
            'o': 'font-style: italic;', // Italic
            'r': '' // Reset
        };

        if (p1 in colorCodes) {
            return `<span style="color: ${colorCodes[p1]}">${match}</span>`;
        } else {
            return match;
        }
    });

    document.getElementById('itemname-preview').textContent = itemname;
    document.getElementById('lore-preview').innerHTML = lore.replace(/\n/g, '<div></div>');
}

// Event-Listener für das Eingabefeld, um die Vorschau in Echtzeit zu aktualisieren
document.getElementById('itemname').addEventListener('input', updatePreview);
document.getElementById('itemlore').addEventListener('input', updatePreview);

// Textformatierungsfunktionen
function applyBold() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "&l" + textarea.value; // Füge &l hinzu, um fett darzustellen
    updatePreview();
}

function applyItalic() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "&o" + textarea.value; // Füge &o hinzu, um kursiv darzustellen
    updatePreview();
}

function applyUnderline() {
    var textarea = document.getElementById('itemlore');
    textarea.value = "&n" + textarea.value; // Füge &n hinzu, um unterstrichen darzustellen
    updatePreview();
}

function applyColor() {
    var textarea = document.getElementById('itemlore');
    var color = prompt("Gib einen Farbcode ein (Hex oder Farbnamen):", "#ff0000");
    textarea.value = "&" + color + textarea.value; // Setze die Schriftfarbe
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

// Zeilen kopieren
function createCopyButtonForLine(line, index) {
    var button = document.createElement('button');
    button.textContent = 'Copy';
    button.onclick = function() {
        var loreText = document.getElementById('itemlore').value.split('\n')[index];
        navigator.clipboard.writeText(loreText).then(function() {
            alert('Zeile kopiert!');
        });
    };
    line.appendChild(button);
}
