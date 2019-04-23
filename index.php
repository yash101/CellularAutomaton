<!DOCTYPE html>

<html>
	<head>
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/three.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>

		<link href="https://fonts.googleapis.com/css?family=Indie+Flower|Open+Sans+Condensed:300|VT323" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/main.css">

		<script type="text/javascript">
<?php
		if (isset($_REQUEST["shared_uri"])) {
?>

			window.shared_code = <?php echo $_REQUEST["shared_uri"]; ?>;
			window.from_shared_uri = true;
<?php
		}
?>
		</script>
	</head>

	<body>
		<div class="heading">Cellular Automaton Demo</div>
		<div class="secondary">Cellular Automaton:</div>
		<button id="fullscreen-btn" class="fullscreen"></button>
		<button id="code-btn"></button>
		<table id="view" class="hidden">
		</table>
		<div class="page">
			<div id="page-container">
				<h1>Usage Instructions:</h1>
				<p>To use the cellular automaton demo, please write code for your automaton, and press the play button to run it. Two functions are required for the cellular automaton to function:</p>
				<ul>
					<li><pre class="inlblk">window.automaton.initialize = function(image)</pre><span> is in charge of initializing the cellular automaton</span></li>
					<li><pre class="inlblk">window.automaton.step = function(image)</pre><span> is run on every clock tick of the cellular automaton. It's job is to apply the rules on each cell.</span></li>
				</ul>
				<p>The following functions can be used in your code:</p>
				<ul>
					<li><pre class="inlblk">setElementSize(width, height)</pre><span> changes the size of every cell in the grid</span></li>
					<li><pre class="inlblk">getxy(x, y)</pre><span> gets the element at position (x, y)</span></li>
					<li><pre class="inlblk">checkMarked(x, y)</pre><span> checks if the element at position (x, y) is marked</span></li>
					<li><pre class="inlblk">mark(x, y)</pre><span> mark element at position (x, y)</span></li>
					<li><pre class="inlblk">unmark(x, y)</pre><span> unmark element at position (x, y)</span></li>
					<li><pre class="inlblk">toggle(x, y)</pre><span> toggle whether the element at position (x, y) is marked or not</span></li>
					<li><pre class="inlblk">elementInBounds(x, y)</pre><span> determine whether coordinate (x, y) represents a valid position on the cellular automaton grid</span></li>
					<li><pre class="inlblk">Image::get(x, y)</pre><span> checks if cell (x, y) in the image is marked</span></li>
					<li><pre class="inlblk">Image::set(x, y, target)</pre><span> sets the cell at (x, y) to be marked or not depending on target (bool)</span></li>
					<li><pre class="inlblk">Image::getNeighbors(x, y)</pre><span> gets all neighbors for (x, y)</span></li>
				</ul>
				<p>Both functions, <pre class="inlblk">window.automaton.initialize</pre> and <pre class="inlblk">window.automaton.step</pre> are passed in an instance of an Image. This Image contains the state of the grid before the functions were called. If these functions return an Image, the grid is updated with the values in the updated Image.</p>
				<p>Alternatively, the functions can return nothing, the grid will not be updated to the Image.</p>
				<p>If you create a new Image using the `new` keyword, it will be initialized with the state of the grid</p>
				<h1>Example Programs:</h1>
				<ul>
					<ul><a href="javascript:window.links.forceLoad(links.randomGenerator);">Random Image Generator</a></ul>
					<ul><a href="javascript:window.links.forceLoad(links.gameOfLife);">Conway's Game of Life</a></ul>
				</ul>
			</div>
		</div>
		<div class="secondary">&copy; Devyash Lodha, 2019. Written for CSE 355, Heni Ben Amor</div>
		<div id="spacer" style="height: 302px;background-color: white;"></div>
		<div id="control-pane">
			<div id="code-pane">
				<textarea id="code" resizable="false">// The cellular automaton will initialize using the following function:
window.automaton.initialize = function(image) {
	return image;
};

function apply_rules(x, y, image) {
	image.set(x, y, Boolean(Math.random() < 0.5));
};

// This function is run on each step
window.automaton.step = function(image) {
	for (var x = 0; x < window.gridWidth; x++) {
		for (var y = 0; y < window.gridHeight; y++) {
			apply_rules(x, y, image);
		}
	}
	return image;
};
</textarea>
			</div>
			<div id="controls">
				<button id="save"></button>
				<button id="run" class="btn-br-run"></button>
				<button id="reset"></button>
				<button id="step"></button>
				<button id="share"></button>
				<p>Canvas Width:</p>
				<input type="number" step="1" value="10" id="num-x">
				<p>Canvas Height:</p>
				<input type="number" step="1" value="10" id="num-y">
				<p>Update Speed: (ms)</p>
				<input type="number" step="1" value="15" id="update-speed">
				<p>Cell Width:</p>
				<input type="number" step="1" value="10" id="cell-width">
				<p>Cell Height:</p>
				<input type="number" step="1" value="10" id="cell-height">
			</div>
		</div>
	</body>
</html>
