<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom ItemLore Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Custom ItemLore Generator</h1>
    </header>

    <section class="input-container">
        <h2>Itemname</h2>
        <input type="text" id="itemname" placeholder="Gib den Itemnamen hier ein" />

        <h2>Item Lore</h2>
        <textarea id="itemlore" placeholder="Gib deinen Item Lore Text hier ein..."></textarea>

        <div class="button-container">
            <button onclick="copyToClipboard()">In Zwischenablage kopieren</button>
        </div>

        <div id="colors">
            <h3>Farbcodes</h3>
            <span class="color-code" onclick="insertText('&0')">Schwarz</span>
            <span class="color-code" onclick="insertText('&1')">Dunkelblau</span>
            <span class="color-code" onclick="insertText('&2')">Dunkelgrün</span>
            <span class="color-code" onclick="insertText('&3')">Dunkelaqua</span>
            <span class="color-code" onclick="insertText('&4')">Dunkelrot</span>
            <span class="color-code" onclick="insertText('&5')">Lila</span>
            <span class="color-code" onclick="insertText('&6')">Gold</span>
            <span class="color-code" onclick="insertText('&7')">Grau</span>
            <span class="color-code" onclick="insertText('&8')">Dunkelgrau</span>
            <span class="color-code" onclick="insertText('&9')">Blau</span>
        </div>

        <div id="effects">
            <h3>Text-Effekte</h3>
            <span class="effect-code" onclick="insertText('&l')">Fett</span>
            <span class="effect-code" onclick="insertText('&o')">Kursiv</span>
            <span class="effect-code" onclick="insertText('&n')">Unterstrichen</span>
            <span class="effect-code" onclick="insertText('&m')">Durchgestrichen</span>
            <span class="effect-code" onclick="insertText('&r')">Reset</span>
        </div>

        <div id="symbols">
            <h3>Symbole</h3>
            <span class="symbol" onclick="insertText('❤')">❤ Herz</span>
            <span class="symbol" onclick="insertText('★')">★ Stern</span>
            <span class="symbol" onclick="insertText('✦')">✦ Funkel</span>
            <span class="symbol" onclick="insertText('✔')">✔ Haken</span>
            <span class="symbol" onclick="insertText('✖')">✖ Kreuz</span>
            <span class="symbol" onclick="insertText('→')">→ Pfeil</span>
            <span class="symbol" onclick="insertText('←')">← Pfeil</span>
            <span class="symbol" onclick="insertText('↑')">↑ Pfeil</span>
            <span class="symbol" onclick="insertText('↓')">↓ Pfeil</span>
            <span class="symbol" onclick="insertText('•')">• Punkt</span>
        </div>
    </section>

    <section class="tooltip-container">
        <div class="minecraft-tooltip">
            <div class="tooltip-itemname" id="tooltip-itemname">Itemname</div>
            <div id="tooltip-lore-preview">Lore Vorschau</div>
        </div>
    </section>

    <footer>
        <h3>Links</h3>
        <ul>
            <li><a href="#">RGB Generator</a></li>
            <li><a href="#">Nützliche Tools</a></li>
            <li><a href="#">Sonstige</a></li>
        </ul>
    </footer>

    <script src="script.js"></script>
</body>
</html>
