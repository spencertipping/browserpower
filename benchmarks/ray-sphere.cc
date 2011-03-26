#include<iostream>
#include<math.h>

using namespace std;

static const double epsilon = 1.0e-8;

typedef double v3[3];
typedef v3 ray[2];

inline double dot (const v3 v1, const v3 v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

inline double intersection_distance (const ray r, const v3 center, const double radius) {
  const v3 relative_center = {center[0] - r[0][0], center[1] - r[0][1], center[2] - r[0][2]};
  const double center_dot_direction = dot(relative_center, r[1]);
  const double center_dot_center    = dot(relative_center, relative_center);
  const double radius_squared       = radius * radius;
  const double sqrt_term            = center_dot_direction * center_dot_direction - center_dot_center + radius_squared;

  if (sqrt_term > 0) {
    const double root = sqrt(sqrt_term);
    const double s1   = center_dot_direction - root;
    if (s1 <= epsilon) {
      const double s2 = center_dot_direction + root;
      if (s2 > epsilon) return s2;
      else              return 0.0;
    } else {
      return s1;
    }
  } else {
    return 0.0;
  }
}

int main () {
  double total_distance = 0.0;
  ray r = {{1.0, 2.0, 3.0}, {0.0, 0.0, 1.0}};
  v3 center = {3.0, 4.0, 100.0};
  double radius = 30;
  for (int i = 0; i < 1000 * 1000; ++i) {
    r[1][2] += 0.000000001;
    if (i & 1) total_distance += intersection_distance(r, center, radius);
    else       total_distance -= intersection_distance(r, center, radius);
  }
  cout << total_distance << endl;
  return 0;
}
