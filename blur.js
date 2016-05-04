window.onload = function main() {
    var canvas = document.querySelector('canvas')
    var context = canvas.getContext('2d')
    var img = new Image
    img.src = "lenna.png"
    var buffer = document.querySelector('canvas.buffer').getContext('2d')

    var width = parseInt(canvas.width, 10);
    var height = parseInt(canvas.height, 10);

    img.onload = init;

	function init()
	{
		buffer.drawImage(img, 0, 0, width, height);

	    canvas.tabIndex = -1;
	    canvas.focus();

	    requestAnimationFrame(tick);
	}

    var changed = true;

    function redraw(time) {
        if (!changed)
        	return;

        draw();

        changed = false;
    }

    function draw()
    {
		context.drawImage(img, 0, 0, width, height);

		var value = context.getImageData(0, 0, width, height);

		var firstRow = width * 4 * 50;

		for (var i = 0, l = value.data.length; i < l; i += 4)
		{
			var r = value.data[i    ],
				g = value.data[i + 1],
				b = value.data[i + 2];

			value.data[i]     = r;
			value.data[i + 1] = g;
			value.data[i + 2] = b;
		}
		context.putImageData(value, 0, 0)
    }

    function tick(time) {
        redraw(time);
        requestAnimationFrame(tick);
    }
};
