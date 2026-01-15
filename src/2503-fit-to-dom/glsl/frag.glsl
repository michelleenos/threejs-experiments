varying vec2 vUv;

void main() {
	vec2 uv = vUv;
	float yval = fract(uv.y * 5.0);
	gl_FragColor = vec4(uv.y, yval, 0.5, 1.0);
}