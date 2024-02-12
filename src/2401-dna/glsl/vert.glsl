precision mediump float;

uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
uniform float uNoiseResolution;

uniform float uSpeed;
uniform float uNoiseRadius;
uniform float uSquishMain;
uniform float uSquishMiddle;
uniform float uScaleMain;
uniform float uScaleMiddle;
uniform float uRadius;

uniform float uMousePow;
uniform float uMouseMult;

uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uMouseVel;
// uniform float uMouseVelMax;
uniform float uMaxDistort;
uniform float uMouseAngle;

attribute float aScale;
attribute float aMiddleWeight;

varying vec4 vTestPosition;

#define PI 3.14159265358979323846

#include "../../_glsl/snoise3d.glsl"

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 getSphereNoise(vec4 pos) {
  float phi = snoise3d(pos.xyz * uNoiseResolution + uTime * uSpeed) * PI * 2.0;
  float theta =
      snoise3d(pos.xyz * uNoiseResolution - uTime * uSpeed) * PI * 2.0;

  vec3 noise =
      normal + vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
  noise *= uNoiseRadius;

  return noise;
}

vec3 mouseDisortFrom3Points(vec4 pos, vec3 mouse1, vec3 mouse2, vec3 mouse3) {
  float dist1 = distance(mouse1, pos.xyz);
  float dist2 = distance(mouse2, pos.xyz);
  float dist3 = distance(mouse3, pos.xyz);
  float dist = min(dist1, min(dist2, dist3));
  dist = clamp(dist, 0.0, 1.0);
  return (1.0 - dist) * 0.5 * normal;
}

vec2 clipToScreenSpace(vec4 pos, vec2 resolution) {
  vec2 screenPos = pos.xy / pos.w;
  screenPos.xy = screenPos.xy * 0.5 + 0.5;
  screenPos.y *= resolution.y / resolution.x;
  return screenPos;
}

vec4 screenToClipSpace(vec2 screenPos, vec4 pos, vec2 resolution) {
  screenPos.y /= resolution.y / resolution.x;
  pos.xy = screenPos * 2.0 - 1.0;
  pos.xy *= pos.w;
  return pos;
}

void main() {

  // make the whole thing a bit thinner (middle bars are smaller)
  vec4 pos = vec4(position, 1.0);
  pos.xyz -= normal * (uSquishMiddle * (aMiddleWeight));
  pos.xyz -= normal * (uSquishMain * (1.0 - aMiddleWeight));

  // add noise
  vec3 noise = getSphereNoise(pos);
  pos.xyz -= noise;

  // general position calculations
  vec4 modelPosition = modelMatrix * pos;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // mouse calculations
  vec2 resolution = uResolution * uPixelRatio;
  vec2 mouse = uMouse;
  mouse = mouse * 0.5 + 0.5;
  mouse.y *= resolution.y / resolution.x;

  // translate position to screen coords
  vec2 screenPos = clipToScreenSpace(projectedPosition, resolution);

  // mouse distortion
  float d = distance(screenPos, mouse);
  d = smoothstep(0.0, uRadius, d);
  d = 1.0 - d;
  d = pow(d, uMousePow);

  vec2 distort = vec2(cos(uMouseAngle), sin(uMouseAngle));
  float amount = d * uMouseMult * uMouseVel;
  amount = clamp(amount, 0.0, uMaxDistort);
  distort *= amount;
  screenPos -= distort - distort * noise.xy;

  // send this to fragment shader to test values
  vTestPosition = vec4(d, screenPos.x, 0.0, 1.0);

  gl_Position = screenToClipSpace(screenPos, projectedPosition, resolution);

  // scale, using weight attribute
  float scale = mix(uScaleMain, uScaleMiddle, aMiddleWeight);
  scale *= aScale;
  scale *= uSize * uPixelRatio;
  scale *= (1.0 / -viewPosition.z);
  gl_PointSize = scale;
}