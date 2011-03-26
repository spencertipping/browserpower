// Identical to ray-sphere-factored, but the dot() function has been inlined.

var epsilon = 1.0e-8;

var intersection_distance = function (r, center, radius) {
  var relative_center      = [center[0] - r[0][0], center[1] - r[0][1], center[2] - r[0][2]];
  var center_dot_direction = relative_center[0] * r[1][0] + relative_center[1] * r[1][1] + relative_center[2] * r[1][2];
  var center_dot_center    = relative_center[0] * relative_center[0] + relative_center[1] * relative_center[1] + relative_center[2] * relative_center[2];
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
var r = [[1.0, 2.0, 3.0], [0.0, 0.0, 1.0]];
var center = [3.0, 4.0, 100.0];
var radius = 30;
for (var i = 0, l = 1000 * 1000; i < l; ++i) {
  r[1][2] += 0.000000001;
  if (i & 1) total_distance += intersection_distance(r, center, radius);
  else       total_distance -= intersection_distance(r, center, radius);
}
console.log(total_distance);
