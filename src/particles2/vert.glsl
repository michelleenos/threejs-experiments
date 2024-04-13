precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec3 u_mouse;
uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec3 v_color;
varying float v_colorMix;
varying float v_dist;

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

  // will make the pos vals between 0 and 1
  vec2 st = pos.xy / u_planeRes.xy;
  st += vec2(0.5);
  v_colorMix = st.x;
  v_color = mix(u_color1, u_color2, v_colorMix);

  // adjust x coords to the same ratio as y coords
  float aspect = u_planeRes.x / u_planeRes.y;
  st.x *= aspect;
  float edge = (aspect - 1.0) * 0.5;
  st.x -= edge;

  float dist = distance(st, vec2(0.5));
  float angle = atan(pos.y, pos.x);

  float circle = sin(u_time * 4.0 - dist * 20.0);
  float amount = smoothstep(0.3, 1.0, 1.0 - dist);
  float wave = sin(st.x * 30.0);

  pos.z += wave;

  // pos.x += noise;
  // pos.z += noise;
  // pos.y += noise;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_PointSize = (0.15 * scale * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);

  gl_Position = projectedPosition;
}