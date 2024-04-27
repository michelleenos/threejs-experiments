precision mediump float;

float PI = 3.1415926;

uniform vec3 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec2 u_planeRes;

varying vec3 v_color;
varying float v_dist;
varying vec2 v_uv;

void main() {

  vec2 uv = gl_FragCoord.xy / u_planeRes.xy;
  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0;

  gl_FragColor = vec4(v_color, alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}