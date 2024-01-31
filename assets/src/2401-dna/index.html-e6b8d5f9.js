var $=Object.defineProperty;var H=(r,t,e)=>t in r?$(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var f=(r,t,e)=>(H(r,typeof t!="symbol"?t+"":t,e),e);import{Y as I,V as w,Q as F,Z as X,v as V,x as N,S as Q,j as U,B as Z,h as Y,f as O,i as L,_ as J,c as tt,b as C,$ as et,a0 as ot,a1 as it}from"../../three.module-d72a404d.js";/* empty css                  */import{S as nt,W as at}from"../../World-3c315daf.js";import{M as st}from"../../Mouse-208f518b.js";import{G as rt}from"../../lil-gui.esm-ee8b5e9f.js";import{G as ct}from"../../GLTFLoader-e66ebc76.js";import"../../OrbitControls-5b9b3738.js";const ut={type:"change"};class lt extends I{constructor(t,e){super(),this.object=t,this.domElement=e,this.enabled=!0,this.movementSpeed=1,this.rollSpeed=.005,this.dragToLook=!1,this.autoForward=!1;const o=this,a=1e-6,s=new F,i=new w;this.tmpQuaternion=new F,this.status=0,this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0},this.moveVector=new w(0,0,0),this.rotationVector=new w(0,0,0),this.keydown=function(l){if(!(l.altKey||this.enabled===!1)){switch(l.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=.1;break;case"KeyW":this.moveState.forward=1;break;case"KeyS":this.moveState.back=1;break;case"KeyA":this.moveState.left=1;break;case"KeyD":this.moveState.right=1;break;case"KeyR":this.moveState.up=1;break;case"KeyF":this.moveState.down=1;break;case"ArrowUp":this.moveState.pitchUp=1;break;case"ArrowDown":this.moveState.pitchDown=1;break;case"ArrowLeft":this.moveState.yawLeft=1;break;case"ArrowRight":this.moveState.yawRight=1;break;case"KeyQ":this.moveState.rollLeft=1;break;case"KeyE":this.moveState.rollRight=1;break}this.updateMovementVector(),this.updateRotationVector()}},this.keyup=function(l){if(this.enabled!==!1){switch(l.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=1;break;case"KeyW":this.moveState.forward=0;break;case"KeyS":this.moveState.back=0;break;case"KeyA":this.moveState.left=0;break;case"KeyD":this.moveState.right=0;break;case"KeyR":this.moveState.up=0;break;case"KeyF":this.moveState.down=0;break;case"ArrowUp":this.moveState.pitchUp=0;break;case"ArrowDown":this.moveState.pitchDown=0;break;case"ArrowLeft":this.moveState.yawLeft=0;break;case"ArrowRight":this.moveState.yawRight=0;break;case"KeyQ":this.moveState.rollLeft=0;break;case"KeyE":this.moveState.rollRight=0;break}this.updateMovementVector(),this.updateRotationVector()}},this.pointerdown=function(l){if(this.enabled!==!1)if(this.dragToLook)this.status++;else{switch(l.button){case 0:this.moveState.forward=1;break;case 2:this.moveState.back=1;break}this.updateMovementVector()}},this.pointermove=function(l){if(this.enabled!==!1&&(!this.dragToLook||this.status>0)){const v=this.getContainerDimensions(),S=v.size[0]/2,z=v.size[1]/2;this.moveState.yawLeft=-(l.pageX-v.offset[0]-S)/S,this.moveState.pitchDown=(l.pageY-v.offset[1]-z)/z,this.updateRotationVector()}},this.pointerup=function(l){if(this.enabled!==!1){if(this.dragToLook)this.status--,this.moveState.yawLeft=this.moveState.pitchDown=0;else{switch(l.button){case 0:this.moveState.forward=0;break;case 2:this.moveState.back=0;break}this.updateMovementVector()}this.updateRotationVector()}},this.pointercancel=function(){this.enabled!==!1&&(this.dragToLook?(this.status=0,this.moveState.yawLeft=this.moveState.pitchDown=0):(this.moveState.forward=0,this.moveState.back=0,this.updateMovementVector()),this.updateRotationVector())},this.contextMenu=function(l){this.enabled!==!1&&l.preventDefault()},this.update=function(l){if(this.enabled===!1)return;const v=l*o.movementSpeed,S=l*o.rollSpeed;o.object.translateX(o.moveVector.x*v),o.object.translateY(o.moveVector.y*v),o.object.translateZ(o.moveVector.z*v),o.tmpQuaternion.set(o.rotationVector.x*S,o.rotationVector.y*S,o.rotationVector.z*S,1).normalize(),o.object.quaternion.multiply(o.tmpQuaternion),(i.distanceToSquared(o.object.position)>a||8*(1-s.dot(o.object.quaternion))>a)&&(o.dispatchEvent(ut),s.copy(o.object.quaternion),i.copy(o.object.position))},this.updateMovementVector=function(){const l=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right,this.moveVector.y=-this.moveState.down+this.moveState.up,this.moveVector.z=-l+this.moveState.back},this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp,this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft,this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft},this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",c),this.domElement.removeEventListener("pointerdown",d),this.domElement.removeEventListener("pointermove",n),this.domElement.removeEventListener("pointerup",m),this.domElement.removeEventListener("pointercancel",h),window.removeEventListener("keydown",y),window.removeEventListener("keyup",g)};const c=this.contextMenu.bind(this),n=this.pointermove.bind(this),d=this.pointerdown.bind(this),m=this.pointerup.bind(this),h=this.pointercancel.bind(this),y=this.keydown.bind(this),g=this.keyup.bind(this);this.domElement.addEventListener("contextmenu",c),this.domElement.addEventListener("pointerdown",d),this.domElement.addEventListener("pointermove",n),this.domElement.addEventListener("pointerup",m),this.domElement.addEventListener("pointercancel",h),window.addEventListener("keydown",y),window.addEventListener("keyup",g),this.updateMovementVector(),this.updateRotationVector()}}const u=new X,R=new w,D=new V,_=new V,j=new V;class dt{constructor(t){this.geometry=t.geometry,this.randomFunction=Math.random,this.indexAttribute=this.geometry.index,this.positionAttribute=this.geometry.getAttribute("position"),this.normalAttribute=this.geometry.getAttribute("normal"),this.colorAttribute=this.geometry.getAttribute("color"),this.uvAttribute=this.geometry.getAttribute("uv"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(t){return this.weightAttribute=t?this.geometry.getAttribute(t):null,this}build(){const t=this.indexAttribute,e=this.positionAttribute,o=this.weightAttribute,a=t?t.count/3:e.count/3,s=new Float32Array(a);for(let n=0;n<a;n++){let d=1,m=3*n,h=3*n+1,y=3*n+2;t&&(m=t.getX(m),h=t.getX(h),y=t.getX(y)),o&&(d=o.getX(m)+o.getX(h)+o.getX(y)),u.a.fromBufferAttribute(e,m),u.b.fromBufferAttribute(e,h),u.c.fromBufferAttribute(e,y),d*=u.getArea(),s[n]=d}const i=new Float32Array(a);let c=0;for(let n=0;n<a;n++)c+=s[n],i[n]=c;return this.distribution=i,this}setRandomGenerator(t){return this.randomFunction=t,this}sample(t,e,o,a){const s=this.sampleFaceIndex();return this.sampleFace(s,t,e,o,a)}sampleFaceIndex(){const t=this.distribution[this.distribution.length-1];return this.binarySearch(this.randomFunction()*t)}binarySearch(t){const e=this.distribution;let o=0,a=e.length-1,s=-1;for(;o<=a;){const i=Math.ceil((o+a)/2);if(i===0||e[i-1]<=t&&e[i]>t){s=i;break}else t<e[i]?a=i-1:o=i+1}return s}sampleFace(t,e,o,a,s){let i=this.randomFunction(),c=this.randomFunction();i+c>1&&(i=1-i,c=1-c);const n=this.indexAttribute;let d=t*3,m=t*3+1,h=t*3+2;return n&&(d=n.getX(d),m=n.getX(m),h=n.getX(h)),u.a.fromBufferAttribute(this.positionAttribute,d),u.b.fromBufferAttribute(this.positionAttribute,m),u.c.fromBufferAttribute(this.positionAttribute,h),e.set(0,0,0).addScaledVector(u.a,i).addScaledVector(u.b,c).addScaledVector(u.c,1-(i+c)),o!==void 0&&(this.normalAttribute!==void 0?(u.a.fromBufferAttribute(this.normalAttribute,d),u.b.fromBufferAttribute(this.normalAttribute,m),u.c.fromBufferAttribute(this.normalAttribute,h),o.set(0,0,0).addScaledVector(u.a,i).addScaledVector(u.b,c).addScaledVector(u.c,1-(i+c)).normalize()):u.getNormal(o)),a!==void 0&&this.colorAttribute!==void 0&&(u.a.fromBufferAttribute(this.colorAttribute,d),u.b.fromBufferAttribute(this.colorAttribute,m),u.c.fromBufferAttribute(this.colorAttribute,h),R.set(0,0,0).addScaledVector(u.a,i).addScaledVector(u.b,c).addScaledVector(u.c,1-(i+c)),a.r=R.x,a.g=R.y,a.b=R.z),s!==void 0&&this.uvAttribute!==void 0&&(D.fromBufferAttribute(this.uvAttribute,d),_.fromBufferAttribute(this.uvAttribute,m),j.fromBufferAttribute(this.uvAttribute,h),s.set(0,0).addScaledVector(D,i).addScaledVector(_,c).addScaledVector(j,1-(i+c))),this}}var mt=`precision mediump float;

float PI = 3.1415926;

uniform vec3 uMouse;
varying float vDistanceToMouse1;
varying float vDistanceToMouse2;
varying vec3 vPosition;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    
    float d = min(vDistanceToMouse1, vDistanceToMouse2);

    gl_FragColor = vec4(vDistanceToMouse1, vDistanceToMouse2, 1.0, strength);
}`,ht=`precision mediump float;

