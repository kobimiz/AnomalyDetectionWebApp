// Checked
class Line {
    constructor(aa, bb) {
        this.a = aa;
        this.b = bb;
    }
    f(x) {
        return this.a * x + this.b;
    }
}

// Checked
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        console.log(this.x);
    }
    getY() {
        return `${this.y}`;
    }
}


// Checked
class anomaly_detection_util {
    constructor() { }
    avg(x, size) {
        var sum = 0;
        if (size == 0) {
            return 0;
        }

        for (var i = 0; i < size; sum += x[i], i++);
        return sum / size;
    }

    vari(x, size) {
        if (size == 0) {
            return 0;
        }
        var av = this.avg(x, size);
        var sum = 0;
        for (var i = 0; i < size; i++) {
            sum += x[i] * x[i];
        }
        return sum / size - av * av;
    }

    cov(x, y, size) {
        if (size == 0) {
            return 0;
        }
        var sum = 0;
        for (i = 0; i < size; i++) {
            sum += x[i] * y[i];
        }
        sum /= size;

        return sum - avg(x, size) * avg(y, size);
    }

    pearson(x, y, size) {
        var a = (float)(cov(x, y, size) / (Math.Sqrt(vari(x, size)) * Math.Sqrt(vari(y, size))));
        return a;
    }

    linear_reg(points, size) {
        var x = new float[size];
        var y = new float[size];
        for (i = 0; i < size; i++) {
            x[i] = points[i].x;
            y[i] = points[i].y;
        }
        var a = cov(x, y, size) / vari(x, size);
        var b = avg(y, size) - a * avg(x, size);
        line = new Line(a, b);
        return line;
    }

    dev(p, points, size) {
        var l = linear_reg(points, size);
        return dev(p, l);
    }

    dev(p, l) {
        var x = p.y - l.f(p.x);
        if (x < 0)
            x *= -1;
        return x;
    }
}
module.exports = anomaly_detection_util;