// Posted by Stuy486

/*
Creates an SVG line graph of the datasets passed. All datasets use the same
y axis, so values should be on roughly the same scale or the graph won't look
very good.

datasets:array
 	array of objects of the following format:
	{
		data:array -or- object
			Array of values to plot. Index in the array is the x value.
			-or-
			Object with x:y value pairs. x and y should both be Numbers.

		color:string
		 	svg compatible plaintext color ("white")
			-or-
			#RRGGBB color ("#FFFFFF")
			-or-
			base RESOURCE_* constant (RESOURCE_GHODIUM)

			default:"white"

		width:number
			Plot line width
			default:2

		title:string
			Plot title, will be displayed when you mouseover the plot.
			default:"untitled"
	}

opts is an optional object argument that can contain any of:
	width:number
		width of the graph to draw in pixels

		default: 800

	height:number
		width of the graph to draw in pixels

		default:300

	zeroBased:boolean
		if true. the y axes range will be [0 <-> maxValue]
		if false, the y aces range will be [minValue <-> maxValue]

		default:false
*/

global.consoleGraph2 = function(datasets, opts={}) {
	let labelFormatter = (num) => {
		let sizes = [1000000000000, 1000000000, 1000000, 1000];
		let letters = ['t', 'b', 'm', 'k'];

		let size = _.find(sizes, size => num >= size);
		if (!size) return num;
		let letter = letters[sizes.indexOf(size)];
		let sigFigs = Math.min(3, num.toString().replace(/0+$/,"").length - 1)
		return (num / size).toFixed(sigFigs).replace(/\.0$/,"") + letter;
	}

	let ySteps = [1,2.5,5,10];
	let yLabelPixels = 50;
	let topTitlePixels = 20;
	let axesLineStyle = `style="fill:none;stroke:#999999;stroke-width:1"`
	let gridLineStyle = `style="fill:none;stroke:#999999;stroke-width:.25"`

	// Default option values.
	_.defaults(opts, {width:800}, {height:300}, {zeroBased:false});

	let RES_COLOR = {
		[RESOURCE_HYDROGEN]: `#989898`,
		[RESOURCE_OXYGEN]: `#989898`,
		[RESOURCE_UTRIUM]: `#48C5E5`,
		[RESOURCE_LEMERGIUM]: `#24D490`,
		[RESOURCE_KEANIUM]: `#9269EC`,
		[RESOURCE_ZYNTHIUM]: `#D9B478`,
		[RESOURCE_CATALYST]: `#F26D6F`,
		[RESOURCE_GHODIUM]: `#FFFFFF`,
		[RESOURCE_ENERGY]: `#FEE476`,
		[RESOURCE_POWER]: `#F1243A`,
	};

	// Get the range for x and y values across all datasets.
	let maxYVal = -Infinity;
	let minYVal = Infinity;
	let maxXVal = -Infinity;
	let minXVal = Infinity;
	_.forEach(datasets, dataset => _.forEach(dataset.data, function(y, x) {
		maxYVal = Math.max(maxYVal, y);
		if (!opts.zeroBased) {
			minYVal = Math.min(minYVal, y);
		}
		maxXVal = Math.max(maxXVal, x);
		minXVal = Math.min(minXVal, x);
	}));
	let yRange = maxYVal;
	let xRange = maxXVal - minXVal;
	if (!opts.zeroBased) {
		yRange -= minYVal;
	} else {
		minYVal = 0;
	}

	if (yRange <= 0) {
		console.log("Invalid range of y values");
		return;
	}
	if (xRange == 0) {
		console.log("Invalid range of x values");
		return;
	}

	// Calculate step for y grid lines.
	let gridYStep = Math.max(1, Math.floor(yRange / 10));
	let multiplier = Math.pow(10, gridYStep.toString().length - 1);
	gridYStep = multiplier * ySteps.find(s => s * multiplier >= gridYStep);

	let out = '<svg width=' + opts.width + ' height=' + opts.height + '>';
	// Draw axes
	out += `<polyline points="0,${opts.height-1} ${opts.width-yLabelPixels},${opts.height-1}" ${axesLineStyle}/>`
	out += `<polyline points="${opts.width-yLabelPixels},0 ${opts.width-yLabelPixels},${opts.height}" ${axesLineStyle}/>`

	// Draw grid lines + labels. Stop at 95% of yRange to leave vertical space
	// for the top label text.
	let gridLineY = gridYStep * (Math.floor(minYVal / gridYStep) + 1);
	for (; (gridLineY - minYVal) < (yRange * 0.95); gridLineY += gridYStep) {
		// Convert y value to pixel coordinate (0,0 is top left)
		let y = opts.height - Math.floor((opts.height - topTitlePixels) * ((gridLineY - minYVal) / yRange));
		out += `<polyline points="0,${y} ${opts.width-yLabelPixels+5},${y}" ${gridLineStyle}/>`
		out += `<text style="fill:#FFFFFF;" x="${opts.width-yLabelPixels+5}" y="${y}">${labelFormatter(gridLineY)}</text>`
	}

	// Draw the datasets
	_.forEach(datasets, dataset => {
		let color = dataset.color;
		if (color && RES_COLOR[color]) {
			color = RES_COLOR[color];
		}
		if (!color) {
			color = `#FFFFFF`;
		}
		let stroke_width = dataset.width;
		if (!stroke_width) {
			stroke_width = 2;
		}
		let title = dataset.title;
		if (!title) {
			title = "untitled";
		}
		out += `<text style="fill:#FFFFFF;opacity:0;" x="${opts.width / 2}" y="${topTitlePixels}">${title}</text>`
		let points = "";
		_.forEach(dataset.data, (yVal, xVal) => {
			let x = Math.floor((opts.width - yLabelPixels) * ((xVal - minXVal) / xRange));
			let y = opts.height - Math.floor((opts.height - topTitlePixels) * ((yVal - minYVal) / yRange));
			points += `${x},${y} `
		});
		out += `<polyline points="${points}" style="fill:none;stroke:${color};stroke-width:${stroke_width}"/>`
		out += `<polyline points="${points}" `
		out += `onmouseover="evt.target.style.opacity=1;evt.target.previousElementSibling.previousElementSibling.style.opacity=1;" `
		out += `onmouseout="evt.target.style.opacity=0;evt.target.previousElementSibling.previousElementSibling.style.opacity=0;" `
		out += `style="fill:none;stroke:${color};opacity:0;stroke-width:6"/>`
	});
	out += `</svg>`;
	console.log(out);
}