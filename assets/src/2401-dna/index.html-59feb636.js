var F=Object.defineProperty;var _=(o,e,t)=>e in o?F(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(_(o,typeof e!="symbol"?e+"":e,t),t);import{x as q,S as A,t as y,B as D,h as j,V as h,f as E,i as v,E as w,Y as G,b as I,Z as N}from"../../three.module-08dc1cdd.js";import{G as k}from"../../lil-gui.esm-ee8b5e9f.js";/* empty css                  */import{S as L,W}from"../../World-12b57747.js";import{M as $,c as u,g as S,S as H,F as V,D as B}from"../../ScrollTrigger-31745efc.js";import{G as U}from"../../GLTFLoader-da823e04.js";import"../../OrbitControls-f09e7187.js";var Z=`precision mediump float;

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

  gl_FragColor = vec4(vec3(1.0), strength);
}`,J=`precision mediump float;

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

attribute float aScale;
attribute float aMiddleWeight;
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

void main() {

  
  vec4 pos = vec4(position, 1.0);
  pos.xyz -= normal * (uSquishMiddle * (aMiddleWeight));
  pos.xyz -= normal * (uSquishMain * (1.0 - aMiddleWeight));

  
  vec3 noise = getSphereNoise(pos);
  pos.xyz -= noise;

  
  vec4 modelPosition = modelMatrix * pos;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  
  float scale = mix(uScaleMain, uScaleMiddle, aMiddleWeight);
  scale *= aScale;
  scale *= uSize * uPixelRatio;
  scale *= (1.0 / -viewPosition.z);
  gl_PointSize = scale;
}`;class X{constructor(e,t,i=28e3){a(this,"sizes");a(this,"world");a(this,"meshToSample");a(this,"sampler");a(this,"cloud");a(this,"material");a(this,"geometry");a(this,"raycaster");a(this,"intersectionCount",0);a(this,"_count");a(this,"onResize",()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio,this.material.uniforms.uResolution.value=new y(this.sizes.width,this.sizes.height);const e=this.world.camera.fov*Math.PI/180,t=2*Math.tan(e/2)*this.world.camera.position.z,i=t*this.world.camera.aspect;this.material.uniforms.uCamSize.value.x=Math.abs(i),this.material.uniforms.uCamSize.value.y=Math.abs(t)});a(this,"getPositions",()=>{const e=new h,t=new h,i=new E,l=new Float32Array(this._count*3),s=new Float32Array(this._count*3),p=new Float32Array(this._count),r=new Float32Array(this._count);for(let n=0;n<this._count;n++)this.sampler.sample(e,t,i),l[n*3+0]=e.x,l[n*3+1]=e.y,l[n*3+2]=e.z,s[n*3+0]=t.x,s[n*3+1]=t.y,s[n*3+2]=t.z,p[n]=1-i.r,r[n]=Math.random();this.geometry.setAttribute("position",new v(l,3)),this.geometry.setAttribute("aScale",new v(r,1)),this.geometry.setAttribute("normal",new v(s,3)),this.geometry.setAttribute("aMiddleWeight",new v(p,1))});a(this,"tick",e=>{this.material.uniforms.uTime.value=e});this.meshToSample=e,this.sampler=new $(this.meshToSample).build(),this._count=i,this.world=t,this.sizes=t.sizes,this.raycaster=new q,this.raycaster.params.Points.threshold=.6,this.material=new A({fragmentShader:Z,vertexShader:J,transparent:!0,depthWrite:!1,uniforms:{uPixelRatio:{value:this.sizes.pixelRatio},uSize:{value:7},uScaleMain:{value:5},uScaleMiddle:{value:5},uSpeed:{value:.1},uNoiseResolution:{value:7},uNoiseRadius:{value:.03},uSquishMain:{value:.115},uSquishMiddle:{value:.027},uTime:{value:0},uMaxDistort:{value:.2},uCamSize:{value:new y},uResolution:{value:new y(this.sizes.width,this.sizes.height)}}}),this.onResize(),this.geometry=new D,this.cloud=new j(this.geometry,this.material),this.getPositions(),this.sizes.on("resize",this.onResize)}set threshold(e){this.raycaster.params.Points.threshold=e}get threshold(){return this.raycaster.params.Points.threshold}get count(){return this._count}set count(e){this._count=e,this.getPositions()}}const Y=(o,e,t,i)=>{const l=o.createSection("camera");l.add(e.camera,"position"),l.add(e.camera,"rotation");let s=o.createSection("particles");s.add(t.cloud,"position"),s.add(t.cloud,"rotation"),K(o,i)},K=(o,e)=>{const t=r=>u("tr",{id:`scroll-${r}`},[u("th",{},r.toString()),u("td",{class:"pos"}),u("td",{class:"duration"}),u("td",{class:"offset"})]),i=[t(0),t(1),t(2)],l=u("table",{},[u("tr",{},[u("td"),u("th",{},"position"),u("th",{},"duration"),u("th",{},"offset")]),...i]),s=(r,n)=>{let d=r.querySelector(".pos"),C=r.querySelector(".duration"),b=r.querySelector(".offset");d.innerHTML=e.sections[n].position.toFixed(2),C.innerHTML=e.sections[n].duration.toFixed(2),b.innerHTML=e.sections[n].offset.toFixed(2)},p=()=>{i.forEach((r,n)=>s(r,n))};o.createCustomSection(l,p,"scroll positions")},O=o=>{let e=new h(o.x,o.y,o.z);return e.x=Math.round(o.x*100)/100,e.y=Math.round(o.y*100)/100,e.z=Math.round(o.z*100)/100,e},z=(o,e)=>{let t=O(o),i=o instanceof w?"Euler":"Vector3";return`${e}: new THREE.${i}(${t.x}, ${t.y}, ${t.z})`},Q=(o,e,t,i,l)=>{let s=o.addFolder("uniforms");s.add(t.material.uniforms.uSize,"value",0,100).name("size"),s.add(t.material.uniforms.uScaleMain,"value",0,10,.1).name("scale main"),s.add(t.material.uniforms.uScaleMiddle,"value",0,10,.1).name("scale middle"),s.add(t.material.uniforms.uNoiseResolution,"value",0,10,.1).name("noise resolution"),s.add(t.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),s.add(t.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),s.add(t.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),s.add(t.material.uniforms.uSquishMiddle,"value",0,.3,.001).name("squish middles"),o.addFolder("particles").close().add(t,"count",0,1e5).name("count");let r=o.addFolder("camera").close().hide();r.add(e.camera.position,"x",-10,10).name("x"),r.add(e.camera.position,"y",-10,10).name("y"),r.add(e.camera.position,"z",-10,10).name("z"),r.add(e.camera.rotation,"x",-10,10).name("rx"),r.add(e.camera.rotation,"y",-10,10).name("ry"),r.add(e.camera.rotation,"z",-10,10).name("rz");let n=o.addFolder("mesh").close().hide();n.add(t.cloud.position,"x",-10,10).name("x"),n.add(t.cloud.position,"y",-10,10).name("y"),n.add(t.cloud.position,"z",-10,10).name("z"),n.add(t.cloud.rotation,"x",-10,10).name("rx"),n.add(t.cloud.rotation,"y",-10,10).name("ry"),n.add(t.cloud.rotation,"z",-10,10).name("rz"),i.enabled=!1,i.addEventListener("change",t.onResize);const d={copyCameraData:()=>{navigator.clipboard.writeText(`
            ${z(e.camera.position,"position")}

            ${z(e.camera.rotation,"rotation")}
`)},copyParticlesData:()=>{navigator.clipboard.writeText(`
            ${z(t.cloud.position,"position")}

            ${z(t.cloud.rotation,"rotation")}
`)},switchToFlyControls:()=>{ee(o,e,t,i,l)}};o.add(d,"copyCameraData"),o.add(d,"copyParticlesData"),o.add(d,"switchToFlyControls")},ee=(o,e,t,i,l)=>{i.enabled=!0,document.body.classList.add("controls-enabled"),l.destroy();let s=o.folders.find(d=>d._title==="camera");s&&s.show();let p=o.folders.find(d=>d._title==="mesh");p&&p.show();let r=o.controllers.find(d=>d._name==="switchToManualControls");r&&r.hide();const n={refreshControllers:()=>{o.controllersRecursive().forEach(d=>d.updateDisplay())},lookAtCenter:()=>{e.camera.lookAt(0,0,0),s&&s.controllersRecursive().forEach(d=>d.updateDisplay())}};o.add(n,"refreshControllers"),o.add(n,"lookAtCenter")};S.registerPlugin(H);const c=[{position:new h(1.86,1.11,1.07),rotation:new w(-.98,.49,.61),target:new h(-.28,-2.18,-1.16)},{position:new h(-5,-.2,-.6),rotation:new w(-1.58,-1.1,-.16)},{position:new h(-.6,2.28,-5.27),rotation:new w(-2.57,-.09,-1.43)}],g=[{position:new h(0,0,0),rotation:new w(Math.PI/2,0,Math.PI/2)},{position:new h(0,0,0),rotation:new w(Math.PI*3,0,Math.PI/2)},{position:new h(0,0,0),rotation:new w(Math.PI*3,0,Math.PI/2)}];class te{constructor(e,t,i){a(this,"el");a(this,"sections");a(this,"totalHeight",0);a(this,"world");a(this,"sizes");a(this,"particles");a(this,"timeline");a(this,"onResize",()=>{this.getSizes(),this.timeline.kill(),this.setTimeline()});a(this,"getSizes",()=>{let e=this.el.getBoundingClientRect();this.totalHeight=e.height;let t=0;this.sections.forEach(i=>{i.offset=t,i.position=t/this.totalHeight;let l=i.el.getBoundingClientRect();i.height=l.height,i.duration=i.height/this.totalHeight,t+=i.height+i.el.offsetTop})});a(this,"setTimeline",()=>{S.set(this.world.camera.position,{x:c[0].position.x,y:c[0].position.y,z:c[0].position.z}),S.set(this.world.camera.rotation,{x:c[0].rotation.x,y:c[0].rotation.y,z:c[0].rotation.z}),this.timeline=S.timeline({scrollTrigger:{trigger:this.el,start:"top top",end:"bottom bottom",scrub:1,immediateRender:!1}});for(let e=1;e<this.sections.length;e++)this.timeline.to(this.world.camera.position,{duration:this.sections[e-1].duration,x:c[e].position.x,y:c[e].position.y,z:c[e].position.z},this.sections[e-1].position).to(this.world.camera.rotation,{duration:this.sections[e-1].duration,x:c[e].rotation.x,y:c[e].rotation.y,z:c[e].rotation.z},"<"),g[e]&&g[e].rotation&&this.timeline.to(this.particles.cloud.rotation,{duration:this.sections[e-1].duration,x:g[e].rotation.x},"<")});a(this,"destroy",()=>{this.sizes.off("scroller/resize"),this.timeline.kill()});this.el=e,this.world=t,this.sizes=t.sizes,this.particles=i,this.sections=[...this.el.querySelectorAll(".section")].map(l=>({el:l,position:0,height:0,offset:0,duration:0})),this.getSizes(),this.sizes.on("scroller/resize",this.onResize),this.setTimeline()}}let m,M;const oe=new L,f=new W(oe,!1);f.renderer.outputColorSpace=G;window.world=f;const P=new N,x=new V(f.camera,f.renderer.domElement);x.movementSpeed=10;x.dragToLook=!0;x.autoForward=!1;x.rollSpeed=Math.PI/4;const ie=new k,R=new B().hide(),ne="/threejs-experiments",ae=new U;ae.load(ne+"/scenes/dna/dna-2-painted.glb",o=>{var t,i;let e=(i=(t=o.scene)==null?void 0:t.children)==null?void 0:i[0];e instanceof I&&(m=new X(e,f),se())});const se=()=>{m.cloud.rotateX(Math.PI/2),m.cloud.rotateZ(Math.PI/2),f.scene.add(m.cloud);const o=document.querySelector(".page-content");M=new te(o,f,m),m.onResize(),Q(ie,f,m,x,M),Y(R,f,m,M)},T=()=>{const o=P.getDelta(),e=P.getElapsedTime();m&&m.tick(e),x.update(o),R.update(),f.render(),window.requestAnimationFrame(T)};window.requestAnimationFrame(T);
