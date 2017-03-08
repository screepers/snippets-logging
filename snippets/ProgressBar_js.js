// Posted by Spedwards

/**
 * Creates an SVG Progress Bar with multiple sections
 * @author Spedwards
 * @version 1.0.0
 * @example
 * let pb = new ProgressBar();
 * pb.addSections({
 *  widthPercentage: 0.5,
 * }, {
 *  widthPercentage: 0.2,
 * });
 * pb.toString();
 * @example
 * let pb = new ProgressBar({ animateStroke: false });
 * pb.addSections({
 *  widthPercentage: 0.3,
 *  colour: "#FFE56D",
 *  label: 'Labels!!!',
 * }, {
 *  widthPercentage: 0.2,
 *  colour: "#FFF",
 * });
 * pb.toString();
 */
class ProgressBar {
	
	constructor(opts) {
		this.opts = ProgressBar.validateOpts(opts);
		this.sections = [];
	}
	
	addSections(...sections) {
		sections.forEach(s => this.sections.push(this.validateSections(s)));
	}
	
	toString() {
		let barWidth = this.opts['width'];
		let barHeight = this.opts['height'];
		let x = 0;
		let y = 0;
		let stroke = this.opts['stroke'];
		let outStr = `<svg width="${this.opts['width']}" height="${barHeight}">`;
		outStr += `<rect ` + (stroke && this.opts['animateStroke'] ? `class="path" `: '') + `fill="#555555" height="${barHeight}" ` + (stroke ? `stroke="${this.opts['strokeColour']}" ` : '') + `width="${barWidth - (x + 1)}" />`;
		let prevX = 0;
		this.sections.forEach(section => {
			let thisWidth = section['widthPercentage'] * barWidth;
			let colour = section['colour'];
			outStr += `<rect class="bar" x="${x + prevX + 2}" y="${y + 2}" width="${thisWidth}" height="${barHeight - 4}" fill="${colour}">`;
			if (section['label']) outStr += `<title>${section['label'].valueOf()}</title>`;
			outStr += `</rect>`;
			prevX = x + prevX + thisWidth;
		});
		return outStr + `</svg>`;
	}
	
	static validateOpts(opts) {
		opts = opts || {};
		if (!opts.hasOwnProperty('stroke')) {
			opts['stroke'] = true;
		}
		if (typeof opts['stroke'] !== 'boolean') {
			opts['stroke'] = true;
		}
		if (opts['stroke']) {
			if (!opts.hasOwnProperty('strokeColour')) {
				opts['strokeColour'] = '#000000';
			}
			if (typeof opts['strokeColour'] !== 'string') {
				opts['strokeColour'] = '#000000';
			}

			if (!opts.hasOwnProperty('animateStroke')) {
				opts['animateStroke'] = false;
			}
			if (typeof opts['animateStroke'] !== 'boolean') {
				opts['animateStroke'] = false;
			}
		}

		if (!opts.hasOwnProperty('height')) {
			opts['height'] = 15;
		}
		if (!Number.isInteger(opts['height'])) {
			opts['height'] = 15;
		}

		if (!opts.hasOwnProperty('width')) {
			opts['width'] = 511;
		}
		if (!Number.isInteger(opts['width'])) {
			opts['width'] = 511;
		}
		return opts;
	}
	
	validateSections(section) {
		section = section || {};
		if (!section.hasOwnProperty('widthPercentage')) {
			if (section.hasOwnProperty('width') && Number.isInteger(section['width'])) {
				section['widthPercentage'] = section['width'] / this.opts['width'];
			} else {
				section['widthPercentage'] = 0;
			}
		}
		if (typeof section['widthPercentage'] !== 'number') {
			section['widthPercentage'] = 0;
		}

		if (!section.hasOwnProperty('colour')) {
			function randomColour() {
				let c = '#';
				while (c.length < 7) {
					c += (Math.random()).toString(16).substr(-6).substr(-1);
				}
				return c;
			}
			section['colour'] = randomColour();
		}
		
		section['label'] = section['label'] || false;

		return section;
	}
	
}