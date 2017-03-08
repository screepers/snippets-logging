/**
 * Sets the height for the number of lines you want.
 * @author Spedwards
 */
global.setConsoleLines = function(lines) {
	console.log(`<script>document.querySelector(\'.editor-panel\').style.height = "${Math.ceil(lines * 22.5714) + 30}px";</script>`);
}