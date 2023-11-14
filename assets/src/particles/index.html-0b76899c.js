import{V as D,S as $,P as k,B as O,m as W,h as q,e as H,j as J,n as N,M as K,o as Q,a as U,c as Z,R as nn,W as en,d as tn}from"../../three.module-ee2665d0.js";/* empty css                  */import{O as on}from"../../OrbitControls-8938ac74.js";var b=function(){var t=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(s){s.preventDefault(),o(++t%e.children.length)},!1);function n(s){return e.appendChild(s.dom),s}function o(s){for(var l=0;l<e.children.length;l++)e.children[l].style.display=l===s?"block":"none";t=s}var m=(performance||Date).now(),d=m,i=0,P=n(new b.Panel("FPS","#0ff","#002")),S=n(new b.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var z=n(new b.Panel("MB","#f08","#201"));return o(0),{REVISION:16,dom:e,addPanel:n,showPanel:o,begin:function(){m=(performance||Date).now()},end:function(){i++;var s=(performance||Date).now();if(S.update(s-m,200),s>=d+1e3&&(P.update(i*1e3/(s-d),100),d=s,i=0,z)){var l=performance.memory;z.update(l.usedJSHeapSize/1048576,l.jsHeapSizeLimit/1048576)}return s},update:function(){m=this.end()},domElement:e,setMode:o}};b.Panel=function(t,e,n){var o=1/0,m=0,d=Math.round,i=d(window.devicePixelRatio||1),P=80*i,S=48*i,z=3*i,s=2*i,l=3*i,p=15*i,y=74*i,w=30*i,h=document.createElement("canvas");h.width=P,h.height=S,h.style.cssText="width:80px;height:48px";var a=h.getContext("2d");return a.font="bold "+9*i+"px Helvetica,Arial,sans-serif",a.textBaseline="top",a.fillStyle=n,a.fillRect(0,0,P,S),a.fillStyle=e,a.fillText(t,z,s),a.fillRect(l,p,y,w),a.fillStyle=n,a.globalAlpha=.9,a.fillRect(l,p,y,w),{dom:h,update:function(R,V){o=Math.min(o,R),m=Math.max(m,R),a.fillStyle=n,a.globalAlpha=1,a.fillRect(0,0,P,p),a.fillStyle=e,a.fillText(d(R)+" "+t+" ("+d(o)+"-"+d(m)+")",z,s),a.drawImage(h,l+i,p,y-i,w,l,p,y-i,w),a.fillRect(l+y-i,p,i,w),a.fillStyle=n,a.globalAlpha=.9,a.fillRect(l+y-i,p,i,d((1-R/V)*w))}}};const an=b;var sn=`precision mediump float;

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

	
	
	

	vec3 greenish = vec3(120.0, 242.0, 205.0);
	vec3 color1 = convertrgb(greenish);

	vec3 purpley = vec3(129.0, 116.0, 200.0);
	vec3 color2 = convertrgb(purpley);

	float dist = v_dist * 2.0;

	vec3 color = mix(color1, color2, dist);

	gl_FragColor = vec4( color, alpha );

}`,rn=`precision mediump float;

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
	
	float noise = snoise(vec3(uv.y * 20.0, uv.x * 20.0, u_time * 0.9));
	
	float edge = map(noise, -1.0, 1.0, 0.85, 0.9);
	float push = smoothstep(edge, 1.0, 1.0 - dist) * 0.1;

	float pull = smoothstep(0.3, 1.0, dist);
	pull *= exp(pull);

	float adjust_y = sin(u_time * 3.0 + dist * 35.0 + cos(dist * 20.0)) * 10.0 * dist;
	float adjust_y_amt = smoothstep(1.0, 0.3, dist);
	adjust_y *= max(u_strength, 0.7);
	pos.y -= adjust_y * adjust_y_amt;

	uv.x -= cos(angle) * push;
	uv.y -= sin(angle) * push;
	uv.x += cos(angle) * (0.1 * pull) * u_strength;
	uv.y += sin(angle) * (0.1 * pull) * u_strength;
	
	pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
	pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize =  scale * ( 600.0 / -mvPosition.z );

	gl_Position = projectionMatrix * mvPosition;
}`;function f(t,e,n){return(1-n)*t+n*e}const T=new D(1,1),c=new D(window.innerWidth,window.innerHeight),ln=new tn,u={separation:1,amountX:150,amountY:150},j=new $,v=new k(75,c.x/c.y,1,1e3);v.position.z=20;v.position.y=70;v.position.x=20;const X=u.amountX*u.amountY,M=new Float32Array(X*3),Y=new Float32Array(X);let A=u.amountX*u.separation,E=u.amountY*u.separation;for(let t=0;t<u.amountX;t++)for(let e=0;e<u.amountY;e++){const n=t*u.amountY+e,o=0;M[n*3]=t*u.separation-A/2+u.separation/2,M[n*3+1]=o,M[n*3+2]=e*u.separation-E/2+u.separation/2,Y[n]=Math.min(window.devicePixelRatio,2)}const G=new O;G.setAttribute("position",new W(M,3));G.setAttribute("scale",new W(Y,1));const r=new q({uniforms:{u_time:{value:0},u_mouse:{value:new H},u_res:{value:new H(A,0,E)},u_strength:{value:0}},vertexShader:rn,fragmentShader:sn});r.transparent=!0;r.blending=J;r.depthWrite=!1;const un=new N(G,r);j.add(un);const C=new K(new Q(A,E),new U({color:16777215,side:Z}));C.rotation.x=-Math.PI/2;C.visible=!1;j.add(C);const F=new nn,_=new en({antialias:!0});_.setSize(c.x,c.y);_.setPixelRatio(window.devicePixelRatio);document.body.appendChild(_.domElement);const g=new on(v,_.domElement);g.maxDistance=200;g.minDistance=100;g.enableDamping=!0;g.dampingFactor=.05;g.update();const B=new an;document.body.appendChild(B.dom);document.body.addEventListener("pointermove",cn);window.addEventListener("resize",dn);function cn(t){t.isPrimary!==!1&&(T.x=t.clientX/c.x*2-1,T.y=-(t.clientY/c.y)*2+1)}function dn(){c.x=window.innerWidth,c.y=window.innerHeight,v.aspect=c.x/c.y,v.updateProjectionMatrix(),_.setSize(c.x,c.y)}const I=document.querySelector(".info");let x;function mn(){F.setFromCamera(T,v);const t=F.intersectObject(C,!1),e=r.uniforms.u_strength.value,n=r.uniforms.u_mouse.value;if(t[0]){const o=t[0].point;x||(x=new H),x.set(o.x,o.y,o.z),e<1&&(r.uniforms.u_strength.value=f(e,1,.03)),r.uniforms.u_mouse.value.x=f(n.x,o.x,.02),r.uniforms.u_mouse.value.y=f(n.y,o.y,.02),r.uniforms.u_mouse.value.z=f(n.z,o.z,.02),I&&(I.innerHTML=`x: ${o.x.toFixed(2)}<br>y: ${o.y.toFixed(2)}<br>z: ${o.z.toFixed(2)}`)}else e>0&&(r.uniforms.u_strength.value=f(e,0,.01)),x&&(r.uniforms.u_mouse.value.x=f(n.x,x.x,.02),r.uniforms.u_mouse.value.y=f(n.y,x.y,.02),r.uniforms.u_mouse.value.z=f(n.z,x.z,.02))}function L(){requestAnimationFrame(L);const t=ln.getElapsedTime();mn(),g.update(),r.uniforms.u_time.value=t,_.render(j,v),B.update()}requestAnimationFrame(L);
