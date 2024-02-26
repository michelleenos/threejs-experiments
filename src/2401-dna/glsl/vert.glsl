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

attribute float aScale;
attribute float aMiddleWeight;
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

  gl_Position = projectedPosition;

  // scale, using weight attribute
  float scale = mix(uScaleMain, uScaleMiddle, aMiddleWeight);
  scale *= aScale;
  scale *= uSize * uPixelRatio;
  scale *= (1.0 / -viewPosition.z);
  gl_PointSize = scale;
}