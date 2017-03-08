/**
 * Returns the html for the svg representation of the given lab or lab id
 * Author: Enrico
 * @param {StructureLaboratory|String} lab
 * @param {Boolean} colored
 * @returns {string}
 */
global.svgLab = function (lab, colored = true) {
    function invalid() {
        console.log(`Invalid argument passed to global.svgLab! arg: ${lab}`);
        return true;
    }
    if (!lab && invalid()) return;

    if (typeof lab == 'string') {
        lab = Game.getObjectById(lab);
        if (!lab && invalid()) return;
    }

    if (!(lab instanceof StructureLab) && invalid()) return;

    let SVG_HEIGHT = 50;
    let SVG_WIDTH = 50;

    let outstr = ``;
    outstr += `<svg viewBox="0 0 120 120" height="${SVG_HEIGHT}" width="${SVG_WIDTH}" xmlns="http://www.w3.org/2000/svg">`;
    outstr += `<g transform="translate(60,55)">`;
    outstr += `<path class="border" d="M 50 40 A 60 60 0 1 0 -50 40 V 63 H 50 Z" fill="#181818" stroke-width="5"/>`;
    outstr += `<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="#555"/>`;

    if (lab.mineralType) {
        let MINERAL_COLOR = '#ffffff';

        if (colored && lab.mineralType.indexOf('G') == -1) {
            if (['H', 'O'].includes(lab.mineralType)) {
                MINERAL_COLOR = '#989898';
            }
            else if (['UL', 'ZK', 'OH'].includes(lab.mineralType)) {
                MINERAL_COLOR = '#b4b4b4';
            }
            else {
                let BASE_COLORS = {
                    U: '#48C5E5',
                    L: '#24D490',
                    K: '#9269EC',
                    Z: '#D9B478',
                };
                let containedMineral = _(Object.keys(BASE_COLORS)).find(c => lab.mineralType.indexOf(c) > -1);
                if (containedMineral) {
                    MINERAL_COLOR = BASE_COLORS[containedMineral];
                }
            }
        }

        let MINERAL_TRANSFORM = lab.mineralAmount / lab.mineralCapacity;
        outstr += `<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="${MINERAL_COLOR}" transform="matrix(${MINERAL_TRANSFORM},0,0,${MINERAL_TRANSFORM},0,${33*(1-MINERAL_TRANSFORM)})"/>`;
    }

    if (lab.energy) {
        let ENERGY_WIDTH = 72 * (lab.energy / lab.energyCapacity);
        let ENERGY_X = -36 * (lab.energy / lab.energyCapacity);
        outstr += `<rect fill="#ffe56d" height="10" y="43" width="${ENERGY_WIDTH}" x="${ENERGY_X}"/>`;
    }

    outstr += `</g></svg>`;
    return outstr;
};