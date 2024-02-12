import{f as F,t as P,V as z,a3 as H,p as I,a2 as T,x as $,B as D,i as A,S as L,j as q,h as O,b as U,u as k,a0 as X,a as Y,$ as Z}from"../../three.module-26cbe395.js";/* empty css                  */import{S as J}from"../../stats.module-8826aad6.js";import{O as K}from"../../OrbitControls-1db9ef1b.js";import{a as N}from"../../lil-gui.esm-ee8b5e9f.js";var Q=`precision mediump float;

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

}`,ee=`precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec3 u_mouse;
uniform vec3 u_res;
uniform float u_strength;
uniform float u_pullFrom;
uniform float u_pullAmount;

uniform float u_waveA;
uniform float u_waveB;
uniform float u_waveSpeed;
uniform float u_waveStrength;

uniform float u_innerSize;

uniform float u_noiseSpeed;
uniform float u_noiseVal;

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

  vec2 uv = (pos.xz + u_res.xz / 2.0) / u_res.xz;
  vec2 mouse = (u_mouse.xz + u_res.xz / 2.0) / u_res.xz;

  float dist = distance(uv, mouse);
  v_dist = dist;
  v_toPointsCenter = distance(uv, vec2(0.5, 0.5));

  float angle = atan(uv.y - mouse.y, uv.x - mouse.x) + PI;

  
  float noise =
      snoise(vec3(uv.y * u_noiseVal, uv.x * u_noiseVal, u_time * u_noiseSpeed));

  
  
  

  float push_end = 1.0 - u_innerSize;
  float push_start = push_end - 0.05;

  float edge = map(noise, -1.0, 1.0, push_start, push_end);
  float push = smoothstep(edge, 1.0, 1.0 - dist) * u_innerSize;

  float pull = smoothstep(u_pullFrom, 1.0, dist);
  pull *= exp(pull);

  /**
   * Waves
   */
  float adjust_y =
      sin(u_time * u_waveSpeed + dist * u_waveA + cos(dist * u_waveB)) *
      u_waveStrength * dist;
  float adjust_y_amt = smoothstep(1.0, 0.3, dist);
  adjust_y *= max(u_strength, 0.7);
  pos.y -= adjust_y * adjust_y_amt;

  /**
   * Apply
   */
  uv.x -= cos(angle) * push;
  uv.y -= sin(angle) * push;
  uv.x += cos(angle) * (pull * u_pullAmount);
  uv.y += sin(angle) * (pull * u_pullAmount);

  
  pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
  pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = scale * (300.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;
}`;function r(n,o,a){return(1-a)*n+a*o}const e={separation:1,perSide:150,randomness:0,particleSize:2,mouseSpeed:.02,strengthSpeedUp:.03,strengthSpeedDown:.01,color1:new F(120/255,242/255,205/255),color2:new F(129/255,116/255,200/255),pullFrom:.3,pullAmount:.1,waveA:35,waveB:20,waveSpeed:3,waveStrength:10,innerSize:.1,noiseSpeed:.9,noiseVal:20,freezeMouseToCenter:!1};let t,m,w,p,l,v;const M=document.querySelector(".info"),C=new P(1,1),d=new z,s=new P(window.innerWidth,window.innerHeight),ne=new Z,h=new H,u=new I(75,s.x/s.y,1,500);u.position.z=100;u.position.y=70;u.position.x=20;function oe(){w&&(m.dispose(),t.dispose(),h.remove(w))}function c(){oe();const n=e.perSide**2,o=new Float32Array(n*3),a=new Float32Array(n);let i=e.perSide*e.separation,S=e.perSide*e.separation,g=e.randomness*e.separation;for(let f=0;f<e.perSide;f++)for(let _=0;_<e.perSide;_++){const x=f*e.perSide+_,V=(Math.random()-.5)*g,B=(Math.random()-.5)*g,G=(Math.random()-.5)*g,W=f*e.separation-i/2+e.separation/2+V,R=0+B,E=_*e.separation-S/2+e.separation/2+G;o[x*3]=W,o[x*3+1]=R,o[x*3+2]=E,a[x]=Math.min(window.devicePixelRatio,2)*e.particleSize}m=new D,m.setAttribute("position",new A(o,3)),m.setAttribute("scale",new A(a,1)),t=new L({uniforms:{u_time:{value:0},u_mouse:{value:new z},u_res:{value:new z(i,0,S)},u_strength:{value:0},u_color1:{value:e.color1},u_color2:{value:e.color2},u_pullFrom:{value:e.pullFrom},u_pullAmount:{value:e.pullAmount},u_waveA:{value:e.waveA},u_waveB:{value:e.waveB},u_waveSpeed:{value:e.waveSpeed},u_waveStrength:{value:e.waveStrength},u_innerSize:{value:e.innerSize},u_noiseSpeed:{value:e.noiseSpeed},u_noiseVal:{value:e.noiseVal}},vertexShader:ee,fragmentShader:Q}),t.transparent=!0,t.blending=q,t.depthWrite=!1,w=new O(m,t),h.add(w),p=new U(new k(i,S),new X({color:16777215,side:Y})),p.rotation.x=-Math.PI/2,p.visible=!1,h.add(p)}{const n=new N;n.close();{let o=n.addFolder("Particles"),a=n.addFolder("Shader Vars");a.close(),te(o),ae(a)}}function te(n){n.add(e,"separation",.5,7,.5).onFinishChange(c),n.add(e,"perSide",1,300,1).onFinishChange(c),n.add(e,"randomness",0,3,.1).onFinishChange(c),n.add(e,"particleSize",1,8,1).onFinishChange(c),n.add(e,"mouseSpeed",.001,.1,.001),n.addColor(e,"color1"),n.addColor(e,"color2")}function ae(n){n.add(e,"pullFrom",0,1,.01).onChange(o=>{t.uniforms.u_pullFrom.value=o}),n.add(e,"pullAmount",0,.3,.001).onChange(o=>{t.uniforms.u_pullAmount.value=o}),n.add(e,"waveA",-100,100,1).onChange(o=>{t.uniforms.u_waveA.value=o}),n.add(e,"waveB",-100,100,1).onChange(o=>{t.uniforms.u_waveB.value=o}),n.add(e,"waveSpeed",-10,10,.1).onChange(o=>{t.uniforms.u_waveSpeed.value=o}),n.add(e,"waveStrength",0,100,1).onChange(o=>{t.uniforms.u_waveStrength.value=o}),n.add(e,"innerSize",0,.5,.01).onChange(o=>{t.uniforms.u_innerSize.value=o}),n.add(e,"noiseSpeed",0,5,.1).onChange(o=>{t.uniforms.u_noiseSpeed.value=o}),n.add(e,"noiseVal",0,100,1).onChange(o=>{t.uniforms.u_noiseVal.value=o})}l=new T({antialias:!0});l.setSize(s.x,s.y);l.setPixelRatio(window.devicePixelRatio);document.body.appendChild(l.domElement);v=new K(u,l.domElement);v.enableDamping=!0;v.dampingFactor=.05;v.update();c();const b=new J;document.body.appendChild(b.dom);function ie(n){n.isPrimary!==!1&&(C.x=n.clientX/s.x*2-1,C.y=-(n.clientY/s.y)*2+1)}function se(){s.x=window.innerWidth,s.y=window.innerHeight,u.aspect=s.x/s.y,u.updateProjectionMatrix(),l.setSize(s.x,s.y)}const y=new $;function ue(){e.freezeMouseToCenter?y.setFromCamera(new P(0,0),u):y.setFromCamera(C,u);const n=y.intersectObject(p,!1),o=t.uniforms.u_strength.value,a=t.uniforms.u_mouse.value;if(n[0]){const i=n[0].point;d.set(i.x,i.y,i.z),o<1&&(t.uniforms.u_strength.value=r(o,1,e.strengthSpeedUp)),t.uniforms.u_mouse.value.x=r(a.x,i.x,e.mouseSpeed),t.uniforms.u_mouse.value.y=r(a.y,i.y,e.mouseSpeed),t.uniforms.u_mouse.value.z=r(a.z,i.z,e.mouseSpeed),M&&(M.innerHTML=`x: ${i.x.toFixed(2)}<br>y: ${i.y.toFixed(2)}<br>z: ${i.z.toFixed(2)}`)}else o>0&&(t.uniforms.u_strength.value=r(o,0,e.strengthSpeedDown)),d&&(t.uniforms.u_mouse.value.x=r(a.x,d.x,e.mouseSpeed),t.uniforms.u_mouse.value.y=r(a.y,d.y,e.mouseSpeed),t.uniforms.u_mouse.value.z=r(a.z,d.z,e.mouseSpeed))}function j(){requestAnimationFrame(j);const n=ne.getElapsedTime();ue(),v.update(),t.uniforms.u_time.value=n,l.render(h,u),b.update()}function re(){document.body.addEventListener("pointermove",ie),window.addEventListener("resize",se),requestAnimationFrame(j)}re();
