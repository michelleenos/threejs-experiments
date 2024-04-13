precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;

uniform float u_showPosX;
uniform float u_showPosY;

uniform float u_showModelPosX;
uniform float u_showModelPosY;
uniform float u_showModelPosZ;

uniform float u_showViewPosX;
uniform float u_showViewPosY;
uniform float u_showViewPosZ;

uniform float u_showProjPosX;
uniform float u_showProjPosY;
uniform float u_showProjPosZ;

uniform float u_showNewUvX;
uniform float u_showNewUvY;

uniform float u_showNewUv2X;
uniform float u_showNewUv2Y;

uniform float u_showUvX;
uniform float u_showUvY;

uniform float u_useFract;

varying vec2 v_uv;
varying float v_demo;

float PI = 3.1415926;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  v_uv = uv;
  vec3 pos = position;

  vec2 newUv = pos.xy / u_planeRes.xy;
  newUv += vec2(0.5);
  float aspect = u_planeRes.x / u_planeRes.y;
  newUv.x *= aspect;
  float edge = (aspect - 1.0) * 0.5;
  newUv.x -= edge;

  vec2 newUv2 = pos.xy / u_planeRes.xy;
  newUv2 += vec2(0.5);
  float aspect2 = u_planeRes.y / u_planeRes.x;
  newUv2.y *= aspect2;
  float edge2 = (aspect2 - 1.0) * 0.5;
  newUv2.y -= edge2;

  float demo_val = 0.0;
  demo_val += pos.x * u_showPosX;
  demo_val += pos.y * u_showPosY;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  demo_val += u_showModelPosX * modelPosition.x;
  demo_val += u_showModelPosY * modelPosition.y;
  demo_val += u_showModelPosZ * modelPosition.z;

  vec4 viewPosition = viewMatrix * modelPosition;

  demo_val += u_showViewPosX * viewPosition.x;
  demo_val += u_showViewPosY * viewPosition.y;
  demo_val += u_showViewPosZ * viewPosition.z;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  demo_val += u_showProjPosX * projectedPosition.x;
  demo_val += u_showProjPosY * projectedPosition.y;
  demo_val += u_showProjPosZ * projectedPosition.z;

  // demo_val = newUv.x;
  demo_val += u_showNewUvX * newUv.x;
  demo_val += u_showNewUvY * newUv.y;

  demo_val += u_showNewUv2X * newUv2.x;
  demo_val += u_showNewUv2Y * newUv2.y;

  demo_val += u_showUvX * uv.x;
  demo_val += u_showUvY * uv.y;

  gl_PointSize = (0.15 * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);

  if (u_useFract > 0.5) {
    v_demo = fract(demo_val);
  } else {
    v_demo = demo_val;
  }

  gl_Position = projectedPosition;
}