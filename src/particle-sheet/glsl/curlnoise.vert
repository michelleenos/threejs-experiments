precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;

uniform vec3 u_color1;
uniform vec3 u_color2;

uniform float u_noiseFreq;
uniform float u_noiseAmp;
uniform float u_noiseSpeed;
uniform float u_noiseIterations;

uniform vec2 u_waveFreq;
uniform vec2 u_waveAmp;
uniform vec2 u_waveSpeed;

uniform float u_scaleChangeAmt;

uniform float u_mixOklab;

varying vec3 v_color;
varying float v_colorMix;
varying float v_dist;

float PI = 3.1415926;

#include "../../_glsl/lygia/color/mixOklab.glsl"
#include "../../_glsl/lygia/generative/curl.glsl"

void main() {
  vec3 pos = position;
  v_colorMix = uv.x;

  // ***** Calculations ***** //
  vec3 noise = vec3(0.0);

  for (float i = 1.0; i <= u_noiseIterations; i++) {
    vec3 n = curl(pos * u_noiseFreq * (i * 0.5) + u_time * u_noiseSpeed * i) *
             u_noiseAmp / i;
    noise += n;
    pos += n;
  }
  vec3 newpos = pos;
  float d = length(pos.xy - position.xy);
  newpos.z -= d;
  // newpos.z += noise.z * 15.0;

  vec4 modelPosition = modelMatrix * vec4(newpos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  float scaleChange = u_scaleChangeAmt * (pos.z - newpos.z);

  // ***** Values ***** //

  if (u_mixOklab == 1.0) {
    v_color = mixOklab(u_color1, u_color2, v_colorMix);
  } else {
    v_color = mix(u_color1, u_color2, v_colorMix);
  }

  gl_PointSize = ((0.05 - scaleChange) * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);

  gl_Position = projectedPosition;
}