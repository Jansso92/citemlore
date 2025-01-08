let currentColorCodeType = "&"; // Default: '&'

// Update Vorschau
function updateTooltip() {
    const itemName = document.getElementById("itemname").value;
    const itemLore = document.getElementById("itemlore").value;

    document.getElementById("tooltip-name").innerHTML = parseMinecraftColors(itemName);
    document.getElementById("tooltip-lore").innerHTML = parseMinecraftColors(itemLore);
}

// Farben und Formatierungen umwandeln
function parseMinecraftColors(text) {
    const colorMap = {
        '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
        '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
        '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
        'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
    };

    const formatMap = {
        'l': 'font-weight: bold', 'm': 'text-decoration: line-through',
        'n': 'text-decoration: underline', 'o': 'font-style: italic', 'r': ''
    };

    return text.replace(/([&§])([0-9a-fk-or])/g, (match, code, key) => {
        if (colorMap[key]) {
            return `<span style="color: ${colorMap[key]}">`;
        } else if (formatMap[key]) {
            return `<span style="${formatMap[key]}">`;
        }
        return '</span>';
    }) + '</span>';
}

// Text einfügen
function insertText(text) {
    const loreField = document.getElementById("itemlore");
    loreField.value += text;
    updateTooltip();
}

// Farbcodetyp wechseln
function switchColorCodeType() {
    currentColorCodeType = currentColorCodeType === "&" ? "§" : "&";
    document.getElementById("color-switch").innerHTML = `Wechsel zu: ${currentColorCodeType === "&" ? "§" : "&"}`;
}
