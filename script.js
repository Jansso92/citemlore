// Funktion zum Aktualisieren des Item-Namens im Tooltip
function updateTooltipItemname() {
    const itemnameInput = document.getElementById('itemname');
    const tooltipItemname = document.getElementById('tooltip-itemname');
    tooltipItemname.innerText = itemnameInput.value || 'Item Name';
}

// Funktion zum Aktualisieren des Lores im Tooltip
function updateTooltipLore() {
    const loreInput = document.getElementById('lore');
    const tooltipLore = document.getElementById('tooltip-lore');

    // Zerlegt die Eingabe in Zeilen
    const loreLines = loreInput.value.split('\n');

    // Leert den Tooltip-Lore-Bereich und fügt die aktualisierten Zeilen hinzu
    tooltipLore.innerHTML = '';
    loreLines.forEach(line => {
        const lineElement = document.createElement('div');
        lineElement.innerText = line;
        tooltipLore.appendChild(lineElement);
    });
}

// Funktion zum Hinzufügen eines Farbcodes zur aktuellen Eingabe
function addColorCode(code) {
    const focusedElement = document.activeElement;

    if (focusedElement && (focusedElement.tagName === 'TEXTAREA' || focusedElement.tagName === 'INPUT')) {
        const start = focusedElement.selectionStart;
        const end = focusedElement.selectionEnd;
        const text = focusedElement.value;

        // Fügt den Farbcodes ein, wo der Cursor ist
        focusedElement.value = text.slice(0, start) + code + text.slice(end);
        focusedElement.selectionStart = focusedElement.selectionEnd = start + code.length;

        // Löst die Update-Funktion aus
        if (focusedElement.id === 'itemname') {
            updateTooltipItemname();
        } else if (focusedElement.id === 'lore') {
            updateTooltipLore();
        }
    }
}
