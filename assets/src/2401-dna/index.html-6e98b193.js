var B=Object.defineProperty;var T=(m,t,e)=>t in m?B(m,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):m[t]=e;var p=(m,t,e)=>(T(m,typeof t!="symbol"?t+"":t,e),e);import{Y as V,V as v,v as M,S as j,j as G,B as q,h as W,f as R,i as A,c as k,Z as C,b as X,_ as $,$ as I}from"../../three.module-674d1941.js";/* empty css                  */import{S as D,W as L}from"../../World-89dc4da6.js";import{M as N}from"../../Mouse-5752ff52.js";import{G as E}from"../../lil-gui.esm-ee8b5e9f.js";import{G as Z}from"../../GLTFLoader-ac453670.js";import"../../OrbitControls-0fb4b2fb.js";const o=new V,S=new v,z=new M,P=new M,F=new M;class H{constructor(t){this.geometry=t.geometry,this.randomFunction=Math.random,this.indexAttribute=this.geometry.index,this.positionAttribute=this.geometry.getAttribute("position"),this.normalAttribute=this.geometry.getAttribute("normal"),this.colorAttribute=this.geometry.getAttribute("color"),this.uvAttribute=this.geometry.getAttribute("uv"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(t){return this.weightAttribute=t?this.geometry.getAttribute(t):null,this}build(){const t=this.indexAttribute,e=this.positionAttribute,n=this.weightAttribute,r=t?t.count/3:e.count/3,l=new Float32Array(r);for(let i=0;i<r;i++){let x=1,d=3*i,c=3*i+1,w=3*i+2;t&&(d=t.getX(d),c=t.getX(c),w=t.getX(w)),n&&(x=n.getX(d)+n.getX(c)+n.getX(w)),o.a.fromBufferAttribute(e,d),o.b.fromBufferAttribute(e,c),o.c.fromBufferAttribute(e,w),x*=o.getArea(),l[i]=x}const a=new Float32Array(r);let s=0;for(let i=0;i<r;i++)s+=l[i],a[i]=s;return this.distribution=a,this}setRandomGenerator(t){return this.randomFunction=t,this}sample(t,e,n,r){const l=this.sampleFaceIndex();return this.sampleFace(l,t,e,n,r)}sampleFaceIndex(){const t=this.distribution[this.distribution.length-1];return this.binarySearch(this.randomFunction()*t)}binarySearch(t){const e=this.distribution;let n=0,r=e.length-1,l=-1;for(;n<=r;){const a=Math.ceil((n+r)/2);if(a===0||e[a-1]<=t&&e[a]>t){l=a;break}else t<e[a]?r=a-1:n=a+1}return l}sampleFace(t,e,n,r,l){let a=this.randomFunction(),s=this.randomFunction();a+s>1&&(a=1-a,s=1-s);const i=this.indexAttribute;let x=t*3,d=t*3+1,c=t*3+2;return i&&(x=i.getX(x),d=i.getX(d),c=i.getX(c)),o.a.fromBufferAttribute(this.positionAttribute,x),o.b.fromBufferAttribute(this.positionAttribute,d),o.c.fromBufferAttribute(this.positionAttribute,c),e.set(0,0,0).addScaledVector(o.a,a).addScaledVector(o.b,s).addScaledVector(o.c,1-(a+s)),n!==void 0&&(this.normalAttribute!==void 0?(o.a.fromBufferAttribute(this.normalAttribute,x),o.b.fromBufferAttribute(this.normalAttribute,d),o.c.fromBufferAttribute(this.normalAttribute,c),n.set(0,0,0).addScaledVector(o.a,a).addScaledVector(o.b,s).addScaledVector(o.c,1-(a+s)).normalize()):o.getNormal(n)),r!==void 0&&this.colorAttribute!==void 0&&(o.a.fromBufferAttribute(this.colorAttribute,x),o.b.fromBufferAttribute(this.colorAttribute,d),o.c.fromBufferAttribute(this.colorAttribute,c),S.set(0,0,0).addScaledVector(o.a,a).addScaledVector(o.b,s).addScaledVector(o.c,1-(a+s)),r.r=S.x,r.g=S.y,r.b=S.z),l!==void 0&&this.uvAttribute!==void 0&&(z.fromBufferAttribute(this.uvAttribute,x),P.fromBufferAttribute(this.uvAttribute,d),F.fromBufferAttribute(this.uvAttribute,c),l.set(0,0).addScaledVector(z,a).addScaledVector(P,s).addScaledVector(F,1-(a+s))),this}}var U=`precision mediump float;

float PI = 3.1415926;

uniform vec3 u_mouse;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}`,Y=`uniform float uPixelRatio;
uniform float uSize;
uniform float uScaleMin;
uniform float uScaleMax;
uniform float uTime;
uniform float uPhiMult;
uniform float uThetaMult;
uniform float uSpeed;
uniform float uNoiseRadius;
uniform float uSquishMain;
uniform float uSquishMiddle;
uniform float uScaleMiddleMin;
uniform float uScaleMiddleMax;

attribute float aScale;
attribute float aMiddleWeight;

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
   float phi = snoise(pos.xyz * uPhiMult + uTime * uSpeed) * PI * 2.0;
   float theta = snoise(pos.xyz * uThetaMult - uTime * uSpeed) * PI * 2.0;

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

   gl_Position = projectedPosition;
   gl_PointSize = scale;
}`;class J{constructor(t,e,n=4e3){p(this,"meshToSample");p(this,"sampler");p(this,"cloud");p(this,"material");p(this,"geometry");p(this,"_count",4e3);p(this,"getPositions",()=>{const t=new v,e=new v,n=new R,r=new Float32Array(this._count*3),l=new Float32Array(this._count*3),a=new Float32Array(this._count),s=new Float32Array(this._count);for(let i=0;i<this._count;i++)this.sampler.sample(t,e,n),r[i*3+0]=t.x,r[i*3+1]=t.y,r[i*3+2]=t.z,l[i*3+0]=e.x,l[i*3+1]=e.y,l[i*3+2]=e.z,a[i]=1-n.r,s[i]=Math.random();this.geometry.setAttribute("position",new A(r,3)),this.geometry.setAttribute("aScale",new A(s,1)),this.geometry.setAttribute("normal",new A(l,3)),this.geometry.setAttribute("aMiddleWeight",new A(a,1))});p(this,"tick",t=>{this.material.uniforms.uTime.value=t});this.meshToSample=t,this.sampler=new H(this.meshToSample).build(),this._count=n,this.material=new j({fragmentShader:U,vertexShader:Y,transparent:!0,blending:G,depthWrite:!1,uniforms:{uPixelRatio:{value:e.pixelRatio},uSize:{value:20},uScaleMin:{value:1},uScaleMax:{value:5},uScaleMiddleMin:{value:1},uScaleMiddleMax:{value:4},uSpeed:{value:.3},uPhiMult:{value:3},uThetaMult:{value:3},uNoiseRadius:{value:.07},uSquishMain:{value:.127},uSquishMiddle:{value:.015},uTime:{value:0}}}),this.geometry=new q,this.cloud=new W(this.geometry,this.material),this.getPositions()}get count(){return this._count}set count(t){this._count=t,this.getPositions()}}let u;const y=new D,f=new L(y);new N(y);const K=new I,h=new E,b=new v(0,0,0),O=new k(10);f.scene.add(O);window.world=f;const g=new $;f.renderer.outputColorSpace=C;f.camera.position.set(0,5,0);g.setFromVector3(f.camera.position);const Q="/threejs-experiments",tt=new Z;tt.load(Q+"/scenes/dna/dna-2-painted.glb",m=>{var e,n;console.log(m);let t=(n=(e=m.scene)==null?void 0:e.children)==null?void 0:n[0];t instanceof X&&(u=new J(t,y),console.log(u),u.cloud.rotateX(Math.PI/2),u.cloud.rotateZ(Math.PI/2),f.scene.add(u.cloud),window.particles=u,et())});const et=()=>{const m={lookAtCenter:()=>{f.camera.lookAt(new v(0,0,0)),g.setFromVector3(f.camera.position),t.controllersRecursive().forEach(e=>{e.updateDisplay()})},getCameraData:()=>{let e=f.camera.position,n=f.camera.rotation,r=f.controls.target;const l=d=>{let c=new v(d.x,d.y,d.z);return c.x=Math.round(d.x*100)/100,c.y=Math.round(d.y*100)/100,c.z=Math.round(d.z*100)/100,c};let a=l(e),s=l(n),i=l(r),x=`world.camera.position.set(${a.x}, ${a.y}, ${a.z})
`;x+=`world.camera.rotation.set(${s.x}, ${s.y}, ${s.z})
`,x+=`world.controls.target.set(${i.x}, ${i.y}, ${i.z})
`,navigator.clipboard.writeText(x)}};h.add(u.material.uniforms.uSize,"value",0,100).name("size"),h.add(u.material.uniforms.uScaleMin,"value",0,10,.1).name("scale min"),h.add(u.material.uniforms.uScaleMax,"value",0,10,.1).name("scale max"),h.add(u.material.uniforms.uScaleMiddleMin,"value",0,10,.1).name("scale middle min"),h.add(u.material.uniforms.uScaleMiddleMax,"value",0,10,.1).name("scale middle max"),h.add(u.material.uniforms.uPhiMult,"value",0,10,.1).name("phi mult"),h.add(u.material.uniforms.uThetaMult,"value",0,10,.1).name("theta mult"),h.add(u.material.uniforms.uNoiseRadius,"value",0,1,.01).name("noise radius"),h.add(u.material.uniforms.uSpeed,"value",0,1,.01).name("speed"),h.add(u.material.uniforms.uSquishMain,"value",0,1,.001).name("squish main"),h.add(u.material.uniforms.uSquishMiddle,"value",0,1,.001).name("squish middles"),h.add(u,"count",0,1e5).name("count");let t=h.addFolder("camera");t.add(g,"radius",0,30).name("radius"),t.add(g,"phi",0,Math.PI).name("phi"),t.add(g,"theta",0,2*Math.PI).name("theta"),t.add(b,"x",-100,100).name("target x"),t.add(b,"y",-100,100).name("target y"),t.add(b,"z",-100,100).name("target z"),t.onChange(()=>{f.camera.position.setFromSpherical(g),f.camera.lookAt(b),f.controls.target.set(b.x,b.y,b.z)}),h.add(m,"lookAtCenter").name("look at center"),h.add(m,"getCameraData").name("get camera data")},_=()=>{const m=K.getElapsedTime();u&&u.tick(m),f.render(),window.requestAnimationFrame(_)};window.requestAnimationFrame(_);
