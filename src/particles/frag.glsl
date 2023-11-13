precision mediump float;

// uniform vec3 u_color;
uniform vec3 u_mouse;

float PI = 3.1415926;

varying float v_dist;
varying float v_toPointsCenter;

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

	vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
	if ( length(toCenter) > 0.5 ) discard;
	float alpha = 1.0 - length(toCenter) * 2.0;
	
	float pointsdist = v_toPointsCenter;
	pointsdist = smoothstep(0.5, 0.0, pointsdist);
	pointsdist *= exp(pointsdist);
	pointsdist = min(1.0, pointsdist);
	// pointsdist *= 2.0;

	// pointsdist = abs(pointsdist);

	alpha *= pointsdist;


	float g = v_dist * 2.0;
	float r = 0.6 - v_dist * 2.0;
	float b = 1.0;

	gl_FragColor = vec4( r, g, b, alpha );


}