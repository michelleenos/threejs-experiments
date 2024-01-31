precision mediump float;

float PI = 3.1415926;

uniform vec3 uMouse;
varying float vDistanceToMouse1;
varying float vDistanceToMouse2;
varying vec3 vPosition;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    // float distanceToMouse = distance(gl_FragCoord.xy, uMouse.xy);
    float d = min(vDistanceToMouse1, vDistanceToMouse2);

    gl_FragColor = vec4(vDistanceToMouse1, vDistanceToMouse2, 1.0, strength);
}