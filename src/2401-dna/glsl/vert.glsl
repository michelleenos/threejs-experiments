uniform float uPixelRatio;
uniform float uSize;
uniform float uScaleMin;
uniform float uScaleMax;
uniform float uTime;
uniform float uPhiMult;
uniform float uThetaMult;
uniform float uSpeed;
uniform float uNoiseRadius;

attribute float aScale;

#define PI 3.14159265358979323846

#include "../../.glsl/rotation3d.glsl"

vec3 random3(vec3 c) {
  float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract(512.0 * j);
  j *= .125;
  r.x = fract(512.0 * j);
  j *= .125;
  r.y = fract(512.0 * j);
  return r - 0.5;
}
// https://thebookofshaders.com/edit.php#11/iching-03.frag
const float F3 = 0.3333333;
const float G3 = 0.1666667;
float snoise(vec3 p) {

  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));

  vec3 e = step(vec3(0.0), x - x.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);

  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0 * G3;
  vec3 x3 = x - 1.0 + 3.0 * G3;

  vec4 w, d;

  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);

  w = max(0.6 - w, 0.0);

  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);

  w *= w;
  w *= w;
  d *= w;

  return dot(d, vec4(52.0));
}

vec4 adjustedPosition(vec4 pos) {
   float phi = snoise(pos.xyz * uPhiMult + uTime * uSpeed) * PI;
   float theta = snoise(pos.xyz * uThetaMult - uTime * uSpeed) * PI;

   vec3 noise = vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
   noise *= uNoiseRadius;
   pos.xyz += noise;
   // pos.x += sin(phi) * cos(theta) * uNoiseRadius;
   // pos.y += sin(phi) * sin(theta) * uNoiseRadius;
   // pos.z += cos(phi) * uNoiseRadius;
   return pos;
}


void main() {

   vec4 pos = vec4(position, 1.0);
   pos = adjustedPosition(pos);

   vec4 modelPosition = modelMatrix * pos;
   // modelPosition = adjustedPosition(modelPosition);

   vec4 viewPosition = viewMatrix * modelPosition;
   // viewPosition *= rotation3d(vec3(0.0, 1.0, 0.0), uTime);
   // viewPosition.x += uAddViewPosX;

   vec4 projectedPosition = projectionMatrix * viewPosition;
   // projectedPosition.x += uAddFinalPosX;

   float scale = uScaleMin + (uScaleMax - uScaleMin) * aScale;
   scale *= uSize * uPixelRatio;
   scale *= (1.0 / - viewPosition.z);

   gl_Position = projectedPosition;
   gl_PointSize = scale;
}