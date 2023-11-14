precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec3 u_mouse;
uniform vec3 u_res;
uniform float u_strength;

varying float v_dist;
varying float v_toPointsCenter;

float PI = 3.1415926;


vec3 random3(vec3 c) {
  float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract(512.0 * j);
  j *= .125;
  r.x = fract(512.0 * j);
  j *= .125;
  r.y = fract(512.0 * j);
  return r - 0.5;
}
// https://thebookofshaders.com/edit.php#11/iching-03.frag
const float F3 = 0.3333333;
const float G3 = 0.1666667;
float snoise(vec3 p) {

  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));

  vec3 e = step(vec3(0.0), x - x.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);

  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0 * G3;
  vec3 x3 = x - 1.0 + 3.0 * G3;

  vec4 w, d;

  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);

  w = max(0.6 - w, 0.0);

  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);

  w *= w;
  w *= w;
  d *= w;

  return dot(d, vec4(52.0));
}

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

	vec3 pos = position;
	// vec3 mouse = u_mouse;

	// float toMouse = distance( pos, u_mouse );
	// float d = toMouse;
	// v_dist = d;


	// v_angle = atan( pos.z - mouse.z, pos.x - mouse.x ) + PI;
	// v_posangle = atan( pos.z, pos.x ) + PI;

	// // pos += vec3(cos(u_time - d * 0.1), sin(u_time + pos.z * 0.3), cos(u_time + pos.z * 0.1));
	// // pos.y += sin(u_time * 2.0 + d * 0.2) * 5.0;

	// pos.x -= cos( v_angle ) * 10.0;
	// pos.z -= sin( v_angle ) * 10.0;

	// pos.y -= cos(u_time + val * 3.0) * 5.0;
	// pos.x = cos(u_time + val * 3.0) * 5.0;


	vec2 uv = (pos.xz + u_res.xz / 2.0) / u_res.xz;
	// uv.x *= u_res.x / u_res.z;

	vec2 mouse = (u_mouse.xz + u_res.xz / 2.0) / u_res.xz;

	float dist = distance( uv, mouse );
	v_dist = dist;
	v_toPointsCenter = distance( uv, vec2(0.5, 0.5) );

	float angle = atan( uv.y - mouse.y, uv.x - mouse.x ) + PI;
	float noise = snoise(vec3(uv.y * 20.0, uv.x * 20.0, u_time * 0.9));
	float edge = map(noise, -1.0, 1.0, 0.85, 0.9);
	// float push = smoothstep(map(noise, -1.0, 1.0, 0.85, 0.9), 1.0, 1.0 - dist);
	float push = smoothstep(edge, 1.0, 1.0 - dist);
	// float pull = smoothstep(map(noise, -1.0, 1.0, 0.9, 0.1), 1.0, dist);
	float pull = smoothstep(0.3, 1.0, dist);
	pull *= exp(pull);

	float adjust_y = sin(u_time * 3.0 + dist * 35.0 + cos(dist * 20.0)) * 10.0 * dist;
	float adjust_y_amt = smoothstep(1.0, 0.3, dist);
	// adjust_y *= u_strength;
	// pos.y -= sin(u_time * 3.0 + dist * 35.0 + cos(dist * 20.0)) * 10.0 * dist;
	pos.y -= adjust_y * adjust_y_amt;

	uv.x -= cos(angle) * (0.1 * push);
	uv.y -= sin(angle) * (0.1 * push);
	uv.x += cos(angle) * (0.2 * pull) * u_strength;
	uv.y += sin(angle) * (0.2 * pull) * u_strength;
	// convert uv.xy back to pos.xz
	pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
	pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize =  scale * ( 600.0 / -mvPosition.z );

	gl_Position = projectionMatrix * mvPosition;
}