import{K as Y,a5 as X,B as b,S,w as n,v as g,j as V,i as x,h as j,b as I,a9 as z,_ as N,p as C,Y as E,Z}from"../../three.core-cdbdf8aa.js";/* empty css                  */import{W as T}from"../../three.module-2b501472.js";import{O as F}from"../../OrbitControls-ed6ab3c1.js";import{a as G}from"../../lil-gui.esm-ee8b5e9f.js";import{g as L}from"../../generate-points-sheet-412bec60.js";import{D as W}from"../../data-view-3b86b9f4.js";import{c as i}from"../../dom-8613d0e9.js";import"../../utils-100a9827.js";var k=`precision mediump float;

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
}`,B=`precision mediump float;

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
}`;class A{btn;el;inputs=[];uniforms;currentShowVal=null;currentToggle=!1;shownValueEl;constructor(a){this.uniforms=a;let o=i("div",{class:"shown-label"},"Shown value:");this.shownValueEl=i("div",{class:"shown-val"}),this.btn=i("button",{class:"group-btn"},"toggle");let c=i("div",{class:"rgroup-top"},[this.btn,i("div",{class:"rgroup-top-label"},[o,this.shownValueEl])]);this.el=i("div",{class:"radio-controls"},[c]),document.body.append(this.el);let d=window.localStorage.getItem("showed_val");d&&this.setValue(d);let h=window.localStorage.getItem("toggled");h&&(this.currentToggle=h==="true"),this.currentToggle&&this.el.classList.add("collapsed"),this.btn.addEventListener("click",()=>{this.currentToggle=!this.currentToggle,window.localStorage.setItem("toggled",this.currentToggle.toString()),this.currentToggle?this.el.classList.add("collapsed"):this.el.classList.remove("collapsed")})}addRadio=(a,o)=>{const c=i("label",{for:o},a),d=i("input",{type:"radio",name:"rgroup",value:o,id:o}),h=i("div",{class:"radio-wrap"},[c,d]);return this.el.append(h),this.inputs.push(d),this.currentShowVal===o&&(d.checked=!0,this.uniforms[o].value=!0),d.addEventListener("change",$=>{this.setValue(o)}),d};setValue=a=>{this.uniforms[a].value=!0,this.currentShowVal=a,this.inputs.forEach(o=>{o.value===a?(this.uniforms[o.value].value=!0,o.checked=!0):(this.uniforms[o.value].value=!1,o.checked=!1)}),window.localStorage.setItem("showed_val",a),this.shownValueEl.textContent=a};addInfo=a=>{const o=i("div",{class:"control-info"},a);console.log(o),this.el.append(o)};setFalseExcept=a=>{this.inputs.forEach(o=>{o.value!==a&&(this.uniforms[o.value].value=!1)})}}const y=new G,s={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)};Y.enabled=!0;const m=new X,v=5,f=8,{positions:H,scales:D}=L(v,f,100,80),_=new b,w=new S({uniforms:{u_time:{value:0},u_res:new n(new g(s.width*s.pixelRatio,s.height*s.pixelRatio)),u_planeRes:new n(new g(v,f)),u_showPosX:new n(!1),u_showPosY:new n(!1),u_showModelPosX:new n(!1),u_showModelPosY:new n(!1),u_showModelPosZ:new n(!1),u_showViewPosX:new n(!1),u_showViewPosY:new n(!1),u_showViewPosZ:new n(!1),u_showProjPosX:new n(!1),u_showProjPosY:new n(!1),u_showProjPosZ:new n(!1),u_showNewUvX:new n(!1),u_showNewUvY:new n(!1),u_showNewUv2X:new n(!1),u_showNewUv2Y:new n(!1),u_showUvX:new n(!1),u_showUvY:new n(!1),u_useFract:new n(!0)},vertexShader:B,fragmentShader:k,transparent:!0,blending:V,depthWrite:!1});_.setAttribute("position",new x(H,3));_.setAttribute("scale",new x(D,1));const t=new j(_,w);t.position.set(0,0,0);m.add(t);new I(new z(1),new N({color:16711680,wireframe:!0}));window.addEventListener("resize",()=>{s.width=window.innerWidth,s.height=window.innerHeight,u.aspect=s.width/s.height,u.updateProjectionMatrix(),w.uniforms.u_res.value.x=s.width*s.pixelRatio,w.uniforms.u_res.value.y=s.height*s.pixelRatio,r.setSize(s.width,s.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))});const u=new C(35,s.width/s.height,.1,100);u.position.set(0,0,18);m.add(u);const r=new T({antialias:!0});r.outputColorSpace=E;r.setSize(s.width,s.height);r.setPixelRatio(window.devicePixelRatio);document.body.appendChild(r.domElement);const O=new F(u,r.domElement);O.enableDamping=!0;const q=new Z,e=new A(w.uniforms),p={planeWidth:v,planeHeight:f,resetCamera:()=>{u.position.set(0,0,18)}};e.addInfo("position var: pos w/in group of particles");e.addRadio("pos x","u_showPosX");e.addRadio("pos y","u_showPosY");e.addInfo(`model pos: position in model's local space
changes with model's rotation/scale`);e.addRadio("x","u_showModelPosX");e.addRadio("y","u_showModelPosY");e.addRadio("z","u_showModelPosZ");e.addInfo(`view pos: position in camera space
uses all of above + camera position/rotation`);e.addRadio("x","u_showViewPosX");e.addRadio("y","u_showViewPosY");e.addRadio("z","u_showViewPosZ");e.addInfo("projected position: position in screen space ??? ");e.addRadio("x","u_showProjPosX");e.addRadio("y","u_showProjPosY");e.addRadio("z","u_showProjPosZ");e.addInfo("newuv");e.addRadio("x","u_showNewUvX");e.addRadio("y","u_showNewUvY");e.addInfo("newuv2 (based on y)");e.addRadio("x","u_showNewUv2X");e.addRadio("y","u_showNewUv2Y");e.addInfo("actual uv");e.addRadio("x","u_showUvX");e.addRadio("y","u_showUvY");let l=y.addFolder("geometry").close();l.add(t.position,"x",-20,20,.5);l.add(t.position,"y",-20,20,.5);l.add(t.position,"z",-20,20,.5);l.add(t.scale,"x",0,5,.1).name("scale x");l.add(t.scale,"y",0,5,.1).name("scale y");l.add(t.scale,"z",0,5,.1).name("scale z");l.add(t.rotation,"x",-Math.PI,Math.PI,.1).name("rot x");l.add(t.rotation,"y",-Math.PI,Math.PI,.1).name("rot y");l.add(t.rotation,"z",-Math.PI,Math.PI,.1).name("rot z");let R=y.addFolder("position stuff");R.add(t.material.uniforms.u_useFract,"value").name("use fract");R.add(p,"resetCamera");const K=new W,U=K.createSection("Data");U.add(p,"planeWidth","planeWidth",0);U.add(p,"planeHeight","planeHeight",0);const M=()=>{const P=q.getElapsedTime();w.uniforms.u_time.value=P,r.render(m,u),window.requestAnimationFrame(M)};M();
