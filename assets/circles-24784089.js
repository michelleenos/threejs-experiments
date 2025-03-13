var o=`precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

varying vec3 v_color;
varying float v_distortion;
varying vec2 v_uv;
varying vec3 v_pos;

void main() {
  float colorDistort = 0.5;
  float colorDistortMultiplier = 1.5;

  vec3 baseColor1 =
      mix(u_color2, u_color3, (v_uv.x + colorDistort) * colorDistortMultiplier);
  vec3 baseColor = mix(u_color1, baseColor1,
                       (v_uv.y + colorDistort) * colorDistortMultiplier);

  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5)
    discard;

  gl_FragColor = vec4(v_color, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`;export{o as default};
