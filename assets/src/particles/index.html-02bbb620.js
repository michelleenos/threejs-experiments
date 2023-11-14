import{V as D,S as $,P as k,B as O,m as W,h as q,e as H,j as J,n as N,M as K,o as Q,a as U,c as Z,R as nn,W as en,d as tn}from"../../three.module-ee2665d0.js";/* empty css                  */import{O as on}from"../../OrbitControls-8938ac74.js";var S=function(){var t=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(s){s.preventDefault(),o(++t%e.children.length)},!1);function n(s){return e.appendChild(s.dom),s}function o(s){for(var l=0;l<e.children.length;l++)e.children[l].style.display=l===s?"block":"none";t=s}var m=(performance||Date).now(),c=m,a=0,g=n(new S.Panel("FPS","#0ff","#002")),b=n(new S.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var P=n(new S.Panel("MB","#f08","#201"));return o(0),{REVISION:16,dom:e,addPanel:n,showPanel:o,begin:function(){m=(performance||Date).now()},end:function(){a++;var s=(performance||Date).now();if(b.update(s-m,200),s>=c+1e3&&(g.update(a*1e3/(s-c),100),c=s,a=0,P)){var l=performance.memory;P.update(l.usedJSHeapSize/1048576,l.jsHeapSizeLimit/1048576)}return s},update:function(){m=this.end()},domElement:e,setMode:o}};S.Panel=function(t,e,n){var o=1/0,m=0,c=Math.round,a=c(window.devicePixelRatio||1),g=80*a,b=48*a,P=3*a,s=2*a,l=3*a,x=15*a,y=74*a,w=30*a,_=document.createElement("canvas");_.width=g,_.height=b,_.style.cssText="width:80px;height:48px";var i=_.getContext("2d");return i.font="bold "+9*a+"px Helvetica,Arial,sans-serif",i.textBaseline="top",i.fillStyle=n,i.fillRect(0,0,g,b),i.fillStyle=e,i.fillText(t,P,s),i.fillRect(l,x,y,w),i.fillStyle=n,i.globalAlpha=.9,i.fillRect(l,x,y,w),{dom:_,update:function(R,V){o=Math.min(o,R),m=Math.max(m,R),i.fillStyle=n,i.globalAlpha=1,i.fillRect(0,0,g,x),i.fillStyle=e,i.fillText(c(R)+" "+t+" ("+c(o)+"-"+c(m)+")",P,s),i.drawImage(_,l+a,x,y-a,w,l,x,y-a,w),i.fillRect(l+y-a,x,a,w),i.fillStyle=n,i.globalAlpha=.9,i.fillRect(l+y-a,x,a,c((1-R/V)*w))}}};const an=S;var sn=`precision mediump float;

uniform vec3 u_mouse;

float PI = 3.1415926;

varying float v_dist;
varying float v_toPointsCenter;

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

	vec2 toCenter = gl_PointCoord - vec2(0.5, 0.5);
	if ( length(toCenter) > 0.5 ) discard;
	float alpha = 1.0 - length(toCenter) * 2.0;
	
	float pointsdist = v_toPointsCenter;
	pointsdist = smoothstep(0.5, 0.0, pointsdist);
	pointsdist *= exp(pointsdist);
	pointsdist = min(1.0, pointsdist);
	

	

	alpha *= pointsdist;

	float g = v_dist * 2.0;
	float r = 0.6 - v_dist * 2.0;
	float b = 1.0;

	gl_FragColor = vec4( r, g, b, alpha );

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
	
	float push = smoothstep(edge, 1.0, 1.0 - dist);
	
	float pull = smoothstep(0.3, 1.0, dist);
	pull *= exp(pull);

	float adjust_y = sin(u_time * 3.0 + dist * 35.0 + cos(dist * 20.0)) * 10.0 * dist;
	float adjust_y_amt = smoothstep(1.0, 0.3, dist);
	
	
	pos.y -= adjust_y * adjust_y_amt;

	uv.x -= cos(angle) * (0.1 * push);
	uv.y -= sin(angle) * (0.1 * push);
	uv.x += cos(angle) * (0.2 * pull) * u_strength;
	uv.y += sin(angle) * (0.2 * pull) * u_strength;
	
	pos.x = uv.x * u_res.xz.x - u_res.xz.x / 2.0;
	pos.z = uv.y * u_res.xz.y - u_res.xz.y / 2.0;

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize =  scale * ( 600.0 / -mvPosition.z );

	gl_Position = projectionMatrix * mvPosition;
}`;function f(t,e,n){return(1-n)*t+n*e}const T=new D(0,0),d=new D(window.innerWidth,window.innerHeight),ln=new tn,u={separation:1,amountX:150,amountY:150},A=new $,p=new k(75,d.x/d.y,1,1e3);p.position.z=0;p.position.y=100;p.position.x=10;const X=u.amountX*u.amountY,M=new Float32Array(X*3),Y=new Float32Array(X);let j=u.amountX*u.separation,E=u.amountY*u.separation;for(let t=0;t<u.amountX;t++)for(let e=0;e<u.amountY;e++){const n=t*u.amountY+e,o=0;M[n*3]=t*u.separation-j/2+u.separation/2,M[n*3+1]=o,M[n*3+2]=e*u.separation-E/2+u.separation/2,Y[n]=Math.min(window.devicePixelRatio,2)}const G=new O;G.setAttribute("position",new W(M,3));G.setAttribute("scale",new W(Y,1));const r=new q({uniforms:{u_time:{value:0},u_mouse:{value:new H},u_res:{value:new H(j,0,E)},u_strength:{value:0}},vertexShader:rn,fragmentShader:sn});r.transparent=!0;r.blending=J;r.depthWrite=!1;const un=new N(G,r);A.add(un);const C=new K(new Q(j,E),new U({color:16777215,side:Z}));C.rotation.x=-Math.PI/2;C.visible=!1;A.add(C);const F=new nn,h=new en({antialias:!0});h.setSize(d.x,d.y);h.setPixelRatio(window.devicePixelRatio);document.body.appendChild(h.domElement);const v=new on(p,h.domElement);v.maxDistance=200;v.minDistance=100;v.autoRotate=!0;v.enableDamping=!0;v.dampingFactor=.05;v.autoRotateSpeed=3;v.update();const B=new an;document.body.appendChild(B.dom);document.body.addEventListener("pointermove",dn);window.addEventListener("resize",cn);function dn(t){t.isPrimary!==!1&&(T.x=t.clientX/d.x*2-1,T.y=-(t.clientY/d.y)*2+1)}function cn(){d.x=window.innerWidth,d.y=window.innerHeight,p.aspect=d.x/d.y,p.updateProjectionMatrix(),h.setSize(d.x,d.y)}const I=document.querySelector(".info"),z=new H(0,0);function mn(){F.setFromCamera(T,p);const t=F.intersectObject(C,!1),e=r.uniforms.u_strength.value,n=r.uniforms.u_mouse.value;if(t[0]){const o=t[0].point;z.set(o.x,o.y,o.z),e<1&&(r.uniforms.u_strength.value=f(e,1,.03)),r.uniforms.u_mouse.value.x=f(n.x,o.x,.04),r.uniforms.u_mouse.value.y=f(n.y,o.y,.04),r.uniforms.u_mouse.value.z=f(n.z,o.z,.04),I&&(I.innerHTML=`x: ${o.x.toFixed(2)}<br>y: ${o.y.toFixed(2)}<br>z: ${o.z.toFixed(2)}`)}else e>0&&(r.uniforms.u_strength.value=f(e,0,.01)),z&&(r.uniforms.u_mouse.value.x=f(n.x,z.x,.04),r.uniforms.u_mouse.value.y=f(n.y,z.y,.04),r.uniforms.u_mouse.value.z=f(n.z,z.z,.04))}function L(){requestAnimationFrame(L);const t=ln.getElapsedTime();mn(),v.update(),r.uniforms.u_time.value=t,h.render(A,p),B.update()}requestAnimationFrame(L);
