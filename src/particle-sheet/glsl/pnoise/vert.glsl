precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform vec2 u_mouse;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

uniform vec3 u_variant1;
uniform vec3 u_variant2;
uniform vec3 u_variant3;
uniform float u_res1;
uniform float u_res2;
uniform float u_res3;
uniform float u_amt1;
uniform float u_amt2;
uniform float u_amt3;
uniform float u_useSine;
uniform float u_useUvs;
uniform float u_scaleChange;
uniform float u_scaleBase;
uniform float u_speed;

varying vec3 v_color;
varying float v_colorMix;
varying float v_toPlaneCenter;
varying float v_toMouse;

float PI = 3.1415926;

// #include "../../../_glsl/lygia/generative/voronoise.glsl"
#include "../../../_glsl/lygia/animation/easing"
#include "../../../_glsl/lygia/generative/pnoise.glsl"

void main() {
  vec3 pos = position;

  vec2 uv2 = uv;
  float aspect = u_planeRes.x / u_planeRes.y;
  uv2.x *= aspect;
  float edge = (aspect - 1.0) * 0.5;
  uv2.x -= edge;

  // ***** Calculations ***** //

  float dcenter = length(uv2 - vec2(0.5));
  float dmouse = length(uv2 - u_mouse);
  v_toPlaneCenter = dcenter;
  v_toMouse = dmouse;

  vec3 newpos = position;

  vec3 n = vec3(0.0, 0.0, 0.0);
  if (u_useUvs == 1.0) {
    n.x = pnoise(vec3(pos.xyz * u_res1 + u_time * u_speed), u_variant1);
    n.y = pnoise(vec3(pos.yxz * u_res2 + u_time * u_speed), u_variant2);
    n.z = pnoise(vec3(pos.zyx * u_res3 + u_time * u_speed), u_variant3);
  } else {
    n.x = pnoise(vec3(uv.xy * u_res1, u_time * u_speed), u_variant1);
    n.y = pnoise(vec3(uv.yx * u_res2, u_time * u_speed), u_variant2);
    n.z = pnoise(vec3(uv.xy * u_res3, u_time * u_speed), u_variant3);
  }

  vec3 amt = vec3(u_amt1, u_amt2, u_amt3);
  if (u_useSine == 1.0) {
    newpos += sin(n * PI * 2.0) * amt;
  } else {
    newpos += n * amt;
  }

  float scaleChange = min(u_scaleChange * (pos.z - newpos.z), u_scaleBase);

  // ***** Values ***** //
  vec4 modelPosition = modelMatrix * vec4(newpos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  v_colorMix = uv.x;
  vec3 colorleft =
      mix(u_color1, u_color2, quadraticIn(smoothstep(0.0, 0.5, uv.x)));
  vec3 colorright =
      mix(u_color2, u_color3, quadraticOut(smoothstep(0.5, 1.0, uv.x)));
  v_color = mix(colorleft, colorright, step(0.5, uv.x));

  gl_PointSize = (u_scaleBase - scaleChange) * u_res.y;
  gl_PointSize *= 1.0 / -viewPosition.z;

  gl_Position = projectedPosition;
}