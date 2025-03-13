var n=`precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec3 v_color;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5)
    discard;

  gl_FragColor = vec4(v_color, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`;export{n as default};
