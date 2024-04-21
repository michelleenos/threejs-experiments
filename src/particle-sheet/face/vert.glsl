precision mediump float;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform vec2 u_mouse;

varying vec2 v_uv;
varying vec3 v_col;

const float PI = 3.14159265359;

attribute float a_speed;

#include "../../_glsl/lygia/generative/pnoise.glsl"

// float easeInSine(float t) { return 1.0 - cos((t * PI) * 0.5); }
float easeOutCubic(float t) { return 1.0 - pow(1.0 - t, 3.0); }

void main() {

  vec3 pos = position;
  vec2 uv = pos.xy / u_planeRes.x + 0.5;
  v_uv = uv;

  uv.y = 1.0 - uv.y;

  // pos.xy /= u_planeRes.xy;
  // pos.xy += 0.5;
  // pos.y = 1.0 - pos.y;

  // float d = length(pos.xy - vec2(pos.x, 0.0));
  // float theta = atan(pos.y, pos.x);

  float progress = smoothstep(0.0, 1.0, (u_time * 1.0) / a_speed);
  progress = easeOutCubic(progress);
  // progress = 1.0;
  uv.y *= progress;

  // convert back to pos
  // pos.y = 1.0 - pos.y;
  // pos.xy += vec2(-0.5, 0.5);
  uv.y = 1.0 - uv.y;
  v_col = vec3(u_mouse.x, u_mouse.y, 0.0);
  pos.xy = uv * u_planeRes.x - 0.5;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = (0.015 * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);
}