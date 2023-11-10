precision mediump float;

// uniform vec3 u_color;
uniform vec3 u_mouse;
varying float v_dist;

void main() {

	vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
	float alpha = 1.0 - length(toCenter) * 2.0;

	// if ( alpha < 0.02 ) discard;

	gl_FragColor  = vec4( 1.0, 0.3, 0.4, alpha );

}