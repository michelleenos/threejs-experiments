precision mediump float;

float PI = 3.1415926;

uniform vec2 uMouse;
uniform vec2 uCamSize;
uniform float uPixelRatio;
uniform vec2 uResolution;
uniform float uTime;

varying vec4 vTestPosition;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  vec2 resolution = uResolution * uPixelRatio;
  vec2 st = gl_FragCoord.xy / resolution.xy;
  st.y *= resolution.y / resolution.x;

  vec2 mouse = uMouse;
  mouse *= 0.5;
  mouse += 0.5;
  mouse.y *= resolution.y / resolution.x;

  float d = distance(st, mouse);
  d = smoothstep(0.0, 0.2, d);
  d *= 2.0;

  vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0), d);
  color = vec3(fract(vTestPosition.x), 0.0, 1.0);
  gl_FragColor = vec4(color, strength);
}