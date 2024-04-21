precision mediump float;

float PI = 3.1415926;

void main() {

  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}