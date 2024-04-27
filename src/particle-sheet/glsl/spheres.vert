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

varying vec3 v_color;

#include "../../../_glsl/lygia/generative/random.glsl"
#include "../../../_glsl/lygia/generative/snoise.glsl"

void main() {
  vec3 pos = position;

  // float theta = uv.x * PI;
  // float phi = uv.y * PI - PI * 0.5;
  // float x = cos(theta) * sin(phi);
  // float y = sin(theta) * sin(phi);
  // float z = cos(phi);
  // pos = vec3(x, y, z);

  // pos.xy += sin(u_time * 0.5 - pos.y * 0.5 + cos(pos.x * 0.2 - u_time *
  // 0.5));

  vec3 c1 = vec3(0.5, 0.5, 0.0);
  float d = distance(uv.xy, c1.xy);
  float radius = 0.5;
  float displace = 1.0 - step(1.0, d);

  // float theta = (uv.y - c1.y) * PI * 2.0;

  float theta = snoise(vec3(sin(uv.x - 2.0), uv.y, u_time * 0.3)) * PI * 2.0;
  // float phi = (uv.x - c1.x) * PI * 2.0;
  float phi = snoise(vec3(sin(uv.y + 3.0), cos(uv.x + 3.0) + u_time * 0.01,
                          u_time * 0.15)) *
              PI * 2.0;

  float x = (radius)*cos(theta) * sin(phi);
  float y = (radius)*sin(theta) * sin(phi);
  float z = (radius)*cos(phi);

  if (d < 0.5) {
    pos.x = x;
    pos.y = y;
    pos.z = z;
  }

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  // modelPosition.y = step(1.0, d) * modelPosition.y + y;
  // modelPosition.z = step(1.0, d) * modelPosition.z + z;
  // modelPosition.xyz = vec3(x, y, z) + c1;
  // modelPosition.x += x;
  // modelPosition.y += y;
  // modelPosition.z += z;

  v_color = vec3(uv.x, uv.y, 1.0);

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