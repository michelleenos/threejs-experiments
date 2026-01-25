#include <fog_pars_vertex>

uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
uniform float uSpeed;
uniform float uMovement;
uniform float uRadius;

attribute float rotation;
varying float vRotation;

#include '../../_glsl/lygia/generative/snoise.glsl'

void main() {

	vRotation = rotation;

	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	vec3 movement = snoise3(vec4(modelPosition.xyz, uTime * uSpeed)) * uMovement;
	modelPosition.xyz += movement;
	// modelPosition.x += sin(uTime * uSpeed + modelPosition.y * 10.0) * uSize * uMovement;
	// modelPosition.y += cos(uTime * uSpeed + modelPosition.z * 10.0) * uSize * uMovement;
	// modelPosition.z += sin(uTime * uSpeed + modelPosition.x * 10.0) * uSize * uMovement;

	// specifically need to name this `mvPosition` or fog includes will break 
	vec4 mvPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * mvPosition;

	gl_Position = projectedPosition;
	gl_PointSize = uSize * uPixelRatio * 10.0;
	gl_PointSize *= (1.0 / -mvPosition.z);

	#include <fog_vertex>
}