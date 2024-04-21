precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;

uniform vec2 u_res;
uniform vec2 u_planeRes;
uniform float u_time;
uniform float u_scaleBase;

uniform float u_variantY;
uniform float u_variantZ;
uniform float u_variantX;
uniform float u_freqX;
uniform float u_freqY;
uniform float u_freqZ;
uniform float u_speedX;
uniform float u_speedY;
uniform float u_speedZ;
uniform float u_ampX;
uniform float u_ampY;
uniform float u_ampZ;
uniform float u_space;
uniform float u_rot;
uniform float u_layersDiff;

varying vec3 v_color;

float PI = 3.1415926;

#include "../../../_glsl/lygia/generative/pnoise.glsl"
#include "../../../_glsl/lygia/generative/snoise.glsl"
#include "../../../_glsl/lygia/math/rotate3d.glsl"

void main() {
  vec2 uv2 = uv;
  uv2 -= 0.5;
  float aspect = u_planeRes.x / u_planeRes.y;
  uv2.x *= aspect;

  vec3 pos = position;

  float layer = step(0.5, uv.y) * 2.0 - 1.0;

  // float noise1 =
  //     pnoise(pos * u_freqY + layer * u_layersDiff + u_time * u_speedY,
  //            vec3(u_variantY * layer));
  // float noise2 =
  //     pnoise(pos * u_freqZ + layer * u_layersDiff + u_time * u_speedZ,
  //            vec3(u_variantZ * layer));
  // float noise3 =
  //     pnoise(pos * u_freqX + layer * u_layersDiff + u_time * u_speedX,
  //            vec3(u_variantX * layer));

  float noise1 =
      snoise(pos * u_freqY + layer * u_layersDiff + u_time * u_speedY);
  float noise2 =
      snoise(pos * u_freqZ + layer * u_layersDiff + u_time * u_speedZ);
  float noise3 =
      snoise(pos * u_freqX + layer * u_layersDiff + u_time * u_speedX);
  pos.y += noise1 * u_ampY;
  pos.z += noise2 * u_ampZ;
  pos.x += noise3 * u_ampX;
  // pos.z += sin(noise1) * layer;

  // float theta = atan(uv2.y, uv2.x);
  // float len = length(uv2.xy);

  // float zpos =
  //     sin(6.0 * theta + sin(2.0 * PI * len + u_time * u_speed)) *
  //     pow(len, 2.0);
  // pos.z = zpos;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  // modelPosition.y -= 0.5 * (1.0 - layer);
  modelPosition.xyz -= vec3(0.0, u_space, 0.0) * layer;
  modelPosition.xyz *= rotate3d(vec3(layer, 0.0, 0.0), u_rot);
  modelPosition.xyz += vec3(0.0, u_space, 0.0) * layer;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPos = projectionMatrix * viewPosition;

  v_color = mix(u_color1, u_color2, uv.y);
  // v_color = vec3(uv.y, uv.y, 1.0);

  gl_Position = projectedPos;
  gl_PointSize = u_scaleBase * u_res.y;
  // gl_PointSize *= 0.1;

  gl_PointSize *= 1.0 / (-viewPosition.z);
}