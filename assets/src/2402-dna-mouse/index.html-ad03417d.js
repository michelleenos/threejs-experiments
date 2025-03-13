import{v,x as F,S as V,B as b,h as A,V as h,f as k,i as w,E as x,Y as D,b as L,Z as _}from"../../three.core-cdbdf8aa.js";import{G as q}from"../../lil-gui.esm-ee8b5e9f.js";/* empty css                  */import{W as j}from"../../World-b0ac075c.js";import{D as E}from"../../data-view-3b86b9f4.js";import{S as I}from"../../sizes-40a94193.js";import{M as G,g as P,S as N,F as W}from"../../ScrollTrigger-8a23bfff.js";import{c as m}from"../../dom-8613d0e9.js";import{G as $}from"../../GLTFLoader-44ea4ceb.js";import"../../three.module-2b501472.js";import"../../OrbitControls-ed6ab3c1.js";var H=`precision mediump float;

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
}`,B=`precision mediump float;

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
}`;function Z(t,e,o){return(1-o)*t+o*e}let U=[];document.addEventListener("click",()=>{console.log(U)});class X{sizes;world;meshToSample;sampler;cloud;material;geometry;raycaster;intersectionCount=0;mousePos=new v;mousePrev=new v;mousePosLerp=new v;mouseVel=0;mouseAngle=0;mousePosLerpVal=.15;mouseVelLerpVal=.05;mouseDragMult=.999;mouseVelToZero=1e-5;useFakeMouse=!1;fakeMouse={pos:new v(.5,.5),vel:.1,angle:1};_count;constructor(e,o,s=28e3){this.meshToSample=e,this.sampler=new G(this.meshToSample).build(),this._count=s,this.world=o,this.sizes=o.sizes,this.raycaster=new F,this.raycaster.params.Points.threshold=.6,this.material=new V({fragmentShader:H,vertexShader:B,transparent:!0,depthWrite:!1,uniforms:{uPixelRatio:{value:this.sizes.pixelRatio},uSize:{value:7},uScaleMain:{value:5},uScaleMiddle:{value:5},uSpeed:{value:.1},uNoiseResolution:{value:7},uNoiseRadius:{value:.03},uSquishMain:{value:.115},uSquishMiddle:{value:.027},uTime:{value:0},uRadius:{value:.45},uMouse:{value:new v},uMouseMult:{value:1.6},uMouseAngle:{value:0},uMouseVel:{value:0},uMaxDistort:{value:.2},uMousePow:{value:8},uCamSize:{value:new v},uResolution:{value:new v(this.sizes.width,this.sizes.height)}}}),this.onResize(),this.geometry=new b,this.cloud=new A(this.geometry,this.material),this.getPositions(),this.sizes.on("resize",this.onResize),document.addEventListener("mousemove",this.onMouseMove)}onResize=()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio,this.material.uniforms.uResolution.value=new v(this.sizes.width,this.sizes.height);const e=this.world.camera.fov*Math.PI/180,o=2*Math.tan(e/2)*this.world.camera.position.z,s=o*this.world.camera.aspect;this.material.uniforms.uCamSize.value.x=Math.abs(s),this.material.uniforms.uCamSize.value.y=Math.abs(o)};set threshold(e){this.raycaster.params.Points.threshold=e}get threshold(){return this.raycaster.params.Points.threshold}get count(){return this._count}set count(e){this._count=e,this.getPositions()}getPositions=()=>{const e=new h,o=new h,s=new k,r=new Float32Array(this._count*3),n=new Float32Array(this._count*3),a=new Float32Array(this._count),l=new Float32Array(this._count);for(let i=0;i<this._count;i++)this.sampler.sample(e,o,s),r[i*3+0]=e.x,r[i*3+1]=e.y,r[i*3+2]=e.z,n[i*3+0]=o.x,n[i*3+1]=o.y,n[i*3+2]=o.z,a[i]=1-s.r,l[i]=Math.random();this.geometry.setAttribute("position",new w(r,3)),this.geometry.setAttribute("aScale",new w(l,1)),this.geometry.setAttribute("normal",new w(n,3)),this.geometry.setAttribute("aMiddleWeight",new w(a,1))};raycast=()=>{this.raycaster.setFromCamera(this.mousePos,this.world.camera);const e=this.raycaster.intersectObjects([this.cloud],!1);if(e.length>0){let o=e[0],s=e.length>1?e[e.length-1]:o,r=e[Math.floor(e.length/2)];this.intersectionCount=e.length,this.material.uniforms.uMouse1.value=o.point,this.material.uniforms.uMouse2.value=s.point,this.material.uniforms.uMouse3.value=r.point}};onMouseMove=e=>{this.mousePos.set(e.clientX/this.sizes.width*2-1,-(e.clientY/this.sizes.height)*2+1)};tick=(e,o)=>{if(this.material.uniforms.uTime.value=e,this.useFakeMouse){this.material.uniforms.uMouse.value=this.fakeMouse.pos,this.material.uniforms.uMouseAngle.value=this.fakeMouse.angle,this.material.uniforms.uMouseVel.value=this.fakeMouse.vel;return}this.mousePosLerp.lerp(this.mousePos,this.mousePosLerpVal*o*60);let s=this.mousePos.distanceTo(this.mousePrev);this.mouseVel=Z(this.mouseVel,s,this.mouseVelLerpVal*o*60),this.mouseAngle=Math.atan2(this.mousePosLerp.y-this.mousePrev.y,this.mousePosLerp.x-this.mousePrev.x),this.mousePrev.copy(this.mousePos),this.material.uniforms.uMouse.value=this.mousePosLerp,this.material.uniforms.uMouseAngle.value=this.mouseAngle,this.material.uniforms.uMouseVel.value=this.mouseVel,this.mouseVel>this.mouseVelToZero?this.mouseVel*=this.mouseDragMult:this.mouseVel=0}}const Y=(t,e,o,s)=>{const r=t.createSection("camera");r.add(e.camera,"position"),r.add(e.camera,"rotation");let n=t.createSection("particles");n.add(o.cloud,"position"),n.add(o.cloud,"rotation");let a=t.createSection("mouse");a.add(o,"mouseVel","mouseVel",3),a.add(o,"mouseAngle","mouseAngle",3),J(t,s)},J=(t,e)=>{const o=l=>m("tr",{id:`scroll-${l}`},[m("th",{},l.toString()),m("td",{class:"pos"}),m("td",{class:"duration"}),m("td",{class:"offset"})]),s=[o(0),o(1),o(2)],r=m("table",{},[m("tr",{},[m("td"),m("th",{},"position"),m("th",{},"duration"),m("th",{},"offset")]),...s]),n=(l,i)=>{let u=l.querySelector(".pos"),p=l.querySelector(".duration"),y=l.querySelector(".offset");u.innerHTML=e.sections[i].position.toFixed(2),p.innerHTML=e.sections[i].duration.toFixed(2),y.innerHTML=e.sections[i].offset.toFixed(2)},a=()=>{s.forEach((l,i)=>n(l,i))};t.createCustomSection(r,a,"scroll positions")},O=t=>{let e=new h(t.x,t.y,t.z);return e.x=Math.round(t.x*100)/100,e.y=Math.round(t.y*100)/100,e.z=Math.round(t.z*100)/100,e},g=(t,e)=>{let o=O(t),s=t instanceof x?"Euler":"Vector3";return`${e}: new THREE.${s}(${o.x}, ${o.y}, ${o.z})`},K=(t,e,o,s,r)=>{let n=t.addFolder("uniforms");n.add(o.material.uniforms.uSize,"value",0,100).name("size"),n.add(o.material.uniforms.uScaleMain,"value",0,10,.1).name("scale main"),n.add(o.material.uniforms.uScaleMiddle,"value",0,10,.1).name("scale middle"),n.add(o.material.uniforms.uNoiseResolution,"value",0,10,.1).name("noise resolution"),n.add(o.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),n.add(o.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),n.add(o.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),n.add(o.material.uniforms.uSquishMiddle,"value",0,.3,.001).name("squish middles");let a=t.addFolder("mouse");a.add(o.material.uniforms.uRadius,"value",0,.5,.001).name("radius"),a.add(o,"mousePosLerpVal",0,.5,.001).name("lerp pos"),a.add(o,"mouseVelLerpVal",0,.5,.001).name("lerp vel"),a.add(o,"mouseDragMult",.9,1,1e-4).name("drag mult"),a.add(o,"mouseVelToZero",0,.001,1e-4).name("vel min to 0"),a.add(o.material.uniforms.uMouseMult,"value",0,30,.1).name("mouse mult"),a.add(o.material.uniforms.uMousePow,"value",0,30,.1).name("mouse pow"),a.add(o.material.uniforms.uMaxDistort,"value",0,1,.01).name("max distort"),a.add(o,"useFakeMouse");let l=a.addFolder("fake mouse");l.add(o.fakeMouse.pos,"x",0,1,.01).name("x"),l.add(o.fakeMouse.pos,"y",0,1,.01).name("y"),l.add(o.fakeMouse,"vel",0,1,.01).name("vel"),l.add(o.fakeMouse,"angle",0,Math.PI*2,.01).name("angle");let i=t.addFolder("particles").close();i.add(o.raycaster.params.Points,"threshold",0,10,.01).name("raycaster threshold"),i.add(o,"count",0,1e5).name("count");let u=t.addFolder("camera").close().hide();u.add(e.camera.position,"x",-10,10).name("x"),u.add(e.camera.position,"y",-10,10).name("y"),u.add(e.camera.position,"z",-10,10).name("z"),u.add(e.camera.rotation,"x",-10,10).name("rx"),u.add(e.camera.rotation,"y",-10,10).name("ry"),u.add(e.camera.rotation,"z",-10,10).name("rz");let p=t.addFolder("mesh").close().hide();p.add(o.cloud.position,"x",-10,10).name("x"),p.add(o.cloud.position,"y",-10,10).name("y"),p.add(o.cloud.position,"z",-10,10).name("z"),p.add(o.cloud.rotation,"x",-10,10).name("rx"),p.add(o.cloud.rotation,"y",-10,10).name("ry"),p.add(o.cloud.rotation,"z",-10,10).name("rz"),s.enabled=!1,s.addEventListener("change",o.onResize);const y={copyCameraData:()=>{navigator.clipboard.writeText(`
            ${g(e.camera.position,"position")}

            ${g(e.camera.rotation,"rotation")}
`)},copyParticlesData:()=>{navigator.clipboard.writeText(`
            ${g(o.cloud.position,"position")}

            ${g(o.cloud.rotation,"rotation")}
`)},switchToFlyControls:()=>{Q(t,e,o,s,r)}};t.add(y,"copyCameraData"),t.add(y,"copyParticlesData"),t.add(y,"switchToFlyControls")},Q=(t,e,o,s,r)=>{s.enabled=!0,document.body.classList.add("controls-enabled"),r.destroy();let n=t.folders.find(u=>u._title==="camera");n&&n.show();let a=t.folders.find(u=>u._title==="mesh");a&&a.show();let l=t.controllers.find(u=>u._name==="switchToManualControls");l&&l.hide();const i={refreshControllers:()=>{t.controllersRecursive().forEach(u=>u.updateDisplay())},lookAtCenter:()=>{e.camera.lookAt(0,0,0),n&&n.controllersRecursive().forEach(u=>u.updateDisplay())}};t.add(i,"refreshControllers"),t.add(i,"lookAtCenter")};P.registerPlugin(N);const d=[{position:new h(1.86,1.11,1.07),rotation:new x(-.98,.49,.61),target:new h(-.28,-2.18,-1.16)},{position:new h(-5,-.2,-.6),rotation:new x(-1.58,-1.1,-.16)},{position:new h(-.6,2.28,-5.27),rotation:new x(-2.57,-.09,-1.43)}],z=[{position:new h(0,0,0),rotation:new x(Math.PI/2,0,Math.PI/2)},{position:new h(0,0,0),rotation:new x(Math.PI*3,0,Math.PI/2)},{position:new h(0,0,0),rotation:new x(Math.PI*3,0,Math.PI/2)}];class ee{el;sections;totalHeight=0;world;sizes;particles;timeline;constructor(e,o,s){this.el=e,this.world=o,this.sizes=o.sizes,this.particles=s,this.sections=[...this.el.querySelectorAll(".section")].map(r=>({el:r,position:0,height:0,offset:0,duration:0})),this.getSizes(),this.sizes.on("scroller/resize",this.onResize),this.setTimeline()}onResize=()=>{this.getSizes(),this.timeline.kill(),this.setTimeline()};getSizes=()=>{let e=this.el.getBoundingClientRect();this.totalHeight=e.height;let o=0;this.sections.forEach(s=>{s.offset=o,s.position=o/this.totalHeight;let r=s.el.getBoundingClientRect();s.height=r.height,s.duration=s.height/this.totalHeight,o+=s.height+s.el.offsetTop})};setTimeline=()=>{P.set(this.world.camera.position,{x:d[0].position.x,y:d[0].position.y,z:d[0].position.z}),P.set(this.world.camera.rotation,{x:d[0].rotation.x,y:d[0].rotation.y,z:d[0].rotation.z}),this.timeline=P.timeline({scrollTrigger:{trigger:this.el,start:"top top",end:"bottom bottom",scrub:1,immediateRender:!1}});for(let e=1;e<this.sections.length;e++)this.timeline.to(this.world.camera.position,{duration:this.sections[e-1].duration,x:d[e].position.x,y:d[e].position.y,z:d[e].position.z},this.sections[e-1].position).to(this.world.camera.rotation,{duration:this.sections[e-1].duration,x:d[e].rotation.x,y:d[e].rotation.y,z:d[e].rotation.z},"<"),z[e]&&z[e].rotation&&this.timeline.to(this.particles.cloud.rotation,{duration:this.sections[e-1].duration,x:z[e].rotation.x},"<")};destroy=()=>{this.sizes.off("scroller/resize"),this.timeline.kill()}}let c,S;const oe=new I,f=new j(oe,!1);f.renderer.outputColorSpace=D;window.world=f;const R=new _,M=new W(f.camera,f.renderer.domElement);M.movementSpeed=10;M.dragToLook=!0;M.autoForward=!1;M.rollSpeed=Math.PI/4;const te=new q,T=new E().hide(),se="/threejs-experiments",ne=new $;ne.load(se+"/scenes/dna/dna-2-painted.glb",t=>{let e=t.scene?.children?.[0];e instanceof L&&(c=new X(e,f),ie())});const ie=()=>{c.cloud.rotateX(Math.PI/2),c.cloud.rotateZ(Math.PI/2),f.scene.add(c.cloud);const t=document.querySelector(".page-content");S=new ee(t,f,c),c.onResize(),K(te,f,c,M,S),Y(T,f,c,S)},C=()=>{const t=R.getDelta(),e=R.getElapsedTime();c&&c.tick(e,t),M.update(t),T.update(),f.render(),window.requestAnimationFrame(C)};window.requestAnimationFrame(C);
