precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;

uniform float u_speed;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform float u_time;

uniform vec3 u_c1;
uniform vec3 u_c2;

float PI = 3.1415926;

#include "../../../_glsl/lygia/generative/pnoise.glsl"

void main() {
  vec3 pos = position;

  pos.xy += sin(u_time * 0.5 - pos.y * 0.5 + cos(pos.x * 0.2 - u_time * 0.5));

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  float d = distance(modelPosition.xyz, u_c1);
  float displace = 1.0 - step(1.0, d);
  float angle = atan(modelPosition.y - u_c1.y, modelPosition.x - u_c1.x);
  float radius = 1.0;
  float x = (radius - d) * cos(angle + u_time * u_speed) * displace;
  float z = (radius - d) * sin(angle + u_time * u_speed) * displace;
  modelPosition.x += x;

  modelPosition.z += abs(z);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPos = projectionMatrix * viewPosition;

  // vec4 newModelPosition = modelMatrix * vec4(newPos, 1.0);
  // vec4 newViewPosition = viewMatrix * newModelPosition;
  // vec4 newProjectedPos = projectionMatrix * newViewPosition;
  // projectedPos = newProjectedPos;

  gl_PointSize = 0.05 * u_res.y;
  gl_PointSize *= (1.0) / (-viewPosition.z);
  gl_Position = projectedPos;
}