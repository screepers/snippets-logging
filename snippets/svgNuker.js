/**
 * Returns the html for the svg representation of the given nuker or nuker id
 * Author: Enrico
 * @param {StructureNuker|String} nuker
 * @returns {string}
 */
global.svgNuker = function(nuker) {
    function invalid() {
        console.log(`Invalid argument passed to global.svgNuker! arg: ${nuker}`);
        return true;
    }
    if (!nuker && invalid()) return;

    if (typeof nuker == 'string') {
        nuker = Game.getObjectById(nuker);
        if (!nuker && invalid()) return;
    }

    if (!(nuker instanceof StructureNuker) && invalid()) return;

    let SVG_HEIGHT = 60;
    let SVG_WIDTH = 40;

    let outstr = ``;
    outstr += `<svg viewBox="0 0 120 180" height="${SVG_HEIGHT}" width="${SVG_WIDTH}" xmlns="http://www.w3.org/2000/svg">`;
    outstr += `<g transform="translate(60,130)">`;
    outstr += `<path d="M -60 50 L -53 0 L 0 -130 L 53 0 L 60 50 Z" fill="#181818" stroke-width="5"/>`;
    outstr += `<path d="M -40 0 L 0 -100 L 40 0 Z" fill="#555"/>`;
    outstr += `<rect fill="#555" height="15" width="80" x="-40" y="18"/>`;

    if (nuker.ghodium) {
        let GHODIUM_X = -40 * (nuker.ghodium / nuker.ghodiumCapacity);
        let GHODIUM_WIDTH = 80 * (nuker.ghodium / nuker.ghodiumCapacity);
        outstr += `<rect fill="#fff" height="15" y="18" width="${GHODIUM_WIDTH}" x="${GHODIUM_X}"/>`;
    }

    if (nuker.energy) {
        let ENERGY_SCALE = nuker.energy / nuker.energyCapacity;
        outstr += `<path d="M -40 0 L 0 -100 L 40 0 Z" fill="#ffe56d" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})"/>`;
    }

    outstr += `</g></svg>`;
    return outstr;
};