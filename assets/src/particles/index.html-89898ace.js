import{C as E,V as B,e as j,S as X,P as $,W as k,R as O,B as Y,m as V,h as q,j as U,n as J,M as N,o as Z,a as K,c as Q,d as ee}from"../../three.module-ee2665d0.js";/* empty css                  */import{O as ne}from"../../OrbitControls-8938ac74.js";import{a as te}from"../../lil-gui.esm-ee8b5e9f.js";var F=function(){var t=0,n=document.createElement("div");n.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",n.addEventListener("click",function(u){u.preventDefault(),s(++t%n.children.length)},!1);function a(u){return n.appendChild(u.dom),u}function s(u){for(var l=0;l<n.children.length;l++)n.children[l].style.display=l===u?"block":"none";t=u}var m=(performance||Date).now(),d=m,i=0,p=a(new F.Panel("FPS","#0ff","#002")),v=a(new F.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var S=a(new F.Panel("MB","#f08","#201"));return s(0),{REVISION:16,dom:n,addPanel:a,showPanel:s,begin:function(){m=(performance||Date).now()},end:function(){i++;var u=(performance||Date).now();if(v.update(u-m,200),u>=d+1e3&&(p.update(i*1e3/(u-d),100),d=u,i=0,S)){var l=performance.memory;S.update(l.usedJSHeapSize/1048576,l.jsHeapSizeLimit/1048576)}return u},update:function(){m=this.end()},domElement:n,setMode:s}};F.Panel=function(t,n,a){var s=1/0,m=0,d=Math.round,i=d(window.devicePixelRatio||1),p=80*i,v=48*i,S=3*i,u=2*i,l=3*i,f=15*i,x=74*i,w=30*i,y=document.createElement("canvas");y.width=p,y.height=v,y.style.cssText="width:80px;height:48px";var r=y.getContext("2d");return r.font="bold "+9*i+"px Helvetica,Arial,sans-serif",r.textBaseline="top",r.fillStyle=a,r.fillRect(0,0,p,v),r.fillStyle=n,r.fillText(t,S,u),r.fillRect(l,f,x,w),r.fillStyle=a,r.globalAlpha=.9,r.fillRect(l,f,x,w),{dom:y,update:function(b,L){s=Math.min(s,b),m=Math.max(m,b),r.fillStyle=a,r.globalAlpha=1,r.fillRect(0,0,p,f),r.fillStyle=n,r.fillText(d(b)+" "+t+" ("+d(s)+"-"+d(m)+")",S,u),r.drawImage(y,l+i,f,x-i,w,l,f,x-i,w),r.fillRect(l+x-i,f,i,w),r.fillStyle=a,r.globalAlpha=.9,r.fillRect(l+x-i,f,i,d((1-b/L)*w))}}};const oe=F;var ae=`precision mediump float;

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
}`;function h(t,n,a){return(1-a)*t+a*n}const e={separation:1,perSide:150,randomness:0,particleSize:2,mouseSpeed:.02,strengthSpeedUp:.03,strengthSpeedDown:.01,color1:new E(120/255,242/255,205/255),color2:new E(129/255,116/255,200/255),pullFrom:.3,pullAmount:.1,waveA:35,waveB:20,waveSpeed:3,waveStrength:10,innerSize:.1,noiseSpeed:.9,noiseVal:20,freezeMouseToCenter:!1};let o,P,R,C,g,M;const I=document.querySelector(".info"),G=new B(1,1),z=new j,c=new B(window.innerWidth,window.innerHeight),se=new ee,T=new X,_=new $(75,c.x/c.y,1,500);_.position.z=100;_.position.y=70;_.position.x=20;function re(){R&&(P.dispose(),o.dispose(),T.remove(R))}function A(){re();const t=e.perSide**2,n=new Float32Array(t*3),a=new Float32Array(t);let s=e.perSide*e.separation,m=e.perSide*e.separation,d=e.randomness*e.separation;for(let i=0;i<e.perSide;i++)for(let p=0;p<e.perSide;p++){const v=i*e.perSide+p,S=(Math.random()-.5)*d,u=(Math.random()-.5)*d,l=(Math.random()-.5)*d,f=i*e.separation-s/2+e.separation/2+S,x=0+u,w=p*e.separation-m/2+e.separation/2+l;n[v*3]=f,n[v*3+1]=x,n[v*3+2]=w,a[v]=Math.min(window.devicePixelRatio,2)*e.particleSize}P=new Y,P.setAttribute("position",new V(n,3)),P.setAttribute("scale",new V(a,1)),o=new q({uniforms:{u_time:{value:0},u_mouse:{value:new j},u_res:{value:new j(s,0,m)},u_strength:{value:0},u_color1:{value:e.color1},u_color2:{value:e.color2},u_pullFrom:{value:e.pullFrom},u_pullAmount:{value:e.pullAmount},u_waveA:{value:e.waveA},u_waveB:{value:e.waveB},u_waveSpeed:{value:e.waveSpeed},u_waveStrength:{value:e.waveStrength},u_innerSize:{value:e.innerSize},u_noiseSpeed:{value:e.noiseSpeed},u_noiseVal:{value:e.noiseVal}},vertexShader:ie,fragmentShader:ae}),o.transparent=!0,o.blending=U,o.depthWrite=!1,R=new J(P,o),T.add(R),C=new N(new Z(s,m),new K({color:16777215,side:Q})),C.rotation.x=-Math.PI/2,C.visible=!1,T.add(C)}{const t=new te;t.close();{let n=t.addFolder("Particles"),a=t.addFolder("Shader Vars");a.close(),ue(n),le(a)}}function ue(t){t.add(e,"separation",.5,7,.5).onFinishChange(A),t.add(e,"perSide",1,300,1).onFinishChange(A),t.add(e,"randomness",0,3,.1).onFinishChange(A),t.add(e,"particleSize",1,8,1).onFinishChange(A),t.add(e,"mouseSpeed",.001,.1,.001),t.addColor(e,"color1"),t.addColor(e,"color2")}function le(t){t.add(e,"pullFrom",0,1,.01).onChange(n=>{o.uniforms.u_pullFrom.value=n}),t.add(e,"pullAmount",0,.3,.001).onChange(n=>{o.uniforms.u_pullAmount.value=n}),t.add(e,"waveA",-100,100,1).onChange(n=>{o.uniforms.u_waveA.value=n}),t.add(e,"waveB",-100,100,1).onChange(n=>{o.uniforms.u_waveB.value=n}),t.add(e,"waveSpeed",-10,10,.1).onChange(n=>{o.uniforms.u_waveSpeed.value=n}),t.add(e,"waveStrength",0,100,1).onChange(n=>{o.uniforms.u_waveStrength.value=n}),t.add(e,"innerSize",0,.5,.01).onChange(n=>{o.uniforms.u_innerSize.value=n}),t.add(e,"noiseSpeed",0,5,.1).onChange(n=>{o.uniforms.u_noiseSpeed.value=n}),t.add(e,"noiseVal",0,100,1).onChange(n=>{o.uniforms.u_noiseVal.value=n})}g=new k({antialias:!0});g.setSize(c.x,c.y);g.setPixelRatio(window.devicePixelRatio);document.body.appendChild(g.domElement);M=new ne(_,g.domElement);M.enableDamping=!0;M.dampingFactor=.05;M.update();A();const D=new oe;document.body.appendChild(D.dom);function de(t){t.isPrimary!==!1&&(G.x=t.clientX/c.x*2-1,G.y=-(t.clientY/c.y)*2+1)}function me(){c.x=window.innerWidth,c.y=window.innerHeight,_.aspect=c.x/c.y,_.updateProjectionMatrix(),g.setSize(c.x,c.y)}const H=new O;function ce(){e.freezeMouseToCenter?H.setFromCamera(new B(0,0),_):H.setFromCamera(G,_);const t=H.intersectObject(C,!1),n=o.uniforms.u_strength.value,a=o.uniforms.u_mouse.value;if(t[0]){const s=t[0].point;z.set(s.x,s.y,s.z),n<1&&(o.uniforms.u_strength.value=h(n,1,e.strengthSpeedUp)),o.uniforms.u_mouse.value.x=h(a.x,s.x,e.mouseSpeed),o.uniforms.u_mouse.value.y=h(a.y,s.y,e.mouseSpeed),o.uniforms.u_mouse.value.z=h(a.z,s.z,e.mouseSpeed),I&&(I.innerHTML=`x: ${s.x.toFixed(2)}<br>y: ${s.y.toFixed(2)}<br>z: ${s.z.toFixed(2)}`)}else n>0&&(o.uniforms.u_strength.value=h(n,0,e.strengthSpeedDown)),z&&(o.uniforms.u_mouse.value.x=h(a.x,z.x,e.mouseSpeed),o.uniforms.u_mouse.value.y=h(a.y,z.y,e.mouseSpeed),o.uniforms.u_mouse.value.z=h(a.z,z.z,e.mouseSpeed))}function W(){requestAnimationFrame(W);const t=se.getElapsedTime();ce(),M.update(),o.uniforms.u_time.value=t,g.render(T,_),D.update()}function pe(){document.body.addEventListener("pointermove",de),window.addEventListener("resize",me),requestAnimationFrame(W)}pe();
