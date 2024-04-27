precision mediump float;

varying vec2 v_uv;
varying vec3 v_col;

void main() {

  float d = distance(gl_PointCoord, vec2(0.5, 0.5));
  if (d > 0.5)
    discard;

  // if (v_uv.y < 0.1)
  //   discard;

  gl_FragColor = vec4(v_col, 1.0);
}