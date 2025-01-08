let activeField = "lore"; // Standardmäßig das Lore-Feld

// Setzt das aktive Feld beim Klick
function setActiveField(fieldId) {
    activeField = fieldId;
}

// Minecraft-Tooltip aktualisieren
function updatePreview() {
    const itemname = document.getElementById("itemname").value;
    const lore = document.getElementById("lore").value;

    // Minecraft-Formatierungen anwenden
    const formattedName = formatMinecraftText(itemname);
    const formattedLore = formatMinecraftText(lore);

    document.getElementById("preview").innerHTML = `<strong>${formattedName}</strong><br>${formattedLore}`;
}

// Minecraft-Farb- und Textcodes formatieren
function formatMinecraftText(text) {
    return text
        .replace(/&([0-9a-f])/g, `<span style="color: #$1;">`) // Farben
        .replace(/&l/g, `<span style="font-weight: bold;">`) // Fett
        .replace(/&o/g, `<span style="font-style: italic;">`) // Kursiv
        .replace(/&n/g, `<span style="text-decoration: underline;">`) // Unterstrichen
        .replace(/&m/g, `<span style="text-decoration: line-through;">`) // Durchgestrichen
        .replace(/&r/g, `</span>`); // Zurücksetzen
}

// Text in das aktive Feld einfügen
function insertText(text) {
    const field = document.getElementById(activeField);
    const cursorPos = field.selectionStart;
    const textBefore = field.value.substring(0, cursorPos);
    const textAfter = field.value.substring(cursorPos);

    field.value = textBefore + text + textAfter;
    field.focus();
    updatePreview();
}