uniform float uPixelRatio;
uniform float uSize;
uniform float uScaleMin;
uniform float uScaleMax;
uniform float uTime;
uniform float uNoiseResolution;
uniform float uSpeed;
uniform float uNoiseRadius;
uniform float uSquishMain;
uniform float uSquishMiddle;
uniform float uScaleMiddleMin;
uniform float uScaleMiddleMax;

uniform vec3 uMouse1;
uniform vec3 uMouse2;

attribute float aScale;
attribute float aMiddleWeight;

varying float vDistanceToMouse1;
varying float vDistanceToMouse2;
varying vec3 vPosition;

#define PI 3.14159265358979323846

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}

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

vec4 adjustedPosition(vec4 pos) {
   float phi = snoise(pos.xyz * uNoiseResolution + uTime * uSpeed) * PI * 2.0;
   float theta = snoise(pos.xyz * uNoiseResolution - uTime * uSpeed) * PI * 2.0;

   vec3 noise = normal + vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
   noise *= uNoiseRadius;
   pos.xyz -= noise;

   return pos;
}

void main() {

   vec4 pos = vec4(position, 1.0);
  pos.xyz -= normal * (uSquishMiddle * (aMiddleWeight));
  pos.xyz -= normal * (uSquishMain * (1.0 - aMiddleWeight));
   pos = adjustedPosition(pos);

   vec4 modelPosition = modelMatrix * pos;
   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectedPosition = projectionMatrix * viewPosition;

   float scale = mix(uScaleMin + (uScaleMax - uScaleMin), uScaleMiddleMin + (uScaleMiddleMax - uScaleMiddleMin), aMiddleWeight);
   scale *= aScale;
   scale *= uSize * uPixelRatio;
   scale *= (1.0 / - viewPosition.z);

   vDistanceToMouse1 = distance(uMouse1, modelPosition.xyz);
    vDistanceToMouse2 = distance(uMouse2, modelPosition.xyz);

   gl_Position = projectedPosition;
   gl_PointSize = scale;
   vPosition = modelPosition.xyz;
}`;let ft=[];document.addEventListener("click",()=>{console.log(ft)});class pt{constructor(t,e,o,a=4e3){f(this,"sizes");f(this,"mouse");f(this,"world");f(this,"meshToSample");f(this,"sampler");f(this,"cloud");f(this,"material");f(this,"geometry");f(this,"raycaster");f(this,"_count",4e3);f(this,"onResize",()=>{this.material.uniforms.uPixelRatio.value=this.sizes.pixelRatio});f(this,"getPositions",()=>{const t=new w,e=new w,o=new O,a=new Float32Array(this._count*3),s=new Float32Array(this._count*3),i=new Float32Array(this._count),c=new Float32Array(this._count);for(let n=0;n<this._count;n++)this.sampler.sample(t,e,o),a[n*3+0]=t.x,a[n*3+1]=t.y,a[n*3+2]=t.z,s[n*3+0]=e.x,s[n*3+1]=e.y,s[n*3+2]=e.z,i[n]=1-o.r,c[n]=Math.random();this.geometry.setAttribute("position",new L(a,3)),this.geometry.setAttribute("aScale",new L(c,1)),this.geometry.setAttribute("normal",new L(s,3)),this.geometry.setAttribute("aMiddleWeight",new L(i,1))});f(this,"raycast",()=>{this.raycaster.setFromCamera(this.mouse.pos,this.world.camera);const t=this.raycaster.intersectObjects([this.cloud],!1);if(t.length>0){let e=t[0],o=t.length>1?t[t.length-1]:e;this.material.uniforms.uMouse1.value=e.point,this.material.uniforms.uMouse2.value=o.point}});f(this,"projectMouse",()=>{let t=new w(this.mouse.pos.x,this.mouse.pos.y,.5);t.unproject(this.world.camera),t.sub(this.world.camera.position).normalize();let o=(this.cloud.position.z-this.world.camera.position.z)/t.z,a=new w;a.copy(this.world.camera.position).add(t.multiplyScalar(o)),this.material.uniforms.uMouse1.value=a,this.material.uniforms.uMouse2.value=a});f(this,"tick",t=>{this.projectMouse(),this.material.uniforms.uTime.value=t});this.meshToSample=t,this.sampler=new dt(this.meshToSample).build(),this._count=a,this.world=e,this.sizes=e.sizes,this.mouse=o,this.raycaster=new N,this.raycaster.params.Points.threshold=.2,this.material=new Q({fragmentShader:mt,vertexShader:ht,transparent:!0,blending:U,depthWrite:!1,uniforms:{uPixelRatio:{value:this.sizes.pixelRatio},uSize:{value:20},uScaleMin:{value:1},uScaleMax:{value:5},uScaleMiddleMin:{value:1},uScaleMiddleMax:{value:4},uSpeed:{value:.1},uNoiseResolution:{value:7},uNoiseRadius:{value:.03},uSquishMain:{value:.115},uSquishMiddle:{value:.027},uTime:{value:0},uMouse1:{value:new w},uMouse2:{value:new w}}}),this.geometry=new Z,this.cloud=new Y(this.geometry,this.material),this.getPositions(),this.sizes.on("resize",this.onResize)}get count(){return this._count}set count(t){this._count=t,this.getPositions()}}const vt=(r,t,e,o,a)=>{let s=r.addFolder("main").close();s.add(e.material.uniforms.uSize,"value",0,100).name("size"),s.add(e.material.uniforms.uScaleMin,"value",0,10,.1).name("scale min"),s.add(e.material.uniforms.uScaleMax,"value",0,10,.1).name("scale max"),s.add(e.material.uniforms.uScaleMiddleMin,"value",0,10,.1).name("scale middle min"),s.add(e.material.uniforms.uScaleMiddleMax,"value",0,10,.1).name("scale middle max"),s.add(e.material.uniforms.uNoiseResolution,"value",0,10,.1).name("noise resolution"),s.add(e.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),s.add(e.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),s.add(e.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),s.add(e.material.uniforms.uSquishMiddle,"value",0,.3,.001).name("squish middles"),s.add(e,"count",0,1e5).name("count");let i=r.addFolder("camera").close();i.add(t.camera.position,"x",-10,10).name("x"),i.add(t.camera.position,"y",-10,10).name("y"),i.add(t.camera.position,"z",-10,10).name("z"),i.add(t.camera.rotation,"x",-10,10).name("rot x"),i.add(t.camera.rotation,"y",-10,10).name("rot y"),i.add(t.camera.rotation,"z",-10,10).name("rot z");let c=r.addFolder("particles");c.add(e.cloud.position,"x",-10,10).name("x"),c.add(e.cloud.position,"y",-10,10).name("y"),c.add(e.cloud.position,"z",-10,10).name("z"),c.add(e.cloud.rotation,"x",-10,10).name("rot x"),c.add(e.cloud.rotation,"y",-10,10).name("rot y"),c.add(e.cloud.rotation,"z",-10,10).name("rot z"),o.enabled=!1;const n={controlsEnabled:o.enabled,copyCameraData:()=>{var z;let d=t.camera.position,m=t.camera.rotation,h=(z=t.controls)==null?void 0:z.target;const y=M=>{let k=new w(M.x,M.y,M.z);return k.x=Math.round(M.x*100)/100,k.y=Math.round(M.y*100)/100,k.z=Math.round(M.z*100)/100,k};let g=y(d),l=y(m),v=h&&y(h),S=`position: new THREE.Vector3(${g.x}, ${g.y}, ${g.z})
`;S+=`rotation: new THREE.Euler(${l.x}, ${l.y}, ${l.z})
`,v&&(S+=`target: new THREE.Vector3(${v.x}, ${v.y}, ${v.z})
`),navigator.clipboard.writeText(S)},updateCameraControls:()=>{i.controllersRecursive().forEach(d=>d.updateDisplay())},lookAtCenter:()=>{t.camera.lookAt(0,0,0)}};r.add(n,"controlsEnabled").name("controls enabled").onChange(d=>{d?(o.enabled=!0,document.body.classList.add("controls-enabled"),a&&a.forEach(m=>m.clear())):(o.enabled=!1,document.body.classList.remove("controls-enabled"))}),r.add(n,"lookAtCenter"),r.add(n,"copyCameraData"),r.add(n,"updateCameraControls").name("update camera controls")};let b;const W=new nt,p=new at(W,!1),q=new st(W),B=new it,bt=new rt,A=new lt(p.camera,p.renderer.domElement),wt=document.getElementById("position"),yt=document.getElementById("rotation"),St=document.getElementById("direction"),xt=document.getElementById("particle-position"),gt=document.getElementById("particle-rotation"),Mt=document.getElementById("mouse-position"),At=document.getElementById("mouse-cloud-position");A.movementSpeed=10;A.dragToLook=!0;A.autoForward=!1;A.rollSpeed=Math.PI/4;p.renderer.outputColorSpace=J;p.camera.position.set(1.86,1.11,1.07);p.camera.rotation.set(-.98,.49,.61);const K=new tt(10);K.setColors("blue","red","green");p.scene.add(K);const zt="/threejs-experiments",Et=new ct;Et.load(zt+"/scenes/dna/dna-2-painted.glb",r=>{var e,o;let t=(o=(e=r.scene)==null?void 0:e.children)==null?void 0:o[0];t instanceof C&&(b=new pt(t,p,q,8e3),kt())});const kt=()=>{b.cloud.rotateX(Math.PI/2),b.cloud.rotateZ(Math.PI/2),p.scene.add(b.cloud),document.querySelector(".page-content"),vt(bt,p,b,A)},T=new w,E=r=>r.toFixed(2).padStart(7," "),x=r=>r instanceof V?`${E(r.x)} ${E(r.y)}`:`${E(r.x)} ${E(r.y)} ${E(r.z)}`,P=new C(new et(1,1,1),new ot);P.scale.set(.1,.1,.1);p.scene.add(P);const G=()=>{const r=B.getDelta(),t=B.getElapsedTime();b&&(b.tick(t),xt.innerHTML=x(b.cloud.position),gt.innerHTML=x(b.cloud.rotation)),A.update(r),p.camera.getWorldDirection(T),T.multiplyScalar(100),wt.innerHTML=x(p.camera.position),yt.innerHTML=x(p.camera.rotation),St.innerHTML=x(T),Mt.innerHTML=x(q.pos),b&&(At.innerHTML=x(b.material.uniforms.uMouse1.value),P.position.copy(b.material.uniforms.uMouse1.value)),p.render(),window.requestAnimationFrame(G)};window.requestAnimationFrame(G);
