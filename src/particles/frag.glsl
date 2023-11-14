
float PI = 3.1415926;

uniform vec3 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying float v_dist;
varying float v_toPointsCenter;

void main() {

	vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
	if ( length(toCenter) > 0.5 ) discard;
	float alpha = 1.0 - length(toCenter) * 2.0;
	
	float pointsdist = v_toPointsCenter;
	pointsdist = smoothstep(0.8, 0.0, pointsdist);
	pointsdist *= exp(pointsdist);
	pointsdist = min(1.0, pointsdist);

	alpha *= pointsdist;

	float dist = v_dist * 2.0;

	vec3 color = mix(u_color1, u_color2, dist);
	gl_FragColor = vec4( color, alpha );

}