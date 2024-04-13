precision mediump float;

float PI = 3.1415926;

varying vec2 v_uv;

varying float v_demo;

void main() {

  vec2 uv = v_uv;
  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0 - distanceToCenter * 2.0;

  vec3 color = vec3(v_demo, v_demo, 1.0);
  gl_FragColor = vec4(color, alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}