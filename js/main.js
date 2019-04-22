(function main()
{
	window.setGridSize = function setsize(x, y) {
		$("#view").empty();
		var root = document.getElementById("view");
		for (var i = 0; i < y; i++)
		{
			var row = document.createElement("tr");
			for (var j = 0; j < x; j++)
			{
				var col = document.createElement("td");
				col.setAttribute("class", "ccol");
				row.appendChild(col);
			}
			root.appendChild(row);
		}
	};

	window.setElementSize = function getesz(w, h) {
		$(".ccol").css({
			width: w + "px",
			height: h + "px"
		});
	};

	$(document).ready(function init() {
		window.setGridSize(100, 100);
		window.setElementSize(15, 15);
	});
}) ();
