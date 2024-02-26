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

  gl_FragColor = vec4(vec3(1.0), strength);
}