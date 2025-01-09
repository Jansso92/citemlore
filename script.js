// Update the preview text in real-time as the user types
function updatePreview() {
    var itemName = document.getElementById('itemName').value;
    var itemLore = document.getElementById('itemLore').value;

    // Update the preview window with the new text
    document.getElementById('previewText').textContent = itemLore || itemName;
}

// Insert color code into the itemLore input field
function insertColor(colorCode) {
    var itemLore = document.getElementById('itemLore');
    var startPos = itemLore.selectionStart;
    var endPos = itemLore.selectionEnd;
    
    // Insert the color code at the cursor position
    itemLore.value = itemLore.value.substring(0, startPos) + colorCode + itemLore.value.substring(endPos);
    
    // Move the cursor position after the inserted color code
    itemLore.selectionStart = itemLore.selectionEnd = startPos + colorCode.length;
    
    // Update the preview after adding the color
    updatePreview();
}

// Insert style code (bold, italic, etc.) into the itemLore input field
function insertStyle(styleCode) {
    var itemLore = document.getElementById('itemLore');
    var startPos = itemLore.selectionStart;
    var endPos = itemLore.selectionEnd;

    // Insert the style code at the cursor position
    itemLore.value = itemLore.value.substring(0, startPos) + styleCode + itemLore.value.substring(endPos);

    // Move the cursor position after the inserted style code
    itemLore.selectionStart = itemLore.selectionEnd = startPos + styleCode.length;

    // Update the preview after adding the style
    updatePreview();
}
