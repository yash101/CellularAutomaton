(function main()
{
	window.links = {};
	links.randomGenerator = "%7B\"code\":\"//%20The%20cellular%20automaton%20will%20initialize%20using%20the%20following%20function:%5Cnwindow.automaton.initialize%20=%20function(image)%20%7B%5Cn%5Ctreturn%20image;%5Cn%5Ct//%20test%5Cn%7D;%5Cn%5Cnfunction%20apply_rules(x,%20y,%20image)%20%7B%5Cn%5Ctimage.set(x,%20y,%20Boolean(Math.random()%20<%200.5));%5Cn%7D;%5Cn%5Cn//%20This%20function%20is%20run%20on%20each%20step%5Cnwindow.automaton.step%20=%20function(image)%20%7B%5Cn%5Ctfor%20(var%20x%20=%200;%20x%20<%20window.gridWidth;%20x++)%20%7B%5Cn%5Ct%5Ctfor%20(var%20y%20=%200;%20y%20<%20window.gridHeight;%20y++)%20%7B%5Cn%5Ct%5Ct%5Ctapply_rules(x,%20y,%20image);%5Cn%5Ct%5Ct%7D%5Cn%5Ct%7D%5Cn%5Ctreturn%20image;%5Cn%7D;%5Cn\",\"nw\":\"10\",\"nh\":\"10\",\"cw\":\"10\",\"ch\":\"10\",\"us\":\"15\"%7D"
	links.gameOfLife = "%7B\"code\":\"//%20The%20cellular%20automaton%20will%20initialize%20using%20the%20following%20function:%5Cnwindow.automaton.initialize%20=%20function(image)%20%7B%5Cn%5Ctimage.set(25,%2025,%20true);%5Cn%5Ctimage.set(25,%2027,%20true);%5Cn%5Ctreturn%20image;%5Cn%7D;%5Cn%5Cnfunction%20apply_rules(x,%20y,%20image)%20%7B%5Cn%5Ctvar%20neighbors%20=%20%5B%5D;%5Cn%5Ctneighbors.push(%7Bx:%20x%20-%201,y:%20y%20%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x,%20y:%20y%20+%201%20%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x,%20y:%20y%20-%201%20%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x%20+%201,%20y:%20y%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x%20+%201,%20y:%20y%20+%201%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x%20+%201,%20y:%20y%20-%201%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x%20-%201,%20y:%20y%20+%201%7D);%5Cn%5Ctneighbors.push(%7Bx:%20x%20-%201,%20y:%20y%20-%201%7D);%5Cn%5Ctvar%20count%20=%200;%5Cn%5Ctfor%20(var%20i%20=%200;%20i%20<%20neighbors.length;%20i++)%20%7B%5Cn%5Ct%5Ctif%20(window.elementInBounds(neighbors%5Bi%5D.x,%20neighbors%5Bi%5D.y)%20&&%20image.get(neighbors%5Bi%5D.x,%20neighbors%5Bi%5D.y))%20%7B%5Cn%5Ct%5Ct%5Ctcount++;%5Cn%5Ct%5Ct%7D%5Cn%5Ct%7D%5Cn%5Cn%5Ctif%20(count%20>%203%20%7C%7C%20count%20<%202)%20%7B%5Cn%5Ct%5Ctwindow.unmark(x,%20y);%5Cn%5Ct%7D%20else%20%7B%5Cn%5Ct%5Ctwindow.mark(x,%20y);%5Cn%5Ct%7D%5Cn%7D;%5Cn%5Cn//%20This%20function%20is%20run%20on%20each%20step%5Cnwindow.automaton.step%20=%20function(image)%20%7B%5Cn%5Ctfor%20(var%20x%20=%200;%20x%20<%20window.gridWidth;%20x++)%20%7B%5Cn%5Ct%5Ctfor%20(var%20y%20=%200;%20y%20<%20window.gridHeight;%20y++)%20%7B%5Cn%5Ct%5Ct%5Ctapply_rules(x,%20y,%20image);%5Cn%5Ct%5Ct%7D%5Cn%5Ct%7D%5Cn%7D;%5Cn\",\"nw\":\"75\",\"nh\":\"75\",\"cw\":\"2\",\"ch\":\"2\",\"us\":\"1000\"%7D"
	window.links.forceLoad = function(loc) {
		var uri = window.location.origin + window.location.pathname + "?shared_uri=" + loc;
		window.location.hret = uri;
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
	});
}) ();
