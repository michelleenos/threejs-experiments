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
uniform float uDoMouseDistort;

uniform vec3 uMouse1;
uniform vec3 uMouse2;
uniform vec3 uMouse3;
uniform vec2 uMouseScreen;
uniform vec2 uResolution;

attribute float aScale;
attribute float aMiddleWeight;

#define PI 3.14159265358979323846

#include "../../_glsl/rotation3d.glsl"
#include "../../_glsl/snoise3d.glsl"

vec4 adjustedPosition(vec4 pos) {
  float phi = snoise3d(pos.xyz * uNoiseResolution + uTime * uSpeed) * PI * 2.0;
  float theta =
      snoise3d(pos.xyz * uNoiseResolution - uTime * uSpeed) * PI * 2.0;

  vec3 noise =
      normal + vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
  noise *= uNoiseRadius;
  pos.xyz -= noise;

  return pos;
}

void main() {
  vec4 pos = vec4(position, 1.0);
  pos.xyz -= normal * (uSquishMiddle * (aMiddleWeight));
  pos.xyz -= normal * (uSquishMain * (1.0 - aMiddleWeight));
  pos = adjustedPosition(pos);

  vec4 modelPosition = modelMatrix * pos;
  float dist1 = distance(uMouse1, modelPosition.xyz);
  float dist2 = distance(uMouse2, modelPosition.xyz);
  float dist3 = distance(uMouse3, modelPosition.xyz);
  float dist = min(dist1, min(dist2, dist3));
  dist = clamp(dist, 0.0, 1.0);
  vec3 distort = (1.0 - dist) * 0.5 * normal;
  distort *= uDoMouseDistort;
  modelPosition.xyz += distort;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  float scale = mix(uScaleMain, uScaleMiddle, aMiddleWeight);
  scale *= aScale;
  scale *= uSize * uPixelRatio;
  scale *= (1.0 / -viewPosition.z);

  gl_Position = projectedPosition;
  gl_PointSize = scale;
}