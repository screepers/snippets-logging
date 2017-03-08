/**
 * Set console height.
 * @author Spedwards
 */
global.consoleHeight = function(height, unitType = 'px') {
    console.log(`<script>document.querySelector(\'.editor-panel\').style.height = "${height}${unitType}";</script>`);
}