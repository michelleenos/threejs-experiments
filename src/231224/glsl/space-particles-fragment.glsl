#include <fog_pars_fragment>

uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uRotateSprite;

varying float vRotation;

#define PI 3.14159265358979323846

mat2 rotate2d(float angle) {
	float s = sin(angle);
	float c = cos(angle);
	return mat2(c, -s, s, c);
}

void main() {

	vec2 uv = gl_PointCoord;
	uv -= 0.5;
	uv *= rotate2d(vRotation * uRotateSprite);
	uv += 0.5;
	vec4 image = texture2D(uTexture, uv);
	gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
	gl_FragColor = vec4(uColor, image.a * uOpacity);

	#include <colorspace_fragment>
	#include <tonemapping_fragment>
	#include <fog_fragment>
}