window.onload = function () {
    var canvas = document.querySelector('canvas')
    var context = canvas.getContext('2d')
    canvas.tabIndex = -1;
    canvas.focus();

    var points = 0;
    var blockSize = 10;

    var width = parseInt(canvas.width, 10);
    var height = parseInt(canvas.height, 10);
    var initial;
    var direction = new Vec2(1, 0);
    var speed = 100; // px / s
    var offset = new Vec2(width / 2, height / 2);
    var position = offset;
    var dirs = {
        37: new Vec2(-1, 0),
        38: new Vec2(0, -1),
        39: new Vec2(1, 0),
        40: new Vec2(0, 1)
    };

    window.onkeydown = function (evt) {

        if (dirs[evt.keyCode]) {
            direction = dirs[evt.keyCode];
            offset = position;
            initial = 0;
        }
    }

    var food = generateFood();

    function generateFood() {
        var x = Math.random() * width, 
            y = Math.random() * height;

        x = x - (x % blockSize);
        y = y - (y % blockSize);

        return food = new Vec2(x, y);
    }


    function redraw(time) {
        if (!initial)
            initial = time;

        context.fillStyle = 'white'
        context.fillRect(0, 0, 1000, 1000);

        var t = (time - initial) / 1000;

        position = new Vec2(
            (offset.x + (speed * t * direction.x)) % width,
            (offset.y + (speed * t * direction.y)) % height
        );

        var rounded = new Vec2(
            position.x - position.x % blockSize,
            position.y - position.y % blockSize
        );
        context.fillStyle = 'black'
        context.fillRect(position.x, position.y, 10, 10);


        if (rounded.equals(food)) {
            points++;
            speed += 20;
            console.log("JAY! ==2349-1234 -019234-0 9120-3490-1234-09")
            generateFood();
        }

        context.fillStyle = 'red'
        context.fillRect(food.x, food.y, 10, 10);
    }

    function tick(time) {
        redraw(time);
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);


};


function Vec2(x, y)
{
    this.x = Math.round(x);
    this.y = Math.round(y);
}

Vec2.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
};

Vec2.prototype.equals = function (v) {
    return v.x === this.x && v.y === this.y;
};