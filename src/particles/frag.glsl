precision mediump float;

// uniform vec3 u_color;
uniform vec3 u_mouse;

float PI = 3.1415926;

varying float v_dist;
varying float v_toPointsCenter;

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 convertrgb(vec3 rgb) {
	return vec3( rgb.r / 255.0, rgb.g / 255.0, rgb.b / 255.0 );
}

void main() {

	vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
	if ( length(toCenter) > 0.5 ) discard;
	float alpha = 1.0 - length(toCenter) * 2.0;
	
	float pointsdist = v_toPointsCenter;
	pointsdist = smoothstep(0.8, 0.0, pointsdist);
	pointsdist *= exp(pointsdist);
	pointsdist = min(1.0, pointsdist);

	alpha *= pointsdist;

	// float g = 1.0 - v_dist * 2.0;
	// float r = (1.0 - v_dist * 2.0) * 0.4;
	// float b = 0.5;

	vec3 greenish = vec3(120.0, 242.0, 205.0);
	vec3 color1 = convertrgb(greenish);

	vec3 purpley = vec3(129.0, 116.0, 200.0);
	vec3 color2 = convertrgb(purpley);

	float dist = v_dist * 2.0;

	vec3 color = mix(color1, color2, dist);

	gl_FragColor = vec4( color, alpha );

}