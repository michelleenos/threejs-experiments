var T=Object.defineProperty;var _=(d,t,e)=>t in d?T(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var p=(d,t,e)=>(_(d,typeof t!="symbol"?t+"":t,e),e);import{Y as V,V as v,v as S,S as j,j as G,B as R,h as k,i as z,c as X,Z as $,b as C,_ as I,$ as W}from"../../three.module-eb0894ce.js";/* empty css                  */import{S as D,W as L}from"../../World-4ff8b13f.js";import{M as N}from"../../Mouse-1a5fece3.js";import{G as q}from"../../lil-gui.esm-ee8b5e9f.js";import{G as E}from"../../GLTFLoader-e9c8349b.js";import"../../OrbitControls-18e3733d.js";const o=new V,w=new v,M=new S,P=new S,F=new S;class Z{constructor(t){this.geometry=t.geometry,this.randomFunction=Math.random,this.indexAttribute=this.geometry.index,this.positionAttribute=this.geometry.getAttribute("position"),this.normalAttribute=this.geometry.getAttribute("normal"),this.colorAttribute=this.geometry.getAttribute("color"),this.uvAttribute=this.geometry.getAttribute("uv"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(t){return this.weightAttribute=t?this.geometry.getAttribute(t):null,this}build(){const t=this.indexAttribute,e=this.positionAttribute,n=this.weightAttribute,a=t?t.count/3:e.count/3,m=new Float32Array(a);for(let r=0;r<a;r++){let f=1,u=3*r,c=3*r+1,A=3*r+2;t&&(u=t.getX(u),c=t.getX(c),A=t.getX(A)),n&&(f=n.getX(u)+n.getX(c)+n.getX(A)),o.a.fromBufferAttribute(e,u),o.b.fromBufferAttribute(e,c),o.c.fromBufferAttribute(e,A),f*=o.getArea(),m[r]=f}const i=new Float32Array(a);let s=0;for(let r=0;r<a;r++)s+=m[r],i[r]=s;return this.distribution=i,this}setRandomGenerator(t){return this.randomFunction=t,this}sample(t,e,n,a){const m=this.sampleFaceIndex();return this.sampleFace(m,t,e,n,a)}sampleFaceIndex(){const t=this.distribution[this.distribution.length-1];return this.binarySearch(this.randomFunction()*t)}binarySearch(t){const e=this.distribution;let n=0,a=e.length-1,m=-1;for(;n<=a;){const i=Math.ceil((n+a)/2);if(i===0||e[i-1]<=t&&e[i]>t){m=i;break}else t<e[i]?a=i-1:n=i+1}return m}sampleFace(t,e,n,a,m){let i=this.randomFunction(),s=this.randomFunction();i+s>1&&(i=1-i,s=1-s);const r=this.indexAttribute;let f=t*3,u=t*3+1,c=t*3+2;return r&&(f=r.getX(f),u=r.getX(u),c=r.getX(c)),o.a.fromBufferAttribute(this.positionAttribute,f),o.b.fromBufferAttribute(this.positionAttribute,u),o.c.fromBufferAttribute(this.positionAttribute,c),e.set(0,0,0).addScaledVector(o.a,i).addScaledVector(o.b,s).addScaledVector(o.c,1-(i+s)),n!==void 0&&(this.normalAttribute!==void 0?(o.a.fromBufferAttribute(this.normalAttribute,f),o.b.fromBufferAttribute(this.normalAttribute,u),o.c.fromBufferAttribute(this.normalAttribute,c),n.set(0,0,0).addScaledVector(o.a,i).addScaledVector(o.b,s).addScaledVector(o.c,1-(i+s)).normalize()):o.getNormal(n)),a!==void 0&&this.colorAttribute!==void 0&&(o.a.fromBufferAttribute(this.colorAttribute,f),o.b.fromBufferAttribute(this.colorAttribute,u),o.c.fromBufferAttribute(this.colorAttribute,c),w.set(0,0,0).addScaledVector(o.a,i).addScaledVector(o.b,s).addScaledVector(o.c,1-(i+s)),a.r=w.x,a.g=w.y,a.b=w.z),m!==void 0&&this.uvAttribute!==void 0&&(M.fromBufferAttribute(this.uvAttribute,f),P.fromBufferAttribute(this.uvAttribute,u),F.fromBufferAttribute(this.uvAttribute,c),m.set(0,0).addScaledVector(M,i).addScaledVector(P,s).addScaledVector(F,1-(i+s))),this}}var H=`precision mediump float;

float PI = 3.1415926;

uniform vec3 u_mouse;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,U=`uniform float uPixelRatio;
uniform float uSize;
uniform float uScaleMin;
uniform float uScaleMax;
uniform float uTime;
uniform float uPhiMult;
uniform float uThetaMult;
uniform float uSpeed;
uniform float uNoiseRadius;

attribute float aScale;

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
   float phi = snoise(pos.xyz * uPhiMult + uTime * uSpeed) * PI;
   float theta = snoise(pos.xyz * uThetaMult - uTime * uSpeed) * PI;

   vec3 noise = vec3(sin(phi) * cos(theta), sin(phi) * sin(theta), cos(phi));
   noise *= uNoiseRadius;
   pos.xyz += noise;
   
   
   
   return pos;
}

void main() {

   vec4 pos = vec4(position, 1.0);
   pos = adjustedPosition(pos);

   vec4 modelPosition = modelMatrix * pos;
   

   vec4 viewPosition = viewMatrix * modelPosition;
   
   

   vec4 projectedPosition = projectionMatrix * viewPosition;
   

   float scale = uScaleMin + (uScaleMax - uScaleMin) * aScale;
   scale *= uSize * uPixelRatio;
   scale *= (1.0 / - viewPosition.z);

   gl_Position = projectedPosition;
   gl_PointSize = scale;
}`;class Y{constructor(t,e,n=4e3){p(this,"meshToSample");p(this,"sampler");p(this,"cloud");p(this,"material");p(this,"geometry");p(this,"_count",4e3);p(this,"getPositions",()=>{const t=new v,e=new Float32Array(this._count*3),n=new Float32Array(this._count);for(let a=0;a<this._count;a++)this.sampler.sample(t),e[a*3+0]=t.x,e[a*3+1]=t.y,e[a*3+2]=t.z,n[a]=Math.random();this.geometry.setAttribute("position",new z(e,3)),this.geometry.setAttribute("aScale",new z(n,1))});p(this,"tick",t=>{this.material.uniforms.uTime.value=t});this.meshToSample=t,this.sampler=new Z(this.meshToSample).build(),this._count=n,this.material=new j({fragmentShader:H,vertexShader:U,transparent:!0,blending:G,depthWrite:!1,uniforms:{uPixelRatio:{value:e.pixelRatio},uSize:{value:20},uScaleMin:{value:1},uScaleMax:{value:5},uSpeed:{value:.3},uPhiMult:{value:3},uThetaMult:{value:3},uNoiseRadius:{value:.2},uTime:{value:0}}}),this.geometry=new R,this.cloud=new k(this.geometry,this.material),this.getPositions()}get count(){return this._count}set count(t){this._count=t,this.getPositions()}}let h;const y=new D,l=new L(y);new N(y);const J=new W,x=new q,b=new v(0,0,0),K=new X(10);l.scene.add(K);window.world=l;const g=new I;l.renderer.outputColorSpace=$;l.camera.position.set(0,5,0);g.setFromVector3(l.camera.position);const O="/threejs-experiments",Q=new E;Q.load(O+"/scenes/dna/dna-2.glb",d=>{var e,n;let t=(n=(e=d.scene)==null?void 0:e.children)==null?void 0:n[0];t instanceof C&&(h=new Y(t,y),h.cloud.rotateX(Math.PI/2),h.cloud.rotateZ(Math.PI/2),l.scene.add(h.cloud),tt())});const tt=()=>{const d={lookAtCenter:()=>{l.camera.lookAt(new v(0,0,0)),g.setFromVector3(l.camera.position),t.controllersRecursive().forEach(e=>{e.updateDisplay()})},getCameraData:()=>{let e=l.camera.position,n=l.camera.rotation,a=l.controls.target;const m=u=>{let c=new v(u.x,u.y,u.z);return c.x=Math.round(u.x*100)/100,c.y=Math.round(u.y*100)/100,c.z=Math.round(u.z*100)/100,c};let i=m(e),s=m(n),r=m(a),f=`world.camera.position.set(${i.x}, ${i.y}, ${i.z})
`;f+=`world.camera.rotation.set(${s.x}, ${s.y}, ${s.z})
`,f+=`world.controls.target.set(${r.x}, ${r.y}, ${r.z})
`,navigator.clipboard.writeText(f)}};x.add(h.material.uniforms.uSize,"value",0,100).name("size"),x.add(h.material.uniforms.uScaleMin,"value",0,10,.1).name("scale min"),x.add(h.material.uniforms.uScaleMax,"value",0,10,.1).name("scale max"),x.add(h.material.uniforms.uPhiMult,"value",0,10,.1).name("phi mult"),x.add(h.material.uniforms.uThetaMult,"value",0,10,.1).name("theta mult"),x.add(h.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),x.add(h.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),x.add(h,"count",0,1e5).name("count");let t=x.addFolder("camera");t.add(g,"radius",0,30).name("radius"),t.add(g,"phi",0,Math.PI).name("phi"),t.add(g,"theta",0,2*Math.PI).name("theta"),t.add(b,"x",-100,100).name("target x"),t.add(b,"y",-100,100).name("target y"),t.add(b,"z",-100,100).name("target z"),t.onChange(()=>{l.camera.position.setFromSpherical(g),l.camera.lookAt(b),l.controls.target.set(b.x,b.y,b.z)}),x.add(d,"lookAtCenter").name("look at center"),x.add(d,"getCameraData").name("get camera data")},B=()=>{const d=J.getElapsedTime();h&&h.tick(d),l.render(),window.requestAnimationFrame(B)};window.requestAnimationFrame(B);
