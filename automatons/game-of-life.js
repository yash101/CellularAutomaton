// The cellular automaton will initialize using the following function:
window.automaton.initialize = function(image) {
	image.set(25, 25, true);
	image.set(25, 27, true);
	return image;
};

function apply_rules(x, y, image) {
	var neighbors = [];
	neighbors.push({x: x - 1,y: y });
	neighbors.push({x: x, y: y + 1 });
	neighbors.push({x: x, y: y - 1 });
	neighbors.push({x: x + 1, y: y});
	neighbors.push({x: x + 1, y: y + 1});
	neighbors.push({x: x + 1, y: y - 1});
	neighbors.push({x: x - 1, y: y + 1});
	neighbors.push({x: x - 1, y: y - 1});
	var count = 0;
	for (var i = 0; i < neighbors.length; i++) {
		if (window.elementInBounds(neighbors[i].x, neighbors[i].y) && image.get(neighbors[i].x, neighbors[i].y)) {
			count++;
		}
	}

	if (count > 3 || count < 2) {
		window.unmark(x, y);
	} else {
		window.mark(x, y);
	}
};

// This function is run on each step
window.automaton.step = function(image) {
	for (var x = 0; x < window.gridWidth; x++) {
		for (var y = 0; y < window.gridHeight; y++) {
			apply_rules(x, y, image);
		}
	}
};

