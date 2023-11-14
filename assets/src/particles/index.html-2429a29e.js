import{C as I,V as E,e as j,S as X,P as $,W as k,R as O,B as Y,m as B,h as q,j as U,n as J,M as N,o as Z,a as K,c as Q,d as ee}from"../../three.module-ee2665d0.js";/* empty css                  */import{O as ne}from"../../OrbitControls-8938ac74.js";import{a as te}from"../../lil-gui.esm-ee8b5e9f.js";var M=function(){var n=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(r){r.preventDefault(),i(++n%o.children.length)},!1);function a(r){return o.appendChild(r.dom),r}function i(r){for(var u=0;u<o.children.length;u++)o.children[u].style.display=u===r?"block":"none";n=r}var c=(performance||Date).now(),d=c,t=0,p=a(new M.Panel("FPS","#0ff","#002")),f=a(new M.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var y=a(new M.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:o,addPanel:a,showPanel:i,begin:function(){c=(performance||Date).now()},end:function(){t++;var r=(performance||Date).now();if(f.update(r-c,200),r>=d+1e3&&(p.update(t*1e3/(r-d),100),d=r,t=0,y)){var u=performance.memory;y.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return r},update:function(){c=this.end()},domElement:o,setMode:i}};M.Panel=function(n,o,a){var i=1/0,c=0,d=Math.round,t=d(window.devicePixelRatio||1),p=80*t,f=48*t,y=3*t,r=2*t,u=3*t,v=15*t,_=74*t,w=30*t,g=document.createElement("canvas");g.width=p,g.height=f,g.style.cssText="width:80px;height:48px";var s=g.getContext("2d");return s.font="bold "+9*t+"px Helvetica,Arial,sans-serif",s.textBaseline="top",s.fillStyle=a,s.fillRect(0,0,p,f),s.fillStyle=o,s.fillText(n,y,r),s.fillRect(u,v,_,w),s.fillStyle=a,s.globalAlpha=.9,s.fillRect(u,v,_,w),{dom:g,update:function(b,L){i=Math.min(i,b),c=Math.max(c,b),s.fillStyle=a,s.globalAlpha=1,s.fillRect(0,0,p,v),s.fillStyle=o,s.fillText(d(b)+" "+n+" ("+d(i)+"-"+d(c)+")",y,r),s.drawImage(g,u+t,v,_-t,w,u,v,_-t,w),s.fillRect(u+_-t,v,t,w),s.fillStyle=a,s.globalAlpha=.9,s.fillRect(u+_-t,v,t,d((1-b/L)*w))}}};const oe=M;var ae=`float PI = 3.1415926;

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

}`,ie=`precision mediump float;

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

	float dist = distance( uv, mouse );
	v_dist = dist;
	v_toPointsCenter = distance( uv, vec2(0.5, 0.5) );

	float angle = atan( uv.y - mouse.y, uv.x - mouse.x ) + PI;

  
	float noise = snoise(vec3(uv.y * u_noiseVal, uv.x * u_noiseVal, u_time * u_noiseSpeed));
	
  
	
  

  float push_end = 1.0 - u_innerSize;
  float push_start = push_end - 0.05;

  float edge = map(noise, -1.0, 1.0, push_start, push_end);
	float push = smoothstep(edge, 1.0, 1.0 - dist) * u_innerSize;

	float pull = smoothstep(u_pullFrom, 1.0, dist);
	pull *= exp(pull);

  /**
   * Waves
   */
	float adjust_y = sin(u_time * u_waveSpeed + dist * u_waveA + cos(dist * u_waveB)) * u_waveStrength * dist;
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

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize =  scale * ( 300.0 / -mvPosition.z );

	gl_Position = projectionMatrix * mvPosition;
}`;function h(n,o,a){return(1-a)*n+a*o}const e={separation:1,perSide:150,randomness:0,particleSize:2,mouseSpeed:.02,strengthSpeedUp:.03,strengthSpeedDown:.01,color1:new I(120/255,242/255,205/255),color2:new I(129/255,116/255,200/255),pullFrom:.3,pullAmount:.1,waveA:35,waveB:20,waveSpeed:3,waveStrength:10,innerSize:.1,noiseSpeed:.9,noiseVal:20,freezeMouseToCenter:!1};let l,P,R,A,S,F;const V=document.querySelector(".info"),G=new E(1,1),z=new j,m=new E(window.innerWidth,window.innerHeight),se=new ee,T=new X,x=new $(75,m.x/m.y,1,500);x.position.z=100;x.position.y=70;x.position.x=20;function re(){R&&(P.dispose(),l.dispose(),T.remove(R))}function C(){re();const n=e.perSide**2,o=new Float32Array(n*3),a=new Float32Array(n);let i=e.perSide*e.separation,c=e.perSide*e.separation,d=e.randomness*e.separation;for(let t=0;t<e.perSide;t++)for(let p=0;p<e.perSide;p++){const f=t*e.perSide+p,y=(Math.random()-.5)*d,r=(Math.random()-.5)*d,u=(Math.random()-.5)*d,v=t*e.separation-i/2+e.separation/2+y,_=0+r,w=p*e.separation-c/2+e.separation/2+u;o[f*3]=v,o[f*3+1]=_,o[f*3+2]=w,a[f]=Math.min(window.devicePixelRatio,2)*e.particleSize}P=new Y,P.setAttribute("position",new B(o,3)),P.setAttribute("scale",new B(a,1)),l=new q({uniforms:{u_time:{value:0},u_mouse:{value:new j},u_res:{value:new j(i,0,c)},u_strength:{value:0},u_color1:{value:e.color1},u_color2:{value:e.color2},u_pullFrom:{value:e.pullFrom},u_pullAmount:{value:e.pullAmount},u_waveA:{value:e.waveA},u_waveB:{value:e.waveB},u_waveSpeed:{value:e.waveSpeed},u_waveStrength:{value:e.waveStrength},u_innerSize:{value:e.innerSize},u_noiseSpeed:{value:e.noiseSpeed},u_noiseVal:{value:e.noiseVal}},vertexShader:ie,fragmentShader:ae}),l.transparent=!0,l.blending=U,l.depthWrite=!1,R=new J(P,l),T.add(R),A=new N(new Z(i,c),new K({color:16777215,side:Q})),A.rotation.x=-Math.PI/2,A.visible=!1,T.add(A)}{const n=new te;n.close(),le(n)}function le(n){n.add(e,"separation",.5,7,.5).onFinishChange(C),n.add(e,"perSide",1,300,1).onFinishChange(C),n.add(e,"randomness",0,3,.1).onFinishChange(C),n.add(e,"particleSize",1,8,1).onFinishChange(C),n.add(e,"mouseSpeed",.001,.1,.001),n.addColor(e,"color1"),n.addColor(e,"color2")}S=new k({antialias:!0});S.setSize(m.x,m.y);S.setPixelRatio(window.devicePixelRatio);document.body.appendChild(S.domElement);F=new ne(x,S.domElement);F.enableDamping=!0;F.dampingFactor=.05;F.update();C();const D=new oe;document.body.appendChild(D.dom);function ue(n){n.isPrimary!==!1&&(G.x=n.clientX/m.x*2-1,G.y=-(n.clientY/m.y)*2+1)}function de(){m.x=window.innerWidth,m.y=window.innerHeight,x.aspect=m.x/m.y,x.updateProjectionMatrix(),S.setSize(m.x,m.y)}const H=new O;function ce(){e.freezeMouseToCenter?H.setFromCamera(new E(0,0),x):H.setFromCamera(G,x);const n=H.intersectObject(A,!1),o=l.uniforms.u_strength.value,a=l.uniforms.u_mouse.value;if(n[0]){const i=n[0].point;z.set(i.x,i.y,i.z),o<1&&(l.uniforms.u_strength.value=h(o,1,e.strengthSpeedUp)),l.uniforms.u_mouse.value.x=h(a.x,i.x,e.mouseSpeed),l.uniforms.u_mouse.value.y=h(a.y,i.y,e.mouseSpeed),l.uniforms.u_mouse.value.z=h(a.z,i.z,e.mouseSpeed),V&&(V.innerHTML=`x: ${i.x.toFixed(2)}<br>y: ${i.y.toFixed(2)}<br>z: ${i.z.toFixed(2)}`)}else o>0&&(l.uniforms.u_strength.value=h(o,0,e.strengthSpeedDown)),z&&(l.uniforms.u_mouse.value.x=h(a.x,z.x,e.mouseSpeed),l.uniforms.u_mouse.value.y=h(a.y,z.y,e.mouseSpeed),l.uniforms.u_mouse.value.z=h(a.z,z.z,e.mouseSpeed))}function W(){requestAnimationFrame(W);const n=se.getElapsedTime();ce(),F.update(),l.uniforms.u_time.value=n,S.render(T,x),D.update()}function me(){document.body.addEventListener("pointermove",ue),window.addEventListener("resize",de),requestAnimationFrame(W)}me();
