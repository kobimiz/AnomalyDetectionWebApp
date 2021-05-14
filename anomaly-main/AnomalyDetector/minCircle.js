module.exports.minCircle = this.minCircle;
// import
const enclosingCircle = require('smallest-enclosing-circle')
// creational
let circle = enclosingCircle(arrPoints);

// class Circle
// {
//     center;
//     radius;
//     Circle(c, r)
//     {
//         this.center = c;
//         this.radius = r;
//     }


//     // Calculating the center of the circle created by three points, using the cartesian coordinates method.
//     // The radius is the distance between any of the points and the center.
//     getCircleFromThreePoints(a, b, c)
//     {
//         d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
//         xc = ((a.x * a.x + a.y * a.y) * (b.y - c.y) + (b.x * b.x + b.y * b.y) * (c.y - a.y) +
//                     (c.x * c.x + c.y * c.y) * (a.y - b.y)) / d;
//         yc = ((a.x * a.x + a.y * a.y) * (c.x - b.x) + (b.x * b.x + b.y * b.y) * (a.x - c.x) +
//                     (c.x * c.x + c.y * c.y) * (b.x - a.x)) / d;
//         rad = Math.Sqrt(Math.Pow(xc - a.x, 2) + Math.Pow(yc - a.y, 2));
//         circle = new Circle(new Point(xc, yc), rad);
//         return circle;
//     }

//     // Finding the circle from two points by the radius they creates and middle between them is the middle of the circle.
//     getCircleFromTwoPoints(a, b)
//     {
//         rad = Math.Sqrt(Math.Pow(a.x - b.x, 2) + Math.Pow(a.y - b.y, 2)) / 2;
//         xCen = (a.x + b.x) / 2;
//         yCen = (a.y + b.y) / 2;
//         circle = new Circle(new Point(xCen, yCen), rad);
//         return circle;
//     }

//     // Checks whether a given point is inside a given circle.
//     isPointInCircle(p, c)
//     {
//         if (Math.Pow((p.x - c.center.x), 2) + Math.Pow((p.y - c.center.y), 2) <= Math.Pow(c.radius, 2))
//             return true;
//         return false;
//     }

//     // Finding the minimum circle contain all the given points by using Emo Welzl's algorithm.
//     findMinCircleRec(points, n, newPoints)
//     {
//         // case newPoints contains only three points or we already checked recursively all the given points.
//         nPointsSize = newPoints.Count;
//         if (nPointsSize == 3 || n == 0)
//         {
//             if (nPointsSize == 0 || nPointsSize == 1)
//                 return new Circle(new Point(0, 0), 0);
//             // newPoints contain only two points so we're making a circle of them.
//             if (nPointsSize == 2)
//                 return getCircleFromTwoPoints(newPoints[0], newPoints[1]);
//             // Checking whether a circle can made by two points (out of the three).
//             circleAB = getCircleFromTwoPoints(newPoints[0], newPoints[1]);
//             if (isPointInCircle(newPoints[2], circleAB))
//                 return circleAB;
//             circleAC = getCircleFromTwoPoints(newPoints[0], newPoints[2]);
//             if (isPointInCircle(newPoints[1], circleAC))
//                 return circleAC;
//             circleBC = getCircleFromTwoPoints(newPoints[1], newPoints[2]);
//             if (isPointInCircle(newPoints[0], circleBC))
//                 return circleBC;
//             // Couldn't make a circle from two points so we're making them out of the three.
//             return getCircleFromThreePoints(newPoints[0], newPoints[1], newPoints[2]);
//         }
//         // Generating a random index is more efficient than choosing a specific.
//         rnd = new Random();
//         randIndex = rnd.Next() % n;
//         p = points[randIndex];
//         // Vector's erase function not efficient enough so we're just swapping the chosen point and ignore it.
//         points[randIndex] = points[n - 1];
//         points[n - 1] = p;
//         c = findMinCircleRec(points, n - 1, newPoints);
//         // Case the point we "erased" isn't one of the creators (in the smallest circle borders), then we don't need it.
//         if (isPointInCircle(p, c))
//             return c;
//         // Case the point we "erased" outside of the circle created without it, we need to get it back.
//         newPoints.Add(p);
//         return findMinCircleRec(points, n - 1, newPoints);
//     }

//     // Finding the minimum circle containing all the given points.
//     findMinCircle(points, size)
//     {
//         return findMinCircleRec(points, size, new List<Point>());
//     }
// }