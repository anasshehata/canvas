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

        var input = context.getImageData(0, 0, width, height);
        var output = context.getImageData(0, 0, width, height);

        //var firstRow = width * 4 * 50;

        var blurRadius = 1;

        var surroundingOffsets = [
            4 * -width - 4,
            4 * -width,
            4 * -width + 4,

            -4,
            0,
            +4,

            4 * +width - 4,
            4 * +width,
            4 * +width + 4,
        ];
        // surroundingOffsets = [0]

        var distances = surroundingOffsets
            .map(i => Math.abs(i % width))
            .map(i => i > width / 2 ? width - i : i)

        var maxDistance = distances.reduce(function (a, b) {
            return a > b ? a : b;
        }, 0);

        // TODO: Round `maxDistance` up to % 4

        var i = 0,
            l = input.data.length;

        for (; i < l; i += 4)
        {
            var r = input.data[i    ],
                g = input.data[i + 1],
                b = input.data[i + 2];

            r *= 0.21;
            g *= 0.72;
            b *= 0.07;

            r = g = b = Math.round(r + g + b)

            if (i < width * 4 ||
                i > width * (height - 1) * 4 ||
                i % (width * 4) < maxDistance ||
                (i + maxDistance) % (width * 4) < maxDistance) {
                // r = 255
                // g = 0
                // b = 0
            }
            else {
                // if (i % 1000 === 0 && i % 3000 === 0) {
                if (true) {
                    b = 0;

                    var j = 0,
                        ll = surroundingOffsets.length,
                        deler = 1 / ll;

                    for (; j < ll; j++)
                    {
                        var offset = surroundingOffsets[j];

                        // HA! We're in grayscale, so R, G and B are equal
                        // Let's cheat and save some code
                        b += input.data[i + offset + 1] * deler;

                    }

                    r = g = b;
                }
            }

            output.data[i]     = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
        }
        context.putImageData(output, 0, 0)
    }
    function mask(){

    }

    function tick(time) {
        redraw(time);
        requestAnimationFrame(tick);
    }
};
