// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
    var x = p1[0],
        y = p1[1],
        z = p1[2],
        dx = p2[0] - x,
        dy = p2[1] - y,
        dz = p2[2] - z;

    if (dx !== 0 || dy !== 0 || dz !== 0) {

        var t = ((p[0] - x) * dx + (p[1] - y) * dy + (p[2] - z) * dz) / (dx * dx + dy * dy + dz * dz);

        if (t > 1) {
            x = p2[0];
            y = p2[1];
            z = p2[2];

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
            z += dz * t;
        }
    }

    dx = p[0] - x;
    dy = p[1] - y;
    dz = p[2] - z;

    return dx * dx + dy * dy + dz * dz;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance,
        index;

    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
}

// simplification using Ramer-Douglas-Peucker algorithm
module.exports = function simplifyDouglasPeucker(points, tolerance) {
    if (points.length<=1)
        return points;
    tolerance = typeof tolerance === 'number' ? tolerance : 1;
    var sqTolerance = tolerance * tolerance;
    
    var last = points.length - 1;

    var simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
}
