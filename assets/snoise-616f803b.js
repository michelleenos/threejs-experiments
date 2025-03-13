var n=`precision mediump float;

float PI = 3.1415926;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec2 u_mouse;

uniform float u_alphaOffsetStart;
uniform float u_alphaOffsetEnd;

varying vec3 v_color;
varying float v_toPlaneCenter;
varying float v_toMouse;

void main() {

  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0;
  float ctrOffset = 1.0 - v_toPlaneCenter;
  alpha = smoothstep(u_alphaOffsetStart, u_alphaOffsetEnd, ctrOffset);

  gl_FragColor = vec4(v_color, alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`;export{n as default};
