// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
    var vs = p1.map(v => v),
        ds = p2.map((v, i) => v - vs[i]);

    if (ds.find(d => d !== 0)) {

        var t = p.reduce((v, acc, i) => (v - vs[i]) * ds[i] + acc, 0) / ds.reduce((d, acc) => d * d + acc, 0);

        if (t > 1) {
            vs = p2.map(v => v);
        } else if (t > 0) {
            vs = vs.map((v, i) => v + ds[i] * t);
        }
    }

    ds = p.map((v, i) => v - vs[i]);

    return ds.reduce((d, acc) => d * d + acc, 0);
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
