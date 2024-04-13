precision mediump float;

float PI = 3.1415926;

uniform vec3 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_alpha;
uniform vec2 u_planeRes;

varying vec3 v_color;
varying float v_dist;
varying vec2 v_uv;

void main() {

  vec2 uv = gl_FragCoord.xy / u_planeRes.xy;
  // uv.x *= u_planeRes.x / u_planeRes.y;
  // uv -= 0.5;
  // vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0;

  // vec3 color = mix(u_color1, u_color2, v_colorMix);

  // if (dist > 0.5)
  //   discard;
  // alpha2 = smoothstep(0.3, 0.4, alpha2);
  gl_FragColor = vec4(v_color, alpha * u_alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}