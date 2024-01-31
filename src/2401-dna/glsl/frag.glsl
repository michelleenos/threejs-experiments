precision mediump float;

float PI = 3.1415926;

uniform vec3 uMouse;
uniform vec2 uMouseScreen;
uniform vec2 uCamSizes;
uniform float uPixelRatio;
uniform vec2 uResolution;

varying float vDistMeasure;
varying vec4 vProjection;
varying vec4 vModelPosition;
varying vec4 vFakeFragCoord;
varying vec4 vViewPosition;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  // vec2 resolution = uResolution * uPixelRatio;
  // vec2 st = gl_FragCoord.xy / resolution.xy;
  // st.y += (resolution.y / resolution.x) * 0.5;
  // st.y *= resolution.y / resolution.x;
  // vec2 mouse = uMouseScreen;

  // mouse *= 0.5;
  // mouse += 0.5;
  // mouse.y += (resolution.y / resolution.x) * 0.5;
  // mouse.y *= resolution.y / resolution.x;

  // float d = distance(st, mouse);

  gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}