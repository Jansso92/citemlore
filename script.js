// Update Item Name in Tooltip
function updateTooltipItemname() {
    const itemnameInput = document.getElementById('itemname');
    const tooltipItemname = document.getElementById('tooltip-itemname');
    tooltipItemname.innerText = itemnameInput.value || 'Item Name';
}

// Update Lore in Tooltip
function updateTooltipLore() {
    const loreInput = document.getElementById('lore');
    const tooltipLore = document.getElementById('tooltip-lore');

    // Clear previous lore and add new lines
    tooltipLore.innerHTML = '';
    loreInput.value.split('\n').forEach(line => {
        const div = document.createElement('div');
        div.innerText = line;
        tooltipLore.appendChild(div);
    });
}

// Add color codes or formatting to the input
function addColorCode(code) {
    const focusedElement = document.activeElement;
    if (focusedElement && (focusedElement.tagName === 'TEXTAREA' || focusedElement.tagName === 'INPUT')) {
        const start = focusedElement.selectionStart;
        const end = focusedElement.selectionEnd;
        const text = focusedElement.value;

        focusedElement.value = text.slice(0, start) + code + text.slice(end);
        focusedElement.selectionStart = focusedElement.selectionEnd = start + code.length;

        if (focusedElement.id === 'itemname') updateTooltipItemname();
        if (focusedElement.id === 'lore') updateTooltipLore();
    }
}
