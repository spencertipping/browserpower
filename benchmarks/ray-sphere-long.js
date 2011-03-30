// Inlined like crazy. The goal is to find the limit of Javascript numerical
// performance on optimally-unboxed structures.

var total_distance = 0.0;

var epsilon        = 1.0e-8;

var ray_sx         = 1.0;
var ray_sy         = 2.0;
var ray_sz         = 3.0;
var ray_dx         = 0.0;
var ray_dy         = 0.0;
var ray_dz         = 1.0;

var sphere_x       = 3.0;
var sphere_y       = 4.0;
var sphere_z       = 100.0;
var sphere_r       = 30.0;

var distance       = 0.0;

var rcx            = 0.0;       // Sphere relative center
var rcy            = 0.0;
var rcz            = 0.0;

var c_dot_d        = 0.0;
var c_dot_c        = 0.0;
var radius_squared = 0.0;
var sqrt_term      = 0.0;
var root           = 0.0;

var s1             = 0.0;
var s2             = 0.0;

// Unrolled by a factor of 8
for (var i = 0; i < 12500000; ++i) {
  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance -= distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance += distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance -= distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance += distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance -= distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance += distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance -= distance;
  // End single iteration

  // Begin single iteration
  ray_dz += 0.000000001;

  rcx = sphere_x - ray_sx;
  rcy = sphere_y - ray_sy;
  rcz = sphere_z - ray_sz;

  c_dot_d = rcx * ray_dx + rcy * ray_dy + rcz * ray_dz;
  c_dot_c = rcx * rcx + rcy * rcy + rcz * rcz;

  radius_squared = sphere_r * sphere_r;
  sqrt_term = c_dot_d * c_dot_d - c_dot_c + radius_squared;

  if (sqrt_term > 0) {
    root = Math.sqrt(sqrt_term);
    s1   = c_dot_d - root;
    if (s1 <= epsilon) {
      s2 = c_dot_d + root;
      if (s2 > epsilon) distance = s2;
      else              distance = 0.0;
    } else {
      distance = s1;
    }
  } else {
    distance = 0.0;
  }

  total_distance += distance;
  // End single iteration
}

/*(function () {
var l = typeof console === 'undefined' ? print : function (x) {console.log(x)};
l(total_distance);
})();*/
console.log(total_distance);
