precision mediump float;

uniform float u_time;
uniform vec2 u_res;

void main() {

  vec3 pos = position;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 0.1 * u_res.y;
  gl_PointSize *= (1.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;
}