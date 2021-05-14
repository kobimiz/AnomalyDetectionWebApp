const SimpleAnomalyDetector = require('./SimpleAnomalyDetector')

class HybridAnomalyDetector extends SimpleAnomalyDetector {
    constructor(threshold) {
        super(threshold);
    }

    cirCorr(cf, points, size) {
        var minCircle = new Circle(new Point(0, 0), 0);
        var circle = minCircle.findMinCircle(points, size);
        cf.centerX = circle.center.x;
        cf.centerY = circle.center.y;
        cf.rad = circle.radius;
        cf.threshold = (float)(cf.rad * 1.1);
        cf.isCircle = true;
        this.cf.Add(cf);
    }

    isAnomalous(cf, point) {
        if (!cf.isCircle) {
            return isAnomalous(cf, point);
        }

        else {
            cor = Math.Sqrt(Math.Pow(point.x - cf.centerX, 2) + Math.Pow(point.y - cf.centerY, 2));
            if (cor > cf.threshold)
                return true;
        }
        return false;
    }
}

module.exports = HybridAnomalyDetector;