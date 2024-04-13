var E=Object.defineProperty;var O=(i,e,t)=>e in i?E(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var l=(i,e,t)=>(O(i,typeof e!="symbol"?e+"":e,t),t);import{f as v,a3 as W,B,S as T,w as p,t as P,i as z,h as D,p as H,a2 as L,Y as U,K as k,Z as q}from"../../three.module-08dc1cdd.js";/* empty css                  */import{S as J}from"../../stats.module-8826aad6.js";import{O as N}from"../../OrbitControls-f09e7187.js";import{a as A}from"../../lil-gui.esm-ee8b5e9f.js";const $=(i,e,t,o,a=1)=>{const s=new Float32Array(t*o*3),_=new Float32Array(t*o);let S=i/t,y=e/o;for(let d=0;d<t;d++)for(let m=0;m<o;m++){const u=d*o+m,V=d*S-i/2+S/2,j=0,I=m*y-e/2+y/2;s[u*3]=V,s[u*3+1]=I,s[u*3+2]=j,_[u]=a}return{positions:s,scales:_}};var Y=`precision mediump float;

float PI = 3.1415926;

uniform vec3 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_alpha;
uniform vec2 u_planeRes;

varying vec3 v_color;
varying float v_dist;
varying vec2 v_uv;

void main() {

  vec2 uv = gl_FragCoord.xy / u_planeRes.xy;
  
  
  
  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0;

  

  
  
  
  gl_FragColor = vec4(v_color, alpha * u_alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`,Z=`precision mediump float;

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

  
  vec2 st = pos.xy / u_planeRes.xy;
  st += vec2(0.5);
  v_colorMix = st.x;
  v_color = mix(u_color1, u_color2, v_colorMix);

  
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

  
  
  

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_PointSize = (0.15 * scale * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);

  gl_Position = projectedPosition;
}`;class Q{constructor(e,t){l(this,"gui");l(this,"storedVals",{});l(this,"storageKey");l(this,"add",(e,t,o=t,a)=>{this.storedVals.hasOwnProperty(o)?(e[t]=this.storedVals[o],a&&a(this.storedVals[o])):(this.storedVals[o]=e[t],this.setStorage());let s=this.gui.add(e,t);return a&&s.onChange(a),s.domElement.setAttribute("data-ls-key",o),s});l(this,"setStorage",()=>{localStorage.setItem(this.storageKey,JSON.stringify(this.storedVals))});this.gui=t||new A,this.storageKey=e,this.storedVals=localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):{},this.gui.onChange(o=>{let a=o.controller.domElement.getAttribute("data-ls-key");a&&(this.storedVals[a]=o.value,this.setStorage())})}}new v(120/255,242/255,205/255),new v(129/255,116/255,200/255);const n={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)};k.enabled=!0;const M=new J;document.body.appendChild(M.dom);const x=new W,C=8,b=6,{positions:X,scales:K}=$(C,b,80,60,.5),g=new B,w=new T({uniforms:{u_time:{value:0},u_color1:new p(new v("#FF8D25")),u_color2:new p(new v("#0067A7")),u_res:new p(new P(n.width*n.pixelRatio,n.height*n.pixelRatio)),u_alpha:{value:1},u_planeRes:new p(new P(C,b))},vertexShader:Z,fragmentShader:Y,transparent:!0,depthWrite:!1});g.setAttribute("position",new z(X,3));g.setAttribute("scale",new z(K,1));const f=new D(g,w);x.add(f);window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,c.aspect=n.width/n.height,c.updateProjectionMatrix(),w.uniforms.u_res.value.x=n.width*n.pixelRatio,w.uniforms.u_res.value.y=n.height*n.pixelRatio,r.setSize(n.width,n.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))});const c=new H(35,n.width/n.height,.1,100);c.position.set(0,0,18);x.add(c);const r=new L({antialias:!0});r.outputColorSpace=U;r.setSize(n.width,n.height);r.setPixelRatio(window.devicePixelRatio);document.body.appendChild(r.domElement);const G=new N(c,r.domElement);G.enableDamping=!0;const ee=new q,ne=new A,R=document.querySelector(".wave-img"),te={showImg:!0,imgAlpha:1};let h=new Q("particles2",ne);h.add(te,"imgAlpha","imgAlpha",i=>{R&&(R.style.opacity=`${i}`)}).min(0).max(1).step(.01);h.add(f.position,"x").min(-10).max(10).step(.01).name("x");h.add(f.rotation,"x").min(-Math.PI).max(Math.PI).step(.01).name("rotation");h.add(f.material.uniforms.u_alpha,"value","particlesAlpha").min(0).max(1).step(.01).name("particlesAlpha");const F=()=>{const i=ee.getElapsedTime();w.uniforms.u_time.value=i,G.update(),r.render(x,c),M.update(),window.requestAnimationFrame(F)};F();
