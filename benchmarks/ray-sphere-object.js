// Not inlined at all. This is the canonical version ported verbatim from the
// C++ source code in ray-sphere.cc.

// This version differs from ray-sphere-factored in that it uses objects rather
// than arrays.

var epsilon = 1.0e-8;

var dot = function (v1, v2) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

var intersection_distance = function (r, center, radius) {
  var relative_center = {x: center.x - r.p.x, y: center.y - r.p.y, z: center.z - r.p.z};
  var center_dot_direction = dot(relative_center, r.d);
  var center_dot_center    = dot(relative_center, relative_center);
  var radius_squared       = radius * radius;
  var sqrt_term            = center_dot_direction * center_dot_direction - center_dot_center + radius_squared;

  if (sqrt_term > 0) {
    var root = Math.sqrt(sqrt_term);
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
var r = {p: {x: 1.0, y: 2.0, z: 3.0}, d: {x: 0.0, y: 0.0, z: 1.0}};
var center = {x: 3.0, y: 4.0, z: 100.0};
var radius = 30;
for (var i = 0, l = 1000 * 1000; i < l; ++i) {
  r.d.z += 0.000000001;
  if (i & 1) total_distance += intersection_distance(r, center, radius);
  else       total_distance -= intersection_distance(r, center, radius);
}
console.log(total_distance);
