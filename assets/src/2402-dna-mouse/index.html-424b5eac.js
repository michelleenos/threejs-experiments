var V=Object.defineProperty;var b=(t,e,o)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var s=(t,e,o)=>(b(t,typeof e!="symbol"?e+"":e,o),o);import{t as x,x as A,S as k,B as D,h as L,V as f,f as _,i as g,E as M,Y as q,b as j,Z as E}from"../../three.module-08dc1cdd.js";import{G as I}from"../../lil-gui.esm-ee8b5e9f.js";/* empty css                  */import{S as G,W as N}from"../../World-12b57747.js";import{c,D as W}from"../../data-view-d67d864a.js";import{M as $,g as z,S as H,F as B}from"../../ScrollTrigger-3d4f1a68.js";import{G as Z}from"../../GLTFLoader-da823e04.js";import"../../OrbitControls-f09e7187.js";var U=`precision mediump float;

float PI = 3.1415926;

uniform vec2 uMouse;
uniform vec2 uCamSize;
uniform float uPixelRatio;
uniform vec2 uResolution;
uniform float uTime;

varying vec4 vTestPosition;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  vec2 resolution = uResolution * uPixelRatio;
  vec2 st = gl_FragCoord.xy / resolution.xy;
  st.y *= resolution.y / resolution.x;

  vec2 mouse = uMouse;
  mouse *= 0.5;
  mouse += 0.5;
  mouse.y *= resolution.y / resolution.x;

  float d = distance(st, mouse);
  d = smoothstep(0.0, 0.2, d);
  d *= 2.0;

  vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0), d);
  color = vec3(fract(vTestPosition.x), 0.0, 1.0);
  gl_FragColor = vec4(color, strength);
}`,X=`precision mediump float;

uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
uniform float uNoiseResolution;

uniform float uSpeed;
uniform float uNoiseRadius;
uniform float uSquishMain;
uniform float uSquishMiddle;
uniform float uScaleMain;
uniform float uScaleMiddle;
uniform float uRadius;

uniform float uMousePow;
uniform float uMouseMult;

uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uMouseVel;

uniform float uMaxDistort;
uniform float uMouseAngle;

attribute float aScale;
attribute float aMiddleWeight;

varying vec4 vTestPosition;

#define PI 3.14159265358979323846

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
float snoise3d(vec3 p) {

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

vec3 getSphereNoise(vec4 pos) {
  float phi = snoise3d(pos.xyz * uNoiseResolution + uTime * uSpeed) * PI * 2.0;
  float theta =
      snoise3d(pos.xyz * uNoiseResolution - uTime * uSpeed) * PI * 2.0;

  vec3 noise =
      normal + vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
  noise *= uNoiseRadius;

  return noise;
}

vec3 mouseDisortFrom3Points(vec4 pos, vec3 mouse1, vec3 mouse2, vec3 mouse3) {
  float dist1 = distance(mouse1, pos.xyz);
  float dist2 = distance(mouse2, pos.xyz);
  float dist3 = distance(mouse3, pos.xyz);
  float dist = min(dist1, min(dist2, dist3));
  dist = clamp(dist, 0.0, 1.0);
  return (1.0 - dist) * 0.5 * normal;
}

vec2 clipToScreenSpace(vec4 pos, vec2 resolution) {
  vec2 screenPos = pos.xy / pos.w;
  screenPos.xy = screenPos.xy * 0.5 + 0.5;
  screenPos.y *= resolution.y / resolution.x;
  return screenPos;
}

vec4 screenToClipSpace(vec2 screenPos, vec4 pos, vec2 resolution) {
  screenPos.y /= resolution.y / resolution.x;
  pos.xy = screenPos * 2.0 - 1.0;
  pos.xy *= pos.w;
  return pos;
}

void main() {

  
  vec4 pos = vec4(position, 1.0);
  pos.xyz -= normal * (uSquishMiddle * (aMiddleWeight));
  pos.xyz -= normal * (uSquishMain * (1.0 - aMiddleWeight));

  
  vec3 noise = getSphereNoise(pos);
  pos.xyz -= noise;

  
  vec4 modelPosition = modelMatrix * pos;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  
  vec2 resolution = uResolution * uPixelRatio;
  vec2 mouse = uMouse;
  mouse = mouse * 0.5 + 0.5;
  mouse.y *= resolution.y / resolution.x;

  
  vec2 screenPos = clipToScreenSpace(projectedPosition, resolution);

  
  float d = distance(screenPos, mouse);
  d = smoothstep(0.0, uRadius, d);
  d = 1.0 - d;
  d = pow(d, uMousePow);

  vec2 distort = vec2(cos(uMouseAngle), sin(uMouseAngle));
  float amount = d * uMouseMult * uMouseVel;
  amount = clamp(amount, 0.0, uMaxDistort);
  distort *= amount;
  screenPos -= distort - distort * noise.xy;

  
  vTestPosition = vec4(d, screenPos.x, 0.0, 1.0);

  gl_Position = screenToClipSpace(screenPos, projectedPosition, resolution);

  
  float scale = mix(uScaleMain, uScaleMiddle, aMiddleWeight);
  scale *= aScale;
  scale *= uSize * uPixelRatio;
  scale *= (1.0 / -viewPosition.z);
  gl_PointSize = scale;
}`;function Y(t,e,o){return(1-o)*t+o*e}let J=[];document.addEventListener("click",()=>{console.log(J)});class O{constructor(e,o,n=28e3){s(this,"sizes");s(this,"world");s(this,"meshToSample");s(this,"sampler");s(this,"cloud");s(this,"material");s(this,"geometry");s(this,"raycaster");s(this,"intersectionCount",0);s(this,"mousePos",new x);s(this,"mousePrev",new x);s(this,"mousePosLerp",new x);s(this,"mouseVel",0);s(this,"mouseAngle",0);s(this,"mousePosLerpVal",.15);s(this,"mouseVelLerpVal",.05);s(this,"mouseDragMult",.999);s(this,"mouseVelToZero",1e-5);s(this,"useFakeMouse",!1);s(this,"fakeMouse",{pos:new x(.5,.5),vel:.1,angle:1});s(this,"_count");s(this,"onResize",()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio,this.material.uniforms.uResolution.value=new x(this.sizes.width,this.sizes.height);const e=this.world.camera.fov*Math.PI/180,o=2*Math.tan(e/2)*this.world.camera.position.z,n=o*this.world.camera.aspect;this.material.uniforms.uCamSize.value.x=Math.abs(n),this.material.uniforms.uCamSize.value.y=Math.abs(o)});s(this,"getPositions",()=>{const e=new f,o=new f,n=new _,l=new Float32Array(this._count*3),i=new Float32Array(this._count*3),r=new Float32Array(this._count),u=new Float32Array(this._count);for(let a=0;a<this._count;a++)this.sampler.sample(e,o,n),l[a*3+0]=e.x,l[a*3+1]=e.y,l[a*3+2]=e.z,i[a*3+0]=o.x,i[a*3+1]=o.y,i[a*3+2]=o.z,r[a]=1-n.r,u[a]=Math.random();this.geometry.setAttribute("position",new g(l,3)),this.geometry.setAttribute("aScale",new g(u,1)),this.geometry.setAttribute("normal",new g(i,3)),this.geometry.setAttribute("aMiddleWeight",new g(r,1))});s(this,"raycast",()=>{this.raycaster.setFromCamera(this.mousePos,this.world.camera);const e=this.raycaster.intersectObjects([this.cloud],!1);if(e.length>0){let o=e[0],n=e.length>1?e[e.length-1]:o,l=e[Math.floor(e.length/2)];this.intersectionCount=e.length,this.material.uniforms.uMouse1.value=o.point,this.material.uniforms.uMouse2.value=n.point,this.material.uniforms.uMouse3.value=l.point}});s(this,"onMouseMove",e=>{this.mousePos.set(e.clientX/this.sizes.width*2-1,-(e.clientY/this.sizes.height)*2+1)});s(this,"tick",(e,o)=>{if(this.material.uniforms.uTime.value=e,this.useFakeMouse){this.material.uniforms.uMouse.value=this.fakeMouse.pos,this.material.uniforms.uMouseAngle.value=this.fakeMouse.angle,this.material.uniforms.uMouseVel.value=this.fakeMouse.vel;return}this.mousePosLerp.lerp(this.mousePos,this.mousePosLerpVal*o*60);let n=this.mousePos.distanceTo(this.mousePrev);this.mouseVel=Y(this.mouseVel,n,this.mouseVelLerpVal*o*60),this.mouseAngle=Math.atan2(this.mousePosLerp.y-this.mousePrev.y,this.mousePosLerp.x-this.mousePrev.x),this.mousePrev.copy(this.mousePos),this.material.uniforms.uMouse.value=this.mousePosLerp,this.material.uniforms.uMouseAngle.value=this.mouseAngle,this.material.uniforms.uMouseVel.value=this.mouseVel,this.mouseVel>this.mouseVelToZero?this.mouseVel*=this.mouseDragMult:this.mouseVel=0});this.meshToSample=e,this.sampler=new $(this.meshToSample).build(),this._count=n,this.world=o,this.sizes=o.sizes,this.raycaster=new A,this.raycaster.params.Points.threshold=.6,this.material=new k({fragmentShader:U,vertexShader:X,transparent:!0,depthWrite:!1,uniforms:{uPixelRatio:{value:this.sizes.pixelRatio},uSize:{value:7},uScaleMain:{value:5},uScaleMiddle:{value:5},uSpeed:{value:.1},uNoiseResolution:{value:7},uNoiseRadius:{value:.03},uSquishMain:{value:.115},uSquishMiddle:{value:.027},uTime:{value:0},uRadius:{value:.45},uMouse:{value:new x},uMouseMult:{value:1.6},uMouseAngle:{value:0},uMouseVel:{value:0},uMaxDistort:{value:.2},uMousePow:{value:8},uCamSize:{value:new x},uResolution:{value:new x(this.sizes.width,this.sizes.height)}}}),this.onResize(),this.geometry=new D,this.cloud=new L(this.geometry,this.material),this.getPositions(),this.sizes.on("resize",this.onResize),document.addEventListener("mousemove",this.onMouseMove)}set threshold(e){this.raycaster.params.Points.threshold=e}get threshold(){return this.raycaster.params.Points.threshold}get count(){return this._count}set count(e){this._count=e,this.getPositions()}}const K=(t,e,o,n)=>{const l=t.createSection("camera");l.add(e.camera,"position"),l.add(e.camera,"rotation");let i=t.createSection("particles");i.add(o.cloud,"position"),i.add(o.cloud,"rotation");let r=t.createSection("mouse");r.add(o,"mouseVel","mouseVel",3),r.add(o,"mouseAngle","mouseAngle",3),Q(t,n)},Q=(t,e)=>{const o=u=>c("tr",{id:`scroll-${u}`},[c("th",{},u.toString()),c("td",{class:"pos"}),c("td",{class:"duration"}),c("td",{class:"offset"})]),n=[o(0),o(1),o(2)],l=c("table",{},[c("tr",{},[c("td"),c("th",{},"position"),c("th",{},"duration"),c("th",{},"offset")]),...n]),i=(u,a)=>{let d=u.querySelector(".pos"),v=u.querySelector(".duration"),w=u.querySelector(".offset");d.innerHTML=e.sections[a].position.toFixed(2),v.innerHTML=e.sections[a].duration.toFixed(2),w.innerHTML=e.sections[a].offset.toFixed(2)},r=()=>{n.forEach((u,a)=>i(u,a))};t.createCustomSection(l,r,"scroll positions")},ee=t=>{let e=new f(t.x,t.y,t.z);return e.x=Math.round(t.x*100)/100,e.y=Math.round(t.y*100)/100,e.z=Math.round(t.z*100)/100,e},P=(t,e)=>{let o=ee(t),n=t instanceof M?"Euler":"Vector3";return`${e}: new THREE.${n}(${o.x}, ${o.y}, ${o.z})`},oe=(t,e,o,n,l)=>{let i=t.addFolder("uniforms");i.add(o.material.uniforms.uSize,"value",0,100).name("size"),i.add(o.material.uniforms.uScaleMain,"value",0,10,.1).name("scale main"),i.add(o.material.uniforms.uScaleMiddle,"value",0,10,.1).name("scale middle"),i.add(o.material.uniforms.uNoiseResolution,"value",0,10,.1).name("noise resolution"),i.add(o.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),i.add(o.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),i.add(o.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),i.add(o.material.uniforms.uSquishMiddle,"value",0,.3,.001).name("squish middles");let r=t.addFolder("mouse");r.add(o.material.uniforms.uRadius,"value",0,.5,.001).name("radius"),r.add(o,"mousePosLerpVal",0,.5,.001).name("lerp pos"),r.add(o,"mouseVelLerpVal",0,.5,.001).name("lerp vel"),r.add(o,"mouseDragMult",.9,1,1e-4).name("drag mult"),r.add(o,"mouseVelToZero",0,.001,1e-4).name("vel min to 0"),r.add(o.material.uniforms.uMouseMult,"value",0,30,.1).name("mouse mult"),r.add(o.material.uniforms.uMousePow,"value",0,30,.1).name("mouse pow"),r.add(o.material.uniforms.uMaxDistort,"value",0,1,.01).name("max distort"),r.add(o,"useFakeMouse");let u=r.addFolder("fake mouse");u.add(o.fakeMouse.pos,"x",0,1,.01).name("x"),u.add(o.fakeMouse.pos,"y",0,1,.01).name("y"),u.add(o.fakeMouse,"vel",0,1,.01).name("vel"),u.add(o.fakeMouse,"angle",0,Math.PI*2,.01).name("angle");let a=t.addFolder("particles").close();a.add(o.raycaster.params.Points,"threshold",0,10,.01).name("raycaster threshold"),a.add(o,"count",0,1e5).name("count");let d=t.addFolder("camera").close().hide();d.add(e.camera.position,"x",-10,10).name("x"),d.add(e.camera.position,"y",-10,10).name("y"),d.add(e.camera.position,"z",-10,10).name("z"),d.add(e.camera.rotation,"x",-10,10).name("rx"),d.add(e.camera.rotation,"y",-10,10).name("ry"),d.add(e.camera.rotation,"z",-10,10).name("rz");let v=t.addFolder("mesh").close().hide();v.add(o.cloud.position,"x",-10,10).name("x"),v.add(o.cloud.position,"y",-10,10).name("y"),v.add(o.cloud.position,"z",-10,10).name("z"),v.add(o.cloud.rotation,"x",-10,10).name("rx"),v.add(o.cloud.rotation,"y",-10,10).name("ry"),v.add(o.cloud.rotation,"z",-10,10).name("rz"),n.enabled=!1,n.addEventListener("change",o.onResize);const w={copyCameraData:()=>{navigator.clipboard.writeText(`
            ${P(e.camera.position,"position")}

            ${P(e.camera.rotation,"rotation")}
`)},copyParticlesData:()=>{navigator.clipboard.writeText(`
            ${P(o.cloud.position,"position")}

            ${P(o.cloud.rotation,"rotation")}
`)},switchToFlyControls:()=>{te(t,e,o,n,l)}};t.add(w,"copyCameraData"),t.add(w,"copyParticlesData"),t.add(w,"switchToFlyControls")},te=(t,e,o,n,l)=>{n.enabled=!0,document.body.classList.add("controls-enabled"),l.destroy();let i=t.folders.find(d=>d._title==="camera");i&&i.show();let r=t.folders.find(d=>d._title==="mesh");r&&r.show();let u=t.controllers.find(d=>d._name==="switchToManualControls");u&&u.hide();const a={refreshControllers:()=>{t.controllersRecursive().forEach(d=>d.updateDisplay())},lookAtCenter:()=>{e.camera.lookAt(0,0,0),i&&i.controllersRecursive().forEach(d=>d.updateDisplay())}};t.add(a,"refreshControllers"),t.add(a,"lookAtCenter")};z.registerPlugin(H);const m=[{position:new f(1.86,1.11,1.07),rotation:new M(-.98,.49,.61),target:new f(-.28,-2.18,-1.16)},{position:new f(-5,-.2,-.6),rotation:new M(-1.58,-1.1,-.16)},{position:new f(-.6,2.28,-5.27),rotation:new M(-2.57,-.09,-1.43)}],S=[{position:new f(0,0,0),rotation:new M(Math.PI/2,0,Math.PI/2)},{position:new f(0,0,0),rotation:new M(Math.PI*3,0,Math.PI/2)},{position:new f(0,0,0),rotation:new M(Math.PI*3,0,Math.PI/2)}];class se{constructor(e,o,n){s(this,"el");s(this,"sections");s(this,"totalHeight",0);s(this,"world");s(this,"sizes");s(this,"particles");s(this,"timeline");s(this,"onResize",()=>{this.getSizes(),this.timeline.kill(),this.setTimeline()});s(this,"getSizes",()=>{let e=this.el.getBoundingClientRect();this.totalHeight=e.height;let o=0;this.sections.forEach(n=>{n.offset=o,n.position=o/this.totalHeight;let l=n.el.getBoundingClientRect();n.height=l.height,n.duration=n.height/this.totalHeight,o+=n.height+n.el.offsetTop})});s(this,"setTimeline",()=>{z.set(this.world.camera.position,{x:m[0].position.x,y:m[0].position.y,z:m[0].position.z}),z.set(this.world.camera.rotation,{x:m[0].rotation.x,y:m[0].rotation.y,z:m[0].rotation.z}),this.timeline=z.timeline({scrollTrigger:{trigger:this.el,start:"top top",end:"bottom bottom",scrub:1,immediateRender:!1}});for(let e=1;e<this.sections.length;e++)this.timeline.to(this.world.camera.position,{duration:this.sections[e-1].duration,x:m[e].position.x,y:m[e].position.y,z:m[e].position.z},this.sections[e-1].position).to(this.world.camera.rotation,{duration:this.sections[e-1].duration,x:m[e].rotation.x,y:m[e].rotation.y,z:m[e].rotation.z},"<"),S[e]&&S[e].rotation&&this.timeline.to(this.particles.cloud.rotation,{duration:this.sections[e-1].duration,x:S[e].rotation.x},"<")});s(this,"destroy",()=>{this.sizes.off("scroller/resize"),this.timeline.kill()});this.el=e,this.world=o,this.sizes=o.sizes,this.particles=n,this.sections=[...this.el.querySelectorAll(".section")].map(l=>({el:l,position:0,height:0,offset:0,duration:0})),this.getSizes(),this.sizes.on("scroller/resize",this.onResize),this.setTimeline()}}let h,R;const ne=new G,p=new N(ne,!1);p.renderer.outputColorSpace=q;window.world=p;const T=new E,y=new B(p.camera,p.renderer.domElement);y.movementSpeed=10;y.dragToLook=!0;y.autoForward=!1;y.rollSpeed=Math.PI/4;const ie=new I,C=new W().hide(),ae="/threejs-experiments",re=new Z;re.load(ae+"/scenes/dna/dna-2-painted.glb",t=>{var o,n;let e=(n=(o=t.scene)==null?void 0:o.children)==null?void 0:n[0];e instanceof j&&(h=new O(e,p),le())});const le=()=>{h.cloud.rotateX(Math.PI/2),h.cloud.rotateZ(Math.PI/2),p.scene.add(h.cloud);const t=document.querySelector(".page-content");R=new se(t,p,h),h.onResize(),oe(ie,p,h,y,R),K(C,p,h,R)},F=()=>{const t=T.getDelta(),e=T.getElapsedTime();h&&h.tick(e,t),y.update(t),C.update(),p.render(),window.requestAnimationFrame(F)};window.requestAnimationFrame(F);
