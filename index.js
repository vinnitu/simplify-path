var simplifyRadialDist = require('./radial-distance')
var simplifyDouglasPeucker = require('./douglas-peucker')

module.exports = function simplify(points, tolerance, highestQuality) {
    if (points.length <= 2) return points;

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

module.exports.radialDistance = simplifyRadialDist;
module.exports.douglasPeucker = simplifyDouglasPeucker;
