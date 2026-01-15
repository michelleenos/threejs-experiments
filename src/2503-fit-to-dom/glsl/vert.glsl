varying vec2 vUv;
varying vec3 vPosition;
varying vec4 vViewPosition;
varying vec4 vProjectionPosition;
varying vec3 vNormal;

void main() {
	vPosition = position;
	vNormal = normal;

	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	vec4 viewPosition = viewMatrix * modelPosition;
	vViewPosition = viewPosition;

	vec4 projectionPosition = projectionMatrix * viewPosition;
	vProjectionPosition = projectionPosition;

	gl_Position = projectionPosition;

	vUv = uv;
}