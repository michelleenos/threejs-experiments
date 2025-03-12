precision mediump float;

float PI = 3.1415926;

varying vec2 vUv;
varying vec3 vPosition;
varying vec4 vViewPosition;
varying vec4 vProjectionPosition;
varying vec3 vNormal;

uniform float uColorXLow;
uniform float uColorXHigh;

vec3 lightblue = vec3(0.0, 0.761, 0.757);
vec3 darkblue = vec3(0.0784, 0.0784, 0.761);

#include "../../_glsl/lygia/color/brightnessContrast.glsl"

float mapRange(float value, float low1, float high1, float low2, float high2) {
	return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

void main() {

	// float amount = mapRange(vPosition.x, -0.8, 0.8, 0.0, 1.0);

	float colorAmount =
		mapRange(vPosition.x, uColorXLow, uColorXHigh, 0.0, 1.0);
	vec3 mixColor = mix(lightblue, darkblue, colorAmount);

	float normalAmount = mapRange(vNormal.y, -1.0, 1.0, 0.0, 0.5);

	mixColor = brightnessContrast(mixColor, normalAmount * -0.5, 1.0);

	gl_FragColor = vec4(mixColor, 1.0);

	// float debg = step(-0.5, vNormal.y);
	// gl_FragColor = vec4(debg, 0.0, 0.0, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}