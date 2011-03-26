// Identical to ray-sphere-factored.js, but with the sqrt() method aliased as
// a local variable (to avoid the hash lookup).

var epsilon = 1.0e-8;

var dot = function (v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

var sqrt = Math.sqrt;

var intersection_distance = function (r, center, radius) {
  var relative_center = [center[0] - r[0][0], center[1] - r[0][1], center[2] - r[0][2]];
  var center_dot_direction = dot(relative_center, r[1]);
  var center_dot_center    = dot(relative_center, relative_center);
  var radius_squared       = radius * radius;
  var sqrt_term            = center_dot_direction * center_dot_direction - center_dot_center + radius_squared;

  if (sqrt_term > 0) {
    var root = sqrt(sqrt_term);
    var s1   = center_dot_direction - root;
    if (s1 <= epsilon) {
      var s2 = center_dot_direction + root;
      if (s2 > epsilon) return s2;
      else              return 0.0;
    } else {
      return s1;
    }
  } else {
    return 0.0;
  }
}

var total_distance = 0.0;
var r = [[1.0, 2.0, 3.0], [0.0, 0.0, 1.0]];
var center = [3.0, 4.0, 100.0];
var radius = 30;
for (var i = 0, l = 1000 * 1000; i < l; ++i) {
  r[1][2] += 0.000000001;
  if (i & 1) total_distance += intersection_distance(r, center, radius);
  else       total_distance -= intersection_distance(r, center, radius);
}
console.log(total_distance);
