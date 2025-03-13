import{B as x,i as z,c as y,S as A,w as u,v as C,h as b}from"../../three.core-dda14ae8.js";/* empty css                  */import{W as j}from"../../World-fed11d95.js";import{S as B}from"../../sizes-40a94193.js";import"../../three.module-bbe333d0.js";import"../../OrbitControls-cba99037.js";var F=`precision mediump float;

uniform float u_time;
uniform vec2 u_res;

void main() {

  vec3 pos = position;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 0.1 * u_res.y;
  gl_PointSize *= (1.0 / -mvPosition.z);

  gl_Position = projectionMatrix * mvPosition;
}`,I=`precision mediump float;

float PI = 3.1415926;

void main() {

  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`;const i=new B,e=new j(i),W=({innerRadius:t=1,outerRadius:o=2,phiSegments:a=3,thetaStart:s=0,thetaLength:m=Math.PI,thetaSegmentsStep:S=10,thetaSegmentsStart:_=10}={})=>{let l=[],c=s+m/2;for(let n=0;n<a;n++){let p=_+n*S,f=t+(o-t)*n/a,P=m/(p-1);for(let r=0;r<p;r++){let d=s+r*P,h=Math.cos(d)*f,g=Math.sin(d)*f,M=0;h-=Math.cos(c)*(t+(o-t)/2),g-=Math.sin(c)*(t+(o-t)/2),l.push(h,g,M)}}return new Float32Array(l)},H=W({innerRadius:30,outerRadius:40,thetaSegmentsStart:20,thetaSegmentsStep:.6,phiSegments:40,thetaLength:Math.PI*.2});let v=new x;v.setAttribute("position",new z(H,3));const T=new y(10);e.scene.add(T);let V=new A({uniforms:{u_time:new u(0),u_res:new u(new C(i.width,i.height))},vertexShader:F,fragmentShader:I,transparent:!0,depthWrite:!1}),q=new b(v,V);e.scene.add(q);e.camera.position.set(0,0,10);e.camera.updateProjectionMatrix();const w=()=>{requestAnimationFrame(w),e.renderer.render(e.scene,e.camera)};w();
