var E=Object.defineProperty;var Z=(l,o,e)=>o in l?E(l,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[o]=e;var t=(l,o,e)=>(Z(l,typeof o!="symbol"?o+"":o,e),e);import{a3 as T,B as F,S as G,w as s,t as X,j as L,i as b,h as k,b as A,a7 as W,_ as B,p as H,a2 as D,Y as O,K as q,Z as K}from"../../three.module-08dc1cdd.js";/* empty css                  */import{O as $}from"../../OrbitControls-f09e7187.js";import{a as J}from"../../lil-gui.esm-ee8b5e9f.js";import{c as r,D as Q}from"../../data-view-d67d864a.js";const ee=(l,o,e,w,d=1)=>{const u=new Float32Array(e*w*3),P=new Float32Array(e*w);let M=l/e,Y=o/w;for(let f=0;f<e;f++)for(let _=0;_<w;_++){const p=f*w+_,z=f*M-l/2+M/2,N=0,C=_*Y-o/2+Y/2;u[p*3]=z,u[p*3+1]=C,u[p*3+2]=N,P[p]=Math.min(window.devicePixelRatio,2)*d}return{positions:u,scales:P}};var oe=`precision mediump float;

float PI = 3.1415926;

varying vec2 v_uv;

varying float v_demo;

void main() {

  vec2 uv = v_uv;
  float distanceToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

  if (distanceToCenter > 0.5)
    discard;

  float alpha = 1.0 - distanceToCenter * 2.0;

  vec3 color = vec3(v_demo, v_demo, 1.0);
  gl_FragColor = vec4(color, alpha);

#include <colorspace_fragment>
#include <tonemapping_fragment>
}`,ne=`precision mediump float;

attribute float scale;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_planeRes;

uniform float u_showPosX;
uniform float u_showPosY;

uniform float u_showModelPosX;
uniform float u_showModelPosY;
uniform float u_showModelPosZ;

uniform float u_showViewPosX;
uniform float u_showViewPosY;
uniform float u_showViewPosZ;

uniform float u_showProjPosX;
uniform float u_showProjPosY;
uniform float u_showProjPosZ;

uniform float u_showNewUvX;
uniform float u_showNewUvY;

uniform float u_showNewUv2X;
uniform float u_showNewUv2Y;

uniform float u_showUvX;
uniform float u_showUvY;

uniform float u_useFract;

varying vec2 v_uv;
varying float v_demo;

float PI = 3.1415926;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  v_uv = uv;
  vec3 pos = position;

  vec2 newUv = pos.xy / u_planeRes.xy;
  newUv += vec2(0.5);
  float aspect = u_planeRes.x / u_planeRes.y;
  newUv.x *= aspect;
  float edge = (aspect - 1.0) * 0.5;
  newUv.x -= edge;

  vec2 newUv2 = pos.xy / u_planeRes.xy;
  newUv2 += vec2(0.5);
  float aspect2 = u_planeRes.y / u_planeRes.x;
  newUv2.y *= aspect2;
  float edge2 = (aspect2 - 1.0) * 0.5;
  newUv2.y -= edge2;

  float demo_val = 0.0;
  demo_val += pos.x * u_showPosX;
  demo_val += pos.y * u_showPosY;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  demo_val += u_showModelPosX * modelPosition.x;
  demo_val += u_showModelPosY * modelPosition.y;
  demo_val += u_showModelPosZ * modelPosition.z;

  vec4 viewPosition = viewMatrix * modelPosition;

  demo_val += u_showViewPosX * viewPosition.x;
  demo_val += u_showViewPosY * viewPosition.y;
  demo_val += u_showViewPosZ * viewPosition.z;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  demo_val += u_showProjPosX * projectedPosition.x;
  demo_val += u_showProjPosY * projectedPosition.y;
  demo_val += u_showProjPosZ * projectedPosition.z;

  
  demo_val += u_showNewUvX * newUv.x;
  demo_val += u_showNewUvY * newUv.y;

  demo_val += u_showNewUv2X * newUv2.x;
  demo_val += u_showNewUv2Y * newUv2.y;

  demo_val += u_showUvX * uv.x;
  demo_val += u_showUvY * uv.y;

  gl_PointSize = (0.15 * u_res.y);
  gl_PointSize *= (1.0 / -viewPosition.z);

  if (u_useFract > 0.5) {
    v_demo = fract(demo_val);
  } else {
    v_demo = demo_val;
  }

  gl_Position = projectedPosition;
}`;class se{constructor(o){t(this,"btn");t(this,"el");t(this,"inputs",[]);t(this,"uniforms");t(this,"currentShowVal",null);t(this,"currentToggle",!1);t(this,"shownValueEl");t(this,"addRadio",(o,e)=>{const w=r("label",{for:e},o),d=r("input",{type:"radio",name:"rgroup",value:e,id:e}),u=r("div",{class:"radio-wrap"},[w,d]);return this.el.append(u),this.inputs.push(d),this.currentShowVal===e&&(d.checked=!0,this.uniforms[e].value=!0),d.addEventListener("change",P=>{this.setValue(e)}),d});t(this,"setValue",o=>{this.uniforms[o].value=!0,this.currentShowVal=o,this.inputs.forEach(e=>{e.value===o?(this.uniforms[e.value].value=!0,e.checked=!0):(this.uniforms[e.value].value=!1,e.checked=!1)}),window.localStorage.setItem("showed_val",o),this.shownValueEl.textContent=o});t(this,"addInfo",o=>{const e=r("div",{class:"control-info"},o);console.log(e),this.el.append(e)});t(this,"setFalseExcept",o=>{this.inputs.forEach(e=>{e.value!==o&&(this.uniforms[e.value].value=!1)})});this.uniforms=o;let e=r("div",{class:"shown-label"},"Shown value:");this.shownValueEl=r("div",{class:"shown-val"}),this.btn=r("button",{class:"group-btn"},"toggle");let w=r("div",{class:"rgroup-top"},[this.btn,r("div",{class:"rgroup-top-label"},[e,this.shownValueEl])]);this.el=r("div",{class:"radio-controls"},[w]),document.body.append(this.el);let d=window.localStorage.getItem("showed_val");d&&this.setValue(d);let u=window.localStorage.getItem("toggled");u&&(this.currentToggle=u==="true"),this.currentToggle&&this.el.classList.add("collapsed"),this.btn.addEventListener("click",()=>{this.currentToggle=!this.currentToggle,window.localStorage.setItem("toggled",this.currentToggle.toString()),this.currentToggle?this.el.classList.add("collapsed"):this.el.classList.remove("collapsed")})}}const S=new J,a={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)};q.enabled=!0;const g=new T,x=5,y=8,{positions:ae,scales:te}=ee(x,y,100,80),R=new F,v=new G({uniforms:{u_time:{value:0},u_res:new s(new X(a.width*a.pixelRatio,a.height*a.pixelRatio)),u_planeRes:new s(new X(x,y)),u_showPosX:new s(!1),u_showPosY:new s(!1),u_showModelPosX:new s(!1),u_showModelPosY:new s(!1),u_showModelPosZ:new s(!1),u_showViewPosX:new s(!1),u_showViewPosY:new s(!1),u_showViewPosZ:new s(!1),u_showProjPosX:new s(!1),u_showProjPosY:new s(!1),u_showProjPosZ:new s(!1),u_showNewUvX:new s(!1),u_showNewUvY:new s(!1),u_showNewUv2X:new s(!1),u_showNewUv2Y:new s(!1),u_showUvX:new s(!1),u_showUvY:new s(!1),u_useFract:new s(!0)},vertexShader:ne,fragmentShader:oe,transparent:!0,blending:L,depthWrite:!1});R.setAttribute("position",new b(ae,3));R.setAttribute("scale",new b(te,1));const i=new k(R,v);i.position.set(0,0,0);g.add(i);new A(new W(1),new B({color:16711680,wireframe:!0}));window.addEventListener("resize",()=>{a.width=window.innerWidth,a.height=window.innerHeight,m.aspect=a.width/a.height,m.updateProjectionMatrix(),v.uniforms.u_res.value.x=a.width*a.pixelRatio,v.uniforms.u_res.value.y=a.height*a.pixelRatio,h.setSize(a.width,a.height),h.setPixelRatio(Math.min(window.devicePixelRatio,2))});const m=new H(35,a.width/a.height,.1,100);m.position.set(0,0,18);g.add(m);const h=new D({antialias:!0});h.outputColorSpace=O;h.setSize(a.width,a.height);h.setPixelRatio(window.devicePixelRatio);document.body.appendChild(h.domElement);const ie=new $(m,h.domElement);ie.enableDamping=!0;const le=new K,n=new se(v.uniforms),U={planeWidth:x,planeHeight:y,resetCamera:()=>{m.position.set(0,0,18)}};n.addInfo("position var: pos w/in group of particles");n.addRadio("pos x","u_showPosX");n.addRadio("pos y","u_showPosY");n.addInfo(`model pos: position in model's local space
changes with model's rotation/scale`);n.addRadio("x","u_showModelPosX");n.addRadio("y","u_showModelPosY");n.addRadio("z","u_showModelPosZ");n.addInfo(`view pos: position in camera space
uses all of above + camera position/rotation`);n.addRadio("x","u_showViewPosX");n.addRadio("y","u_showViewPosY");n.addRadio("z","u_showViewPosZ");n.addInfo("projected position: position in screen space ??? ");n.addRadio("x","u_showProjPosX");n.addRadio("y","u_showProjPosY");n.addRadio("z","u_showProjPosZ");n.addInfo("newuv");n.addRadio("x","u_showNewUvX");n.addRadio("y","u_showNewUvY");n.addInfo("newuv2 (based on y)");n.addRadio("x","u_showNewUv2X");n.addRadio("y","u_showNewUv2Y");n.addInfo("actual uv");n.addRadio("x","u_showUvX");n.addRadio("y","u_showUvY");let c=S.addFolder("geometry").close();c.add(i.position,"x",-20,20,.5);c.add(i.position,"y",-20,20,.5);c.add(i.position,"z",-20,20,.5);c.add(i.scale,"x",0,5,.1).name("scale x");c.add(i.scale,"y",0,5,.1).name("scale y");c.add(i.scale,"z",0,5,.1).name("scale z");c.add(i.rotation,"x",-Math.PI,Math.PI,.1).name("rot x");c.add(i.rotation,"y",-Math.PI,Math.PI,.1).name("rot y");c.add(i.rotation,"z",-Math.PI,Math.PI,.1).name("rot z");let V=S.addFolder("position stuff");V.add(i.material.uniforms.u_useFract,"value").name("use fract");V.add(U,"resetCamera");const de=new Q,j=de.createSection("Data");j.add(U,"planeWidth","planeWidth",0);j.add(U,"planeHeight","planeHeight",0);const I=()=>{const l=le.getElapsedTime();v.uniforms.u_time.value=l,h.render(g,m),window.requestAnimationFrame(I)};I();
