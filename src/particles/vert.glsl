precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec3 u_mouse;
uniform vec3 u_res;

varying float v_dist;

void main() {
	vec3 pos = position;

	float d = distance(u_mouse, pos );
	float furthest = u_res.x / u_res.y * 2.0;
	d /= furthest;
	v_dist = d;

	float adjust = sin(u_time);
	pos.x += adjust * d * 30.0;

	// pos.y -= d * 0.1;

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize = scale * ( 300.0  / - mvPosition.z ) * 5.0;

	gl_Position = projectionMatrix * mvPosition;
}