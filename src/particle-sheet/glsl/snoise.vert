precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform vec2 u_mouse;
uniform float u_useMouse;

uniform vec3 u_color1;
uniform vec3 u_color2;

uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseSpeed;
uniform float u_noiseAsTarget;
uniform float u_targetPower;
uniform float u_circleWaveFreq;
uniform float u_circleWaveSpeed;
uniform float u_circleWaveAmp;

uniform float u_scaleChange;

uniform float u_mixOklab;

varying vec3 v_color;
varying float v_colorMix;
varying float v_toPlaneCenter;
varying float v_toMouse;

float PI = 3.1415926;

#include "../../_glsl/lygia/color/mixOklab.glsl"
#include "../../_glsl/lygia/generative/snoise.glsl"

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
  float circCenter = dcenter * (1.0 - u_useMouse) + dmouse * u_useMouse;
  v_toPlaneCenter = dcenter;
  v_toMouse = dmouse;
  float circle =
      sin(u_time * u_circleWaveSpeed - circCenter * u_circleWaveFreq) *
      u_circleWaveAmp;

  vec3 newpos = position;

  vec3 noise =
      snoise3(vec3(newpos * u_noiseFreq + u_time * u_noiseSpeed)) * u_noiseAmp;
  vec3 target = newpos + noise;
  float d = length(newpos - target);
  newpos = mix(newpos, target, pow(d, u_targetPower) * circle);

  float scaleChange = u_scaleChange * (pos.z - newpos.z);

  // ***** Values ***** //
  vec4 modelPosition = modelMatrix * vec4(newpos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  v_colorMix = uv.x;
  vec3 color_oklab = mixOklab(u_color1, u_color2, v_colorMix);
  vec3 color_normal = mix(u_color1, u_color2, v_colorMix);
  v_color = mix(color_normal, color_oklab, u_mixOklab);

  // float scaleChange = 0.0;
  gl_PointSize = (0.05 - scaleChange) * u_res.y;
  gl_PointSize *= 1.0 / -viewPosition.z;

  gl_Position = projectedPosition;
}