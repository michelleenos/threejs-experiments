import{x as b,S as F,v as S,B as _,h as q,V as m,f as A,i as x,E as p,Y as D,b as j,Z as E}from"../../three.core-dda14ae8.js";import{G}from"../../lil-gui.esm-ee8b5e9f.js";/* empty css                  */import{W as I}from"../../World-fed11d95.js";import{D as N}from"../../data-view-9dccc0e8.js";import{S as k}from"../../sizes-40a94193.js";import{M as L,g as z,S as W,F as $}from"../../ScrollTrigger-3a74ae4a.js";import{c}from"../../dom-8613d0e9.js";import{G as H}from"../../GLTFLoader-03a1bcb0.js";import"../../three.module-bbe333d0.js";import"../../OrbitControls-cba99037.js";var V=`precision mediump float;

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
}`;class U{sizes;world;meshToSample;sampler;cloud;material;geometry;raycaster;intersectionCount=0;_count;constructor(e,t,i=28e3){this.meshToSample=e,this.sampler=new L(this.meshToSample).build(),this._count=i,this.world=t,this.sizes=t.sizes,this.raycaster=new b,this.raycaster.params.Points.threshold=.6,this.material=new F({fragmentShader:V,vertexShader:B,transparent:!0,depthWrite:!1,uniforms:{uPixelRatio:{value:this.sizes.pixelRatio},uSize:{value:7},uScaleMain:{value:5},uScaleMiddle:{value:5},uSpeed:{value:.1},uNoiseResolution:{value:7},uNoiseRadius:{value:.03},uSquishMain:{value:.115},uSquishMiddle:{value:.027},uTime:{value:0},uMaxDistort:{value:.2},uCamSize:{value:new S},uResolution:{value:new S(this.sizes.width,this.sizes.height)}}}),this.onResize(),this.geometry=new _,this.cloud=new q(this.geometry,this.material),this.getPositions(),this.sizes.on("resize",this.onResize)}onResize=()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio,this.material.uniforms.uResolution.value=new S(this.sizes.width,this.sizes.height);const e=this.world.camera.fov*Math.PI/180,t=2*Math.tan(e/2)*this.world.camera.position.z,i=t*this.world.camera.aspect;this.material.uniforms.uCamSize.value.x=Math.abs(i),this.material.uniforms.uCamSize.value.y=Math.abs(t)};set threshold(e){this.raycaster.params.Points.threshold=e}get threshold(){return this.raycaster.params.Points.threshold}get count(){return this._count}set count(e){this._count=e,this.getPositions()}getPositions=()=>{const e=new m,t=new m,i=new A,r=new Float32Array(this._count*3),a=new Float32Array(this._count*3),f=new Float32Array(this._count),s=new Float32Array(this._count);for(let n=0;n<this._count;n++)this.sampler.sample(e,t,i),r[n*3+0]=e.x,r[n*3+1]=e.y,r[n*3+2]=e.z,a[n*3+0]=t.x,a[n*3+1]=t.y,a[n*3+2]=t.z,f[n]=1-i.r,s[n]=Math.random();this.geometry.setAttribute("position",new x(r,3)),this.geometry.setAttribute("aScale",new x(s,1)),this.geometry.setAttribute("normal",new x(a,3)),this.geometry.setAttribute("aMiddleWeight",new x(f,1))};tick=e=>{this.material.uniforms.uTime.value=e}}const Z=(o,e,t,i)=>{const r=o.createSection("camera");r.add(e.camera,"position"),r.add(e.camera,"rotation");let a=o.createSection("particles");a.add(t.cloud,"position"),a.add(t.cloud,"rotation"),J(o,i)},J=(o,e)=>{const t=s=>c("tr",{id:`scroll-${s}`},[c("th",{},s.toString()),c("td",{class:"pos"}),c("td",{class:"duration"}),c("td",{class:"offset"})]),i=[t(0),t(1),t(2)],r=c("table",{},[c("tr",{},[c("td"),c("th",{},"position"),c("th",{},"duration"),c("th",{},"offset")]),...i]),a=(s,n)=>{let l=s.querySelector(".pos"),T=s.querySelector(".duration"),C=s.querySelector(".offset");l.innerHTML=e.sections[n].position.toFixed(2),T.innerHTML=e.sections[n].duration.toFixed(2),C.innerHTML=e.sections[n].offset.toFixed(2)},f=()=>{i.forEach((s,n)=>a(s,n))};o.createCustomSection(r,f,"scroll positions")},X=o=>{let e=new m(o.x,o.y,o.z);return e.x=Math.round(o.x*100)/100,e.y=Math.round(o.y*100)/100,e.z=Math.round(o.z*100)/100,e},v=(o,e)=>{let t=X(o),i=o instanceof p?"Euler":"Vector3";return`${e}: new THREE.${i}(${t.x}, ${t.y}, ${t.z})`},Y=(o,e,t,i,r)=>{let a=o.addFolder("uniforms");a.add(t.material.uniforms.uSize,"value",0,100).name("size"),a.add(t.material.uniforms.uScaleMain,"value",0,10,.1).name("scale main"),a.add(t.material.uniforms.uScaleMiddle,"value",0,10,.1).name("scale middle"),a.add(t.material.uniforms.uNoiseResolution,"value",0,10,.1).name("noise resolution"),a.add(t.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),a.add(t.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),a.add(t.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),a.add(t.material.uniforms.uSquishMiddle,"value",0,.3,.001).name("squish middles"),o.addFolder("particles").close().add(t,"count",0,1e5).name("count");let s=o.addFolder("camera").close().hide();s.add(e.camera.position,"x",-10,10).name("x"),s.add(e.camera.position,"y",-10,10).name("y"),s.add(e.camera.position,"z",-10,10).name("z"),s.add(e.camera.rotation,"x",-10,10).name("rx"),s.add(e.camera.rotation,"y",-10,10).name("ry"),s.add(e.camera.rotation,"z",-10,10).name("rz");let n=o.addFolder("mesh").close().hide();n.add(t.cloud.position,"x",-10,10).name("x"),n.add(t.cloud.position,"y",-10,10).name("y"),n.add(t.cloud.position,"z",-10,10).name("z"),n.add(t.cloud.rotation,"x",-10,10).name("rx"),n.add(t.cloud.rotation,"y",-10,10).name("ry"),n.add(t.cloud.rotation,"z",-10,10).name("rz"),i.enabled=!1,i.addEventListener("change",t.onResize);const l={copyCameraData:()=>{navigator.clipboard.writeText(`
            ${v(e.camera.position,"position")}

            ${v(e.camera.rotation,"rotation")}
`)},copyParticlesData:()=>{navigator.clipboard.writeText(`
            ${v(t.cloud.position,"position")}

            ${v(t.cloud.rotation,"rotation")}
`)},switchToFlyControls:()=>{K(o,e,t,i,r)}};o.add(l,"copyCameraData"),o.add(l,"copyParticlesData"),o.add(l,"switchToFlyControls")},K=(o,e,t,i,r)=>{i.enabled=!0,document.body.classList.add("controls-enabled"),r.destroy();let a=o.folders.find(l=>l._title==="camera");a&&a.show();let f=o.folders.find(l=>l._title==="mesh");f&&f.show();let s=o.controllers.find(l=>l._name==="switchToManualControls");s&&s.hide();const n={refreshControllers:()=>{o.controllersRecursive().forEach(l=>l.updateDisplay())},lookAtCenter:()=>{e.camera.lookAt(0,0,0),a&&a.controllersRecursive().forEach(l=>l.updateDisplay())}};o.add(n,"refreshControllers"),o.add(n,"lookAtCenter")};z.registerPlugin(W);const d=[{position:new m(1.86,1.11,1.07),rotation:new p(-.98,.49,.61),target:new m(-.28,-2.18,-1.16)},{position:new m(-5,-.2,-.6),rotation:new p(-1.58,-1.1,-.16)},{position:new m(-.6,2.28,-5.27),rotation:new p(-2.57,-.09,-1.43)}],y=[{position:new m(0,0,0),rotation:new p(Math.PI/2,0,Math.PI/2)},{position:new m(0,0,0),rotation:new p(Math.PI*3,0,Math.PI/2)},{position:new m(0,0,0),rotation:new p(Math.PI*3,0,Math.PI/2)}];class O{el;sections;totalHeight=0;world;sizes;particles;timeline;constructor(e,t,i){this.el=e,this.world=t,this.sizes=t.sizes,this.particles=i,this.sections=[...this.el.querySelectorAll(".section")].map(r=>({el:r,position:0,height:0,offset:0,duration:0})),this.getSizes(),this.sizes.on("scroller/resize",this.onResize),this.setTimeline()}onResize=()=>{this.getSizes(),this.timeline.kill(),this.setTimeline()};getSizes=()=>{let e=this.el.getBoundingClientRect();this.totalHeight=e.height;let t=0;this.sections.forEach(i=>{i.offset=t,i.position=t/this.totalHeight;let r=i.el.getBoundingClientRect();i.height=r.height,i.duration=i.height/this.totalHeight,t+=i.height+i.el.offsetTop})};setTimeline=()=>{z.set(this.world.camera.position,{x:d[0].position.x,y:d[0].position.y,z:d[0].position.z}),z.set(this.world.camera.rotation,{x:d[0].rotation.x,y:d[0].rotation.y,z:d[0].rotation.z}),this.timeline=z.timeline({scrollTrigger:{trigger:this.el,start:"top top",end:"bottom bottom",scrub:1,immediateRender:!1}});for(let e=1;e<this.sections.length;e++)this.timeline.to(this.world.camera.position,{duration:this.sections[e-1].duration,x:d[e].position.x,y:d[e].position.y,z:d[e].position.z},this.sections[e-1].position).to(this.world.camera.rotation,{duration:this.sections[e-1].duration,x:d[e].rotation.x,y:d[e].rotation.y,z:d[e].rotation.z},"<"),y[e]&&y[e].rotation&&this.timeline.to(this.particles.cloud.rotation,{duration:this.sections[e-1].duration,x:y[e].rotation.x},"<")};destroy=()=>{this.sizes.off("scroller/resize"),this.timeline.kill()}}let u,g;const Q=new k,h=new I(Q,!1);h.renderer.outputColorSpace=D;window.world=h;const M=new E,w=new $(h.camera,h.renderer.domElement);w.movementSpeed=10;w.dragToLook=!0;w.autoForward=!1;w.rollSpeed=Math.PI/4;const ee=new G,P=new N().hide(),te="/threejs-experiments",oe=new H;oe.load(te+"/scenes/dna/dna-2-painted.glb",o=>{let e=o.scene?.children?.[0];e instanceof j&&(u=new U(e,h),ie())});const ie=()=>{u.cloud.rotateX(Math.PI/2),u.cloud.rotateZ(Math.PI/2),h.scene.add(u.cloud);const o=document.querySelector(".page-content");g=new O(o,h,u),u.onResize(),Y(ee,h,u,w,g),Z(P,h,u,g)},R=()=>{const o=M.getDelta(),e=M.getElapsedTime();u&&u.tick(e),w.update(o),P.update(),h.render(),window.requestAnimationFrame(R)};window.requestAnimationFrame(R);
