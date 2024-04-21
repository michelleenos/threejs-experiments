precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

uniform float u_speed;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform float u_time;
uniform float u_petals;
uniform float u_amp;
uniform float u_zPow;
uniform float u_radius;
uniform float u_curve;
uniform float u_slice;
uniform float u_distortionFreq;
uniform float u_distortionAmp;
uniform float u_distortionSpeed;

uniform float u_scaleChange;
uniform float u_scaleBase;

varying float v_distortion;

varying vec2 v_uv;
varying vec3 v_color;
varying vec3 v_pos;

float PI = 3.1415926;

#include "../../../_glsl/lygia/generative/pnoise.glsl"

void main() {
  vec3 pos = position;

  float distortion = pnoise(vec2(cos(pos.x), sin(pos.y)) * u_distortionFreq +
                                u_time * u_distortionSpeed,
                            vec2(5.2, 3.4)) *
                     u_distortionAmp;
  v_distortion = distortion;
  // pos.z += distortion;

  vec2 uv2 = uv;
  float aspect = u_planeRes.x / u_planeRes.y;
  uv2.x *= aspect;
  float edge = (aspect - 1.0) * 0.5;
  uv2.x -= edge;

  float rz = uv.y;
  float theta = (uv.x) * (u_slice * PI * 2.0);

  // https://github.com/nopjia/particles/blob/master/app/shaders/chunks/SimRoseGalaxy.glsl
  // float radius = vUv.y;
  // float theta = vUv.x * M_2PI;
  // radius *= M_PI;

  // vec3 targetPos = vec3(
  // radius * sin(theta),
  // radius*radius * sin(4.0*theta + sin(3.0*M_PI*radius+uTime/2.0)) / 10.0,
  // radius * cos(theta)
  // );

  float zpos = pow(rz, u_zPow) *
               sin(u_petals * theta +
                   sin((u_curve + distortion) * PI * rz + u_time * u_speed)) *
               u_amp;

  vec3 targetPos = vec3(rz * sin(theta), rz * cos(theta), zpos);

  vec3 toTarget = targetPos - pos;
  float len = length(toTarget);

  // float distortion = snoise(pos.xy * len + u_time * 0.2) * 0.9;

  pos = targetPos;
  v_uv = uv;
  pos.xy *= u_planeRes / 2.0;

  v_pos = pos;

  // pos += sin(pos.x * distortion * 0.3);

  v_color = mix(u_color1, u_color2, uv.y);
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPos = projectionMatrix * viewPosition;

  float scaleChange = (position.z - pos.z) * u_scaleChange;

  gl_PointSize = (u_scaleBase - scaleChange) * u_res.y;
  gl_PointSize *= (1.0) / (-viewPosition.z);
  // gl_PointSize
  gl_Position = projectedPos;
}