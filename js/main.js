(function main()
{
	window.links = {};
	window.links.obj = {};
	window.links.obj.gameOfLife = {"code":"// The cellular automaton will initialize using the following function:\nwindow.automaton.initialize = function(image) {\n\timage.set(25, 25, true);\n\timage.set(25, 27, true);\n\treturn image;\n};\n\nfunction apply_rules(x, y, image) {\n\tvar neighbors = [];\n\tneighbors.push({x: x - 1,y: y });\n\tneighbors.push({x: x, y: y + 1 });\n\tneighbors.push({x: x, y: y - 1 });\n\tneighbors.push({x: x + 1, y: y});\n\tneighbors.push({x: x + 1, y: y + 1});\n\tneighbors.push({x: x + 1, y: y - 1});\n\tneighbors.push({x: x - 1, y: y + 1});\n\tneighbors.push({x: x - 1, y: y - 1});\n\tvar count = 0;\n\tfor (var i = 0; i < neighbors.length; i++) {\n\t\tif (window.elementInBounds(neighbors[i].x, neighbors[i].y) && image.get(neighbors[i].x, neighbors[i].y)) {\n\t\t\tcount++;\n\t\t}\n\t}\n\n\tif (count > 3 || count < 2) {\n\t\twindow.unmark(x, y);\n\t} else {\n\t\twindow.mark(x, y);\n\t}\n};\n\n// This function is run on each step\nwindow.automaton.step = function(image) {\n\tfor (var x = 0; x < window.gridWidth; x++) {\n\t\tfor (var y = 0; y < window.gridHeight; y++) {\n\t\t\tapply_rules(x, y, image);\n\t\t}\n\t}\n};\n","nw":"75","nh":"75","cw":"2","ch":"2","us":"1000"};
	window.links.obj.randomGenerator = {"code":"// The cellular automaton will initialize using the following function:\nwindow.automaton.initialize = function(image) {\n\treturn image;\n\t// test\n};\n\nfunction apply_rules(x, y, image) {\n\timage.set(x, y, Boolean(Math.random() < 0.5));\n};\n\n// This function is run on each step\nwindow.automaton.step = function(image) {\n\tfor (var x = 0; x < window.gridWidth; x++) {\n\t\tfor (var y = 0; y < window.gridHeight; y++) {\n\t\t\tapply_rules(x, y, image);\n\t\t}\n\t}\n\treturn image;\n};\n","nw":"10","nh":"10","cw":"10","ch":"10","us":"15"};
	window.links.gameOfLife = encodeURI(JSON.stringify(window.links.obj.gameOfLife));
	window.links.randomGenerator = encodeURI(JSON.stringify(window.links.obj.randomGenerator));

	window.links.forceLoad = function(loc) {
		var uri = window.location.origin + window.location.pathname + "?shared_uri=" + loc;
		window.location.href = uri;
//		shared_code = JSON.parse(decodeURI(loc));
//		window.load(shared_code);
	};
	window.setGridSize = function setsize(x, y) {
		window.initialized = true;
		$("#view").empty();
		var root = document.getElementById("view");
		for (var i = 0; i < y; i++)
		{
			var row = document.createElement("tr");
			row.setAttribute("class", "row-" + i);
			for (var j = 0; j < x; j++)
			{
				var col = document.createElement("td");
				col.setAttribute("class", "ccol col-" + j);
				col.setAttribute("pos-x", j);
				col.setAttribute("pos-y", i);
				row.appendChild(col);
			}
			root.appendChild(row);
		}
		$('.ccol').click(function() {
			var x = $(this).attr("pos-x");
			var y = $(this).attr("pos-y");

			console.log(checkMarked(x, y));
			if (!checkMarked(x, y)) {
				mark(x, y);
			} else {
				unmark(x, y);
			}
		});

		window.gridWidth = x;
		window.gridHeight = y;
		$("#view").removeClass("hidden");
	};

	window.setElementSize = function getesz(w, h) {
		$(".ccol").css({
			width: w + "px",
			height: h + "px"
		});
	};

	window.getXY = function getxy(x, y) {
		var row = ".row-" + y;
		var col = ".col-" + x;

		return $(row + ">" + col);
	};

	window.cell_clicked = function cellClicked(event) {
		var x = event.data.x;
		var y = event.data.y;

		console.log(event.data);

		if (checkMarked(x, y)) {
			mark(x, y);
		} else {
			unmark(x, y);
		}
	};

	window.checkMarked = function checkMarked(x, y) {
		var element = getXY(x, y);
		if (element.attr("marked") == "true") {
			return true;
		} else {
			return false;
		}

	};

	window.mark = function mark(x, y) {
		var element = getXY(x, y);
		element.attr("marked", "true");
		element.addClass("marked");
	};

	window.unmark = function mark(x, y) {
		var element = getXY(x, y);
		element.attr("marked", "false");
		element.removeClass("marked");
	};

	window.toggle = function(x, y) {
		if (checkMarked(x, y)) {
			unmark();
		} else {
			mark();
		}
	};

	window.elementInBounds = function(x, y) {
		if (x < 0) return false;
		if (y < 0) return false;
		if (x >= window.gridWidth) return false;
		if (y >= window.gridHeight) return false;
		return true;
	};

	class Image {
		constructor() {
			this.array = [];
			for (var y = 0; y < window.gridHeight; y++) {
				var row = [];
				for (var x = 0; x < window.gridWidth; x++) {
					row.push(window.checkMarked(x, y) === true);
				}
				this.array.push(row);
			}
		};

		clone() {
			var im = new Image();

			var array = [];
			for (var y = 0; y < window.gridHeight; y++) {
				var row = [];
				for (var x = 0; x < window.gridWidth; x++) {
					row.push(window.checkMarked(x, y) === true);
				}
				array.push(row);
			}

			im.array = array;
			return im;
		}
		
		get(x, y) {
			return this.array[y][x];
		}

		set(x, y, val) {
			this.array[y][x] = (val === true);
		}

		getNeighbors(x, y) {
			var neighbors = [];
			var poss_x = [x - 1, x, x + 1];
			var poss_y = [y - 1, y, y + 1];

			for (var i = 0; i < poss_x.length; i++) {
				for (var j = 0; j < poss_y.length; j++) {
					if (poss_x[i] == x && poss_y[j] == y) {
						continue;
					}

					if (window.elementInBounds(poss_x[i], poss_y[j])) {
						neighbors.push({x: poss_x[i], y: poss_y[j]});
					}
				}
			}
			return neighbors;
		}
	};

	window.update = function(im) {
		for (var x = 0; x < window.gridWidth; x++) {
			for (var y = 0; y < window.gridHeight; y++) {
				if (im.get(x, y)) {
					window.mark(x, y);
				} else {
					window.unmark(x, y);
				}
			}
		}
	};

	window.step = function() {
		var im = new Image();
		im = window.automaton.step(im);
		if (im)
			window.update(im);
	};

	// We need to call the initialize function
	// Then, we need to create a timer for the step function
	window.play = function() {
		if (window.running) {
			clearTimeout(window.timeout);
			window.running = false;
			$("#run").addClass("btn-br-run");
			$("#run").removeClass("btn-br-pause");
		} else {
			if (!window.automaton.initialize && !window.automaton.step)
				eval($("#code").val());

			if (gridWidth != parseInt($("#num-x").val()) || gridHeight != parseInt($("#num-y").val())) {
				setGridSize(parseInt($("#num-x").val()), parseInt($("#num-y").val()));
			}

			setElementSize(parseInt($("#cell-width").val()), parseInt($("#cell-height").val()));

			var im = new Image();
			im = window.automaton.initialize(im);
			if (im) 
				window.update(im);

			window.timeout = setInterval(window.step, parseInt($("#update-speed").val()));
			window.running = true;
			$("#run").addClass("btn-br-pause");
			$("#run").removeClass("btn-br-run");
		}
	};

	window.automaton = {};
	window.timeout = null;
	window.running = false;
	window.initialized = false;
	window.gridWidth = 0;
	window.gridHeight = 0;

	window.share = function() {
		var obj = {};
		obj.code = $("#code").val();
		obj.nw = $("#num-x").val();
		obj.nh = $("#num-y").val();
		obj.cw = $("#cell-width").val();
		obj.ch = $("#cell-height").val();
		obj.us = $("#update-speed").val();
		window.location.search = "shared_uri=" + encodeURI(JSON.stringify(obj));
	};

	window.load = function(obj) {
		$("#code").val(obj.code);
		$("#num-x").val(obj.nw);
		$("#num-y").val(obj.nh);
		$("#cell-width").val(obj.cw);
		$("#cell-height").val(obj.ch);
		$("#update-speed").val(obj.us);
		console.log(obj);
	};
	
	// We pass in a Image to the functions

	$(document).ready(function init() {
		if (window.from_shared_uri === true) {
			console.log("shared uri provided");
			window.load(shared_code);
//			window.loadJson(window.location.hash.substring(1));
		}
		$("#share").click(window.share);
		$("#run").click(window.play);
		$("#reset").click(function() { 
			var im = new Image();
			for (var x = 0; x < window.gridWidth; x++) {
				for (var y = 0; y < window.gridHeight; y++) {
					im.set(x, y, false);
				}
			}
			window.update(im);
		});
		$("#step").click(function() {
			if (!window.initialized) {
				setGridSize(parseInt($("#num-x").val()), parseInt($("#num-y").val()));
				setElementSize(parseInt($("#cell-width").val()), parseInt($("#cell-height").val()));
			}

			var ret = window.automaton.step(new Image());
			if (ret) window.update(ret);
			else window.update(new Image());
		});
		$("#save").click(function() {
			eval($("#code").val());
		});

		var ta = document.getElementById("code");
		ta.onkeydown = function(e) {
			if (e.keyCode === 9) {
				var val = this.value;
				var start = this.selectionStart;
				var end = this.selectionEnd;

				this.value = val.substring(0, start) + '\t' + val.substring(end);
				this.selectionStart = this.selectionEnd = start + 1;

				return false;
			}
		};

		$("#fullscreen-btn").click(function() {
			$("#control-pane").toggleClass("hidden");
			$("#spacer").toggleClass("hidden");
			$("#fullscreen-btn").toggleClass("fullscreen");
			$("#fullscreen-btn").toggleClass("exit-fullscreen");
		});

		$("#code-btn").click(function() {
			window.open("https://github.com/yash101/CellularAutomaton");
		});

		$("#ben-amor").click(function() {
			window.open("https://randomaccessmemory.stream/dev/null/super.turing.pdf");
		});
	});
}) ();
